


// import { useState } from 'react';
import React, { /* useEffect, */ useState } from 'react';

import { Grid, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ethers } from 'ethers';
// import { useDispatch } from 'react-redux';

import { closeBtn } from '@/assets';
import { BUTTON_DISABLE } from '@/config';
import {
    useMutationChangeLore,
    useMutationChangeName,
    useMutationGiveBirth,
    useMutationStake,
    useMutationTransfer,
    useMutationUnStake,
    useQueryBabyDetails,
    useQueryIsOwner
} from '@/hooks/react-query';
// import { getSingleTokenDetails } from '@/hooks/react-query/helper';
import {
    useERC20AndERC721Approve,
    // useERC20AndERC721ApproveStaking,
    useQueryBabyMetaData,
    useQueryGetInfo
} from '@/hooks/react-query/queries';
// import { useSelectExplorer } from '@/hooks/useSelectExplorer';
import { useSelectWeb3 } from '@/hooks/useSelectWeb3';
// import {
//    changeEnteredNumber,
//    changeExplorerButton
// } from '@/redux/slice/explorer';
import { COLLECTION_NAMES } from '@/utils/constants';

import BabyCard from '../card/BabyCard';
import MButton from '../MButton';
import { useNotify } from '../notify';
import Scrollbar from '../Scrollbar';
import ModalContent from './ModalContent';
import NFTModal from './NFTModal';
import SmallModal from './SmallModal';

