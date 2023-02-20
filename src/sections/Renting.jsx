import React  from 'react';
import { useEffect, useState } from 'react';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { closeBtn, YellowCoin } from '@/assets';
import BalanceClaimBtn from '@/components/BalanceClaimBtn';
import MButton from '@/components/MButton';
import CongratulationModal from '@/components/Modal/CongratulationModal';
import RentingModal from '@/components/Modal/RentingModal';
import TabsButton from '@/components/TabsButton';
import {
    useMutationUserClaim,
    useQueryGetUserNFTsData
} from '@/hooks/react-query';
import { useMutationRentingGWAC } from '@/hooks/react-query/mutations';
import {
    useERC20AndERC721Approve,
    useQueriesLadiesNumChildren,
    useQueryAppTenderNft,
    useQueryPending
} from '@/hooks/react-query/queries';
import { useSelectMyWallet } from '@/hooks/useSelectMyWallet';
import {
    rentingModalCardClicked,
    rentingModalCardSelected,
    selectRentingCard
} from '@/redux/slice/renting';
import { COLLECTION_NAMES } from '@/utils/constants';

import RentingCard from '../components/card/RentingCard';

export default function Renting() {
    const dispatch = useDispatch();
    const [selectedNfts, setSelectedNfts] = useState([]);
    const [selectedCard, setSelectedCard] = useState();

    const [closeModal, setCloseModal] = useState(false);

    const { currentCollection, rentingCurrentTab } = useSelectMyWallet();
    const { data: rentedData } = useQueryAppTenderNft();

    const { data: allUserNFTs } = useQueryGetUserNFTsData();

    const ladiesNumChildren = useQueriesLadiesNumChildren(allUserNFTs);
    const allFinished = ladiesNumChildren.every((query) => query.isSuccess);

    const [userNfts, setUserNfts] = useState({
        //
    });
    const [openRentingModal, setOpenRentingModal] = useState(false);

    const { isUser: isMine, numOfBabies } = useSelector((state) => state.rentingSlice);
    /*const { isMine, numOfBabies } = useSelector((state) => state.rentingSlice);*/

    const rentingState = useSelector(
        (state) => state.rentingSlice.isSelectRentingCard
    );

    useEffect(() => {
        if (rentedData && !openRentingModal) {
            const genesisCollection = COLLECTION_NAMES.genesis;
            const ladyCollection = COLLECTION_NAMES.lady;

            const rentedFilterGenesis = allUserNFTs?.[genesisCollection].filter(
                (item) => item.isRented === false/* || item.isStaked === true*/
            );
            const rentedFilterLadies = allUserNFTs?.[ladyCollection]?.filter(
                (item) => item.isRented === true
            );

            const notRentedFilterLadies = allUserNFTs?.[ladyCollection]?.filter(
                (item) => item.isRented === false
            );
            const genesisWithRentOwner = rentedData[genesisCollection]?.map(
                (token) => {
                    const isOwner = rentedFilterGenesis
                        ? rentedFilterGenesis?.some((nft) => nft.id === token.id)
                        : false;

                    return {
                        ...token,
                        isOwner,
                    };
                }
            );
            const genesisWithRent =
            isMine && rentingState !== 'page'
                ? [...(rentedFilterGenesis || [])]
                : [...genesisWithRentOwner];
            genesisWithRent?.sort((a, b) => Number(a.price) - Number(b.price));

            let userLadiesApes = [];

            if (allFinished) {
                const data = ladiesNumChildren.map((result) => result.data);
                const ladies = notRentedFilterLadies;
                userLadiesApes = ladies?.filter((item, idx) => data[idx] === true);
            }

            const ladyWithRentOwner = rentedData[ladyCollection].map((token) => {
                const isOwner = rentedFilterLadies
                    ? rentedFilterLadies?.some((nft) => nft.id === token.id)
                    : false;

                return {
                    ...token,
                    isOwner,
                };
            });

            const ladyWithRent =
            isMine && rentingState !== 'page'
                ? [...userLadiesApes]
                : [...ladyWithRentOwner];

            ladyWithRent?.sort((a, b) => {
                const aBabyArray = a?.babyPrices || [];
                const bBabyArray = b?.babyPrices || [];

                let aNum = aBabyArray?.map((item) => Number(item));
                let bNum = bBabyArray?.map((item) => Number(item));

                aNum = aNum?.filter((val) => val !== 0);

                bNum = bNum?.filter((val) => val !== 0);

                const aMin = Math.min(...aNum);
                const bMin = Math.min(...bNum);

                return aMin - bMin;
            // return a.id - b.id
            });

            setUserNfts({
                [genesisCollection]: genesisWithRent,
                [ladyCollection]: ladyWithRent,
            });
        }
    }, [
        isMine,
        openRentingModal,
        rentedData,
        rentingState,
        allUserNFTs,
        allFinished
    ]);

    useEffect(() => {
        setSelectedNfts(userNfts?.[rentingCurrentTab]);
    }, [rentingCurrentTab, userNfts]);

    useEffect(() => {
        if (rentingState === 'page') {
            setCloseModal(true);
            dispatch(rentingModalCardSelected(null));
        } else {
            setCloseModal(false);
        }
    }, [dispatch, rentingState]);

    const handleCloseModal = () => {
        setCloseModal(true);
        dispatch(selectRentingCard('page'));
    };

    const { data: pendingData } = useQueryPending();
    const {
        // data: pendingClaim,
        mutate,
        isLoading: isPendingLoading,
    } = useMutationUserClaim();

    const handleClaim = () => {
        const isPendingClaim = true;
        mutate(isPendingClaim);
    };

    // ====================================================================

    // Renting Modal Functions

    const [selectedCollectionName, setSelectedCollectionName] = useState();
    const [openProceedModal, setOpenProceedModal] = useState(false);
    const handleOpenProceedModal = () => setOpenProceedModal(true);
    const handleCloseProceedModal = () => {
        setOpenProceedModal(false);
        dispatch(selectRentingCard('page'));
    };

    const onSuccess = () => {
        handleOpenProceedModal();
        handleRentingModalClose();
    };

    const handleRentingModalOpen = (/* nft */) => {
        setOpenRentingModal(true);
    };
    const handleRentingModalClose = () => setOpenRentingModal(false);
    const {
        isLoading: isRentingGWACLoading,
        mutate: rentingGWACFun,
        // data: rentingGWACData,
    } = useMutationRentingGWAC({
        onSuccess,
    });

    const handleProceed = (selectedCard, selectedRenting) => {
        if (
            selectedCard.collectionName === COLLECTION_NAMES.genesis &&
         selectedRenting.collectionName === COLLECTION_NAMES.lady
        ) {
            const { id: tokenIdGenesis } = selectedCard;
            const { id: tokenIdLadies } = selectedRenting;

            // 1 /3
            const funNumber = isMine ? 1 : 3;

            rentingGWACFun({
                tokenIdGenesis,
                tokenIdLadies,
                numOfBabies,
                funNumber,
            });
        }

        if (
            selectedCard.collectionName === COLLECTION_NAMES.lady &&
         selectedRenting.collectionName === COLLECTION_NAMES.genesis
        ) {
            const { id: tokenIdGenesis } = selectedRenting;
            const { id: tokenIdLadies } = selectedCard;

            // 2 /3
            const funNumber = isMine ? 2 : 3;

            rentingGWACFun({
                tokenIdGenesis,
                tokenIdLadies,
                numOfBabies,
                funNumber,
            });
        }
    };

    const secondModalOpened = useSelector(
        (state) => state.rentingSlice.isSelectRentingCard2
    );
    const { isLoading: isERC20AndERC721ApproveLoading, refetch } =
      useERC20AndERC721Approve(selectedCollectionName);

    useEffect(() => {
        const getPermissions = async () => {
            await refetch();
        };

        if (secondModalOpened) {
            getPermissions();
        }
    }, [refetch, secondModalOpened]);

    return (
        <Box
            sx={{
                width: '100%',
                pb: {
                    xs: 6,
                    sm: 0,
                },
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    columnGap: {
                        md: 6,
                        xl: 4,
                    },
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                    },
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        height: {
                            md: 49,
                        },
                        gridColumn: {
                            md: '1/1',
                        },
                        gridRow: {
                            md: '1/1',
                        },
                    }}
                >
                    {' '}

                    <BalanceClaimBtn />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: {
                            xs: 'start',
                            md: 'end',
                        },
                        gap: 1,
                        height: {
                            xs: '100%',
                            lg: 43,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: {
                                xs: 'block',
                                md: 'flex',
                            },
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: {
                                xs: 'column',
                                sm: 'row',
                            },
                            background: (theme) => theme.palette.primary.lighter,
                            px: 2,
                            width: {
                                xs: '100%',
                                md: 'fit-content',
                            },
                            borderRadius: '15px',
                            '& p': {
                                // fontSize: '16px',
                                px: 0.5,
                            },
                            py: {
                                xs: 1,
                                md: 0,
                            },
                        }}
                    >
                        <Stack
                            direction='row'
                            spacing={1}
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '16px',
                                        sm: '20px',
                                    },
                                }}
                            >
                        Pending:
                            </Typography>

                            <Typography
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'block',
                                    },
                                    fontSize: {
                                        xs: '16px',
                                        sm: '20px',
                                    },
                                }}
                            >
                                {pendingData || 0}
                            </Typography>

                            <Box
                                component='img'
                                src={YellowCoin}
                            />
                        </Stack>

                        <Typography
                            sx={{
                                display: {
                                    xs: 'block',
                                    sm: 'none',
                                },
                                textAlign: 'center',
                                fontSize: {
                                    xs: '16px',
                                    sm: '20px',
                                },
                            }}
                        >
                            {pendingData || 0}
                        </Typography>
                    </Box>

                    <MButton
                        onClick={handleClaim}
                        title='claim'
                        loading={isPendingLoading}
                        sx={{
                            minWidth: '90px',
                            fontSize: 18,
                        }}
                    />

                    <Tooltip title='This pending is about the $WAC generated by staking the Genesis rented and its value is not included in the other pending.'>
                        <IconButton
                            sx={{
                                minWidth: 50,
                            }}
                        >
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>

                    {/* <Bottles /> */}
                </Box>

                {closeModal && (
                    <Box>
                        {' '}

                        <TabsButton isRenting />
                    </Box>
                )}
            </Box>

            {/* for card list items */}

            {closeModal && (
                <Box
                    sx={{
                        mt: 2,
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                    }}
                >
                    {selectedNfts?.map((nft, idx) => (
                        <RentingCard
                            key={`renting__nft__${idx}__${currentCollection}`}
                            card={nft}
                            onNftClick={() => {
                                dispatch(rentingModalCardClicked(nft));
                                setSelectedCard(nft);
                                handleRentingModalOpen(nft);
                            }}
                            isRenting
                            cardSx={{
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </Box>
            )}

            {!closeModal && (
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            mt: {
                                xs: 1,
                                md: 0,
                                lg: 7,
                                xl: 0,
                            },
                            mr: {
                                xs: 1,
                                md: 0,
                            },
                            position: 'relative',
                        }}
                    >
                        <IconButton onClick={handleCloseModal}>
                            <Box
                                component='img'
                                src={closeBtn}
                                sx={{
                                    width: 30,
                                }}
                            />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            mt: 2,
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns:
                        'repeat(auto-fill, minmax(230px, 1fr))',
                        }}
                    >
                        {selectedCard?.collectionName === COLLECTION_NAMES.genesis &&
                     userNfts?.Ladies?.map((nft, idx) => (
                         <RentingCard
                             key={`renting__nft__${idx}__${currentCollection}`}
                             card={nft}
                             onNftClick={() => {
                                 dispatch(rentingModalCardSelected(nft));
                                 handleRentingModalOpen(nft);
                                 setSelectedCollectionName(nft.collectionName);
                             }}
                             isRenting
                             cardSx={{
                                 cursor: 'pointer',
                             }}
                         />
                     ))}

                        {selectedCard?.collectionName === COLLECTION_NAMES.lady &&
                     userNfts?.Genesis?.map((nft, idx) => (
                         <RentingCard
                             key={`renting__nft__${idx}__${currentCollection}`}
                             card={nft}
                             onNftClick={() => {
                                 dispatch(rentingModalCardSelected(nft));
                                 handleRentingModalOpen(nft);
                                 setSelectedCollectionName(nft.collectionName);
                             }}
                             isRenting
                             isMine={isMine}
                             cardSx={{
                                 cursor: 'pointer',
                             }}
                         />
                     ))}
                    </Box>
                </Box>
            )}

            <RentingModal
                open={openRentingModal}
                handleProceed={handleProceed}
                handleClose={handleRentingModalClose}
                isLoadingProceed={
                    isRentingGWACLoading || isERC20AndERC721ApproveLoading
                }
                selectForRent
            />

            <CongratulationModal
                open={openProceedModal}
                handleClose={handleCloseProceedModal}
            />
        </Box>
    );
}