export default function BabiesDetailsModal({
    selectedCard,
    // open,
    handleCloseModal,
    isExplore,
    // handleChildeParents,
}) {
    // const isGenesis = COLLECTION_NAMES.genesis === selectedCard?.collectionName;
    // const isLadies = COLLECTION_NAMES.lady === selectedCard?.collectionName;
    // const isBabies = COLLECTION_NAMES.baby === selectedCard?.collectionName;

    const notify = useNotify();
    // const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [transferInput, setTransferInput] = useState('');
    // small modals
    const [smallOpen, setSmallOpen] = useState(false);
    const [smallLoreOpen, setLoreSmallOpen] = useState(false);
    const [smallTransferOpen, setTransferSmallOpen] = useState(false);

    const smallHandleOpen = () => setSmallOpen(true);

    const onSuccess = () => {
        setSmallOpen(false);
        setInputValue('');
        setLoreSmallOpen(false);
        setInputValue2('');

        setTransferSmallOpen();

        if (transferInput) {
            setTransferInput('');
            handleCloseModal();
        }
    };

    const data = {
        tokenId: selectedCard?.id,
        collectionName: selectedCard?.collectionName,
    };
    const options = {
        onSuccess,
    };

    const { data: wacInfoData } = useQueryGetInfo(data);
    const isStaked = selectedCard?.isStaked;
    // const { isLoading: isERC20AndERC721ApproveLoadingStaking } = useERC20AndERC721ApproveStaking();
    const { isLoading: isLoreChangeLoading, mutate: changeLore } = useMutationChangeLore(data, options);
    const { isLoading: isNameChangeLoading, mutate: changeName } = useMutationChangeName(data, options);
    const { isLoading: isTransferLoading, mutate: transfer } = useMutationTransfer(data, options);
    const { /* isLoading: isERC20AndERC721ApproveLoading, */ refetch } =
        useERC20AndERC721Approve(selectedCard?.collectionName);

    const { /* isLoading: isOwnerLoading, */ data: owner } = useQueryIsOwner(data);

    const { account } = useSelectWeb3();
    const isOwner = owner?.toLowerCase() === account?.toLowerCase();
    const { isLoading: isStakeLoading, mutate: stake } = useMutationStake(data);
    const { isLoading: isUnStakeLoading, mutate: unStake } =
        useMutationUnStake(data);
    const { isLoading: isGiveBirthLoading, mutate: giveBirth } =
        useMutationGiveBirth(selectedCard?.id);

    const { isLoading: isBabyDetailsLoading, data: babyDetails } =
        useQueryBabyDetails(data);
    const {
        /* isLoading: isBabyMetaDataLoading, */
        data: babyMetaData,
        //  error,
    } = useQueryBabyMetaData(data);

    const babyDetailsWithMetaData = {
        ...babyDetails,
        metaData: babyMetaData,
        // ...selectedCard,
        babyData: {
            ...babyDetails?.babyData,
            rank: babyDetails?.babyData?.isBabyBorn
                ? selectedCard?.rank
                : 'Unknown',
        },
    };
    const modalContentData = {
        ...selectedCard,
        // attributes: babyMetaData?.attributes,
    };
    const handleChangeName = () => {
        const { id: tokenId, collectionName, isStaked } = selectedCard;

        const newValue = inputValue;

        if (tokenId && newValue) {
            changeName({
                tokenId,
                newValue,
                collectionName,
                isStaked,
            });
        } else {
            notify('error', 'Please enter a name');
        }
    };
    const handleCloseChangeName = () => {
        setSmallOpen(false);
        setInputValue('');
    };
    const LoreHandleOpen = () => setLoreSmallOpen(true);

    const handleChangeLore = () => {
        const { id: tokenId, collectionName, isStaked } = selectedCard;
        const newValue = inputValue2;

        if (tokenId && newValue) {
            changeLore({
                tokenId,
                newValue,
                collectionName,
                isStaked,
            });
        } else {
            notify('error', 'Please enter a lore');
        }
    };
    const handleCloseChangeLore = () => {
        setLoreSmallOpen(false);
        setInputValue2('');
    };

    const handleTransfer = () => {
        const { id: tokenId, collectionName } = selectedCard;
        const newValue = transferInput;

        if (!ethers.utils.isAddress(transferInput))
            notify('error', 'Please enter a valid address');
        else if (tokenId && newValue) {
            transfer({
                tokenId,
                newValue,
                collectionName,
            });
        } else {
            notify('error', 'Please enter transfer address');
        }
    };
    const handleCloseTransfer = () => {
        setTransferSmallOpen(false);
        setTransferInput('');
    };

    const handleStake = async () => {
        const { id: tokenId, collectionName } = selectedCard;
        await refetch();

        stake({
            tokenId,
            collectionName,
        });
    };

    const handleUnStake = () => {
        const { id: tokenId, collectionName } = selectedCard;

        unStake({
            tokenId,
            collectionName,
        });
    };

    const babyBirth = () => {
        const { id: tokenId } = selectedCard;
        giveBirth(tokenId);
    };

    const [openParents, setOpenParents] = useState(false);
    const [modalData, setModalData] = useState();

    const handleOpenModalParents = (data) => {
        setOpenParents(true);
        setModalData(data);
    };

    const handleCloseModalParents = () => setOpenParents(false);

    let fatherId;
    let motherId;

    if (data?.collectionName === COLLECTION_NAMES.baby) {
        fatherId = wacInfoData?.[4];
        motherId = wacInfoData?.[5];
        // motherId = motherId?.toString();
        fatherId = fatherId?.toString();
    }

    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'auto',
                position: 'relative',
                pt: 0.5,
            }}
        >
            {!openParents ? (
                <Box>
                    {!isExplore && (
                        <Box
                            sx={{
                                // float:{xs:'none', sm:'right'},
                                display: {
                                    xs: 'flex',
                                    sm: 'flex',
                                },
                                mb: {
                                    xs: 0,
                                    md: -8,
                                },
                                justifyContent: 'end',
                                alignItems: 'start',
                            }}
                        >
                            <IconButton
                                onClick={handleCloseModal}
                                sx={{
                                    zIndex: 9,
                                    // p:0
                                }}
                            >
                                <Box
                                    component='img'
                                    src={closeBtn}
                                    sx={{
                                        width: 30,
                                        mt: 0,
                                        mr: 1,
                                    }}
                                />
                            </IconButton>
                        </Box>
                    )}

                    <Scrollbar>
                        <Grid
                            item
                            container
                            xs={12}
                            sx={
                                {
                                    // justifyContent: 'space-around',
                                }
                            }
                        >
                            {!isExplore && (
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    sx={{
                                        // py:2,
                                        pt: 2,
                                        pb: {
                                            xs: 2,
                                            sm: 0,
                                        },
                                        gap: 2,
                                        display: {
                                            xs: 'grid',
                                            sm: 'flex',
                                        },
                                        gridTemplateColumns: {
                                            xs: 'auto auto',
                                        },
                                    }}
                                >
                                    {selectedCard?.incubatedBWAC && (
                                        <MButton
                                            onClick={babyBirth}
                                            title='Give Birth'
                                            loading={isGiveBirthLoading}
                                            disabled={!isOwner}
                                        />
                                    )}

                                    <MButton
                                        onClick={smallHandleOpen}
                                        title='Change Name'
                                        disabled={selectedCard?.incubatedBWAC}
                                    />

                                    <MButton
                                        onClick={LoreHandleOpen}
                                        title='Change Lore'
                                        disabled={selectedCard?.incubatedBWAC}
                                    />

                                    <MButton
                                        onClick={() => setTransferSmallOpen(true)}
                                        title='Transfer'
                                        disabled={!isOwner}
                                    />

                                    {isStaked ? (
                                        <MButton
                                            // disabled={!isOwner}
                                            disabled={selectedCard?.incubatedBWAC}
                                            loading={isUnStakeLoading}
                                            onClick={handleUnStake}
                                            title='Unstake'
                                        />
                                    ) : (
                                        <MButton
                                            // disabled={!isOwner}
                                            // disabled={isLady}
                                            disabled={
                                                selectedCard?.incubatedBWAC ||
                                                BUTTON_DISABLE['My Wapes'][
                                                    COLLECTION_NAMES.baby
                                                ].stake
                                            }
                                            loading={isStakeLoading}
                                            onClick={handleStake}
                                            title='Stake'
                                        />
                                    )}

                                    {/* <MButton
                                        // onClick={LoreHandleOpen}
                                        title='Claim VX'
                                        sx={{
                                            mr: {
                                                md: 4,
                                                lg: 4.8,
                                            },
                                            background: 'skyblue',
                                            '&:hover': {
                                                background: 'skyblue',
                                            },
                                        }}
                                        disabled
                                    /> */}
                                </Grid>
                            )}

                            <SmallModal
                                heading='Transfer'
                                isLoading={isTransferLoading}
                                smallHandleClose={handleCloseTransfer}
                                handleChange={handleTransfer}
                                smallOpen={smallTransferOpen}
                                setInputValue={setTransferInput}
                                inputValue={transferInput}
                            />

                            <SmallModal
                                heading='Change Name'
                                isLoading={isNameChangeLoading}
                                smallHandleClose={handleCloseChangeName}
                                handleChange={handleChangeName}
                                smallOpen={smallOpen}
                                setInputValue={setInputValue}
                                inputValue={inputValue}
                            />

                            <SmallModal
                                // open={changeLore}
                                // smallHandleClose={handleCloseChangeLoreModal}
                                // heading='Change Lore'

                                heading='Change Lore'
                                isLoading={isLoreChangeLoading}
                                smallHandleClose={handleCloseChangeLore}
                                handleChange={handleChangeLore}
                                smallOpen={smallLoreOpen}
                                setInputValue={setInputValue2}
                                inputValue={inputValue2}
                            />

                            {!isBabyDetailsLoading ? (
                                <>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: {
                                                xs: 'repeat(1,  1fr)',
                                                md:
                                                    isExplore ||
                                                        !babyDetailsWithMetaData?.babyData
                                                            ?.isBabyBorn
                                                        ? 'repeat(3, 1fr)'
                                                        : '1fr 2fr',
                                            },
                                            gridGap: 20,
                                            mx: 'auto',
                                            mt: {
                                                xs: 3,
                                                md: 1.3,
                                            },
                                        }}
                                    >
                                        <BabyCard
                                            isBaby
                                            data={babyDetailsWithMetaData?.babyData}
                                            imgSrc={babyDetailsWithMetaData?.imgSrc}
                                            name={selectedCard.name}
                                            card={selectedCard}
                                        />

                                        {babyDetailsWithMetaData?.babyData?.isBabyBorn ? (
                                            <Box
                                                sx={{
                                                    gridColumn: {
                                                        xs: '1/2',
                                                        md: '2/4',
                                                    },
                                                }}
                                            >
                                                <ModalContent
                                                    selectedCard={modalContentData}
                                                    isExplore={isExplore}
                                                />
                                            </Box>
                                        ) : (
                                            <>
                                                <Box
                                                    onClick={() => {
                                                        handleOpenModalParents(
                                                            babyDetailsWithMetaData?.fatherData
                                                        );
                                                    }}
                                                >
                                                    <BabyCard
                                                        data={
                                                            babyDetailsWithMetaData?.fatherData
                                                        }
                                                        parentId={fatherId}
                                                    />
                                                </Box>

                                                <Box
                                                    onClick={() => {
                                                        handleOpenModalParents(
                                                            babyDetailsWithMetaData?.motherData
                                                        );
                                                    }}
                                                >
                                                    <BabyCard
                                                        data={
                                                            babyDetailsWithMetaData?.motherData
                                                        }
                                                        parentId={motherId}
                                                    />
                                                </Box>
                                            </>
                                        )}
                                    </Box>

                                    {babyDetailsWithMetaData?.babyData?.isBabyBorn && (
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: {
                                                    xs: 'repeat(1,  1fr)',
                                                    md: 'repeat(2,  1fr)',
                                                },
                                                gridTemplateRows:
                                                    '100px, repeat(1,  1fr), repeat(1,  1fr)',
                                                gridGap: 20,
                                                width: '100%',
                                                mt: 2,
                                                mx: 'auto',
                                                maxWidth: '940px',
                                                div: {
                                                    maxWidth: '400px',
                                                },
                                                pb: {
                                                    xs: 6,
                                                    md: 0,
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    gridColumn: {
                                                        xs: '1/2',
                                                        md: '1/3',
                                                    },
                                                    textAlign: 'center',
                                                    fontSize: 36,
                                                }}
                                            >
                                                Parents
                                            </Typography>

                                            <Box
                                                onClick={() => {
                                                    handleOpenModalParents(
                                                        babyDetailsWithMetaData?.fatherData
                                                    );
                                                }}
                                            >
                                                <BabyCard
                                                    data={
                                                        babyDetailsWithMetaData?.fatherData
                                                    }
                                                    parentId={fatherId}
                                                />
                                            </Box>

                                            <Box
                                                onClick={() => {
                                                    handleOpenModalParents(
                                                        babyDetailsWithMetaData?.motherData
                                                    );
                                                }}
                                            >
                                                <BabyCard
                                                    data={
                                                        babyDetailsWithMetaData?.motherData
                                                    }
                                                    parentId={motherId}
                                                />
                                            </Box>
                                        </Box>
                                    )}
                                </>
                            ) : (
                                <Typography
                                    variant='h2'
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        textAlign: 'center',
                                        mt: 20,
                                    }}
                                >
                                    Loading...
                                </Typography>
                            )}
                        </Grid>
                    </Scrollbar>
                </Box>
            ) : (
                <NFTModal
                    handleCloseModal={handleCloseModalParents}
                    open={openParents}
                    selectedCard={modalData}
                    isBabyExplore
                    newExplore={isExplore}
                />
            )}
        </Box>
    );
}
