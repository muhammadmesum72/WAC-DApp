
import React, { useEffect, useState } from 'react';

import { Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';

import { closeBtn } from '@/assets';
import { BUTTON_DISABLE } from '@/config';
import {
    useMutationChangeLore,
    useMutationChangeName,
    useMutationGiveBirth,
    useMutationStake,
    useMutationTransfer,
    useMutationUnRent,
    useMutationUnStake,
    useQueryIsOwner
} from '@/hooks/react-query';
import {
    useERC20AndERC721Approve,
    // useERC20AndERC721ApproveStaking,
    // useQueryGetInfo,
    useQueryLadyBreedNumber
} from '@/hooks/react-query/queries';
// import { useSelectExplorer } from '@/hooks/useSelectExplorer';
import { useSelectWeb3 } from '@/hooks/useSelectWeb3';
import { hidSearch } from '@/redux/slice/explorer';
import { COLLECTION_NAMES } from '@/utils/constants';

import ModalCard from '../card/ModalCard';
import MButton from '../MButton';
import { useNotify } from '../notify';
import Scrollbar from '../Scrollbar';
import ModalContent from './ModalContent';
import PayRent from './PayRent';
import SmallModal from './SmallModal';

export default function NFTModal({
    selectedCard,
    // open,
    handleCloseModal,
    isExplore,
    isBabyExplore,
    newExplore,
}) {
    const isGenesis = COLLECTION_NAMES.genesis === selectedCard?.collectionName;
    const isGenesis3d = COLLECTION_NAMES.genesis3d === selectedCard?.collectionName;
    const isLady = COLLECTION_NAMES.lady === selectedCard?.collectionName;
    const isBaby = COLLECTION_NAMES.baby === selectedCard?.collectionName;

    const notify = useNotify();

    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [transferInput, setTransferInput] = useState('');
    // small modals
    const [completeRent, setCompleteRent] = useState(false);
    const [smallOpen, setSmallOpen] = useState(false);
    const [smallLoreOpen, setLoreSmallOpen] = useState(false);
    const [smallTransferOpen, setTransferSmallOpen] = useState(false);

    const [changePriceLoading, setChangePriceLoading] = useState(false);

    const smallHandleOpen = () => setSmallOpen(true);

    const onSuccess = () => {
        setSmallOpen(false);
        setInputValue('');
        setLoreSmallOpen(false);
        setInputValue2('');

        setTransferSmallOpen();

        if (transferInput || completeRent) {
            setTransferInput('');
            handleCloseModal();
        }
    };

    const data = {
        tokenId: selectedCard?.id,
        collectionName: selectedCard?.collectionName,
        isRented: selectedCard?.isRented,
    };
    const options = {
        onSuccess,
    };

    const dispatch = useDispatch();
    const { isLoading: isERC20AndERC721ApproveLoading, refetch } =
        useERC20AndERC721Approve(selectedCard?.collectionName);

    // const { data: wacInfoData } = useQueryGetInfo(data);

    // const { isLoading: isERC20AndERC721ApproveLoadingStaking } =
    //   useERC20AndERC721ApproveStaking();
    const { isLoading: isLoreChangeLoading, mutate: changeLore } =
        useMutationChangeLore(data, options);
    const { isLoading: isNameChangeLoading, mutate: changeName } =
        useMutationChangeName(data, options);
    const { isLoading: isTransferLoading, mutate: transfer } =
        useMutationTransfer(data, options);

    const { /* isLoading: isOwnerLoading, */ data: owner } = useQueryIsOwner(data);
    const { /* isLoading: isBreedAbleLoading, */ data: numberOfBreeds } =
        useQueryLadyBreedNumber(data);

    const isStaked = selectedCard?.isStaked;

    const { account } = useSelectWeb3();
    const isOwner = owner?.toLowerCase() === account?.toLowerCase();

    // Renting Query for unRent
    const { isLoading: isUunRentLoading, mutate: unRent } =
        useMutationUnRent(data);

    const { isLoading: isStakeLoading, mutate: stake } = useMutationStake(data);
    const { isLoading: isUnStakeLoading, mutate: unStake } =
        useMutationUnStake(data);
    const { isLoading: isGiveBirthLoading, mutate: giveBirth } =
        useMutationGiveBirth();

    // ===================== Change Name ==================================
    const handleChangeName = () => {
        const { id: tokenId, collectionName, isRented, isStaked } = selectedCard;

        const newValue = inputValue;

        if (tokenId && newValue) {
            changeName({
                tokenId,
                newValue,
                collectionName,
                isRented,
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
        const { id: tokenId, collectionName, isRented, isStaked } = selectedCard;
        const newValue = inputValue2;

        if (tokenId && newValue) {
            changeLore({
                tokenId,
                newValue,
                collectionName,
                isRented,
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
        const { id: tokenId, collectionName, isRented } = selectedCard;
        const newValue = transferInput;

        if (!ethers.utils.isAddress(transferInput))
            notify('error', 'Please enter a valid address');
        else if (tokenId && newValue) {
            transfer({
                tokenId,
                newValue,
                collectionName,
                isRented,
            });
        } else {
            notify('error', 'Please enter transfer address');
        }
    };
    const handleCloseTransfer = () => {
        setTransferSmallOpen(false);
        setTransferInput('');
    };

    // ---------------------Stake and unStake---------------
    const handleStake = async () => {
        const { id: tokenId, collectionName, isRented } = selectedCard;
        await refetch();

        stake({
            tokenId,
            collectionName,
            isRented,
        });
    };

    const handleUnStake = () => {
        const { id: tokenId, collectionName, isRented, isStaked } = selectedCard;

        unStake({
            tokenId,
            collectionName,
            isRented,
            isStaked,
        });
    };

    const babyBirth = () => {
        const { id: tokenId } = selectedCard;
        giveBirth(tokenId);
    };

    // pay rent modal
    const [payRent, setPayRent] = useState(false);
    const handleClosePayRentModal = () => {
        setCompleteRent(true);
        setPayRent(false);
    };
    const handleOpenPayRentModal = async () => {
        setPayRent(true);
        await refetch();
    };
    const handleOpenUnRent = () => {
        const { id: tokenId, /* collectionName, */ isStaked } = selectedCard;

        unRent({
            tokenId,
            isStaked,
        });
    };

    // const handleRentDisable = () => {
    //     let isDisable = false;

    //     if (isLady && numberOfBreeds === 0) {
    //         isDisable = true;
    //     } else if (isStaked) {
    //         isDisable = false;
    //     } else if (isStaked && selectedCard?.isRented) {
    //         isDisable = true;
    //     }

    //     return isDisable;
    // };

    const [changePrice, setChangePrice] = useState(false);
    const handleClosePriceModal = () => setChangePrice(false);
    const handleOpenChangePrice = () => setChangePrice(true);
    const handleClaimVX = () => {
        // TODO
    };
    const handleEvolveVX = () => {
        // TODO
    };

    const isDisableRent = () => {
        let isDisable = false;

        // if (isStaked) isDisable = true;

        if (isStaked && selectedCard?.isRented) isDisable = false;

        // if (numberOfBreeds === 0 || !isOwner) isDisable = true;

        if (isLady && numberOfBreeds === 0) isDisable = true;

        // if (selectedCard?.isRented && isStaked) isDisable = false;

        // Comment this to enable rent btn
        // if (!isLady && selectedCard?.isStaked) isDisable = true;

        return isDisable;
    };

    useEffect(() => {
        dispatch(hidSearch(isBabyExplore));
    });

    return (
        <Box
            sx={{
                width: '100%',
                mt: 0,
                overflow: 'auto',
                // position: 'relative',
            }}
        >
            {!isExplore && (
                <Box
                    sx={{
                        // float:{xs:'none', sm:'right'},
                        // overflow:'none',
                        display: {
                            xs: 'flex',
                            sm: 'flex',
                        },
                        mb: {
                            xs: 0,
                            md: isBabyExplore ? 0 : -7,
                        },
                        justifyContent: 'end',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            handleCloseModal();
                            dispatch(hidSearch(false));
                        }}
                        sx={{
                            zIndex: 9,
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
                    sx={{
                        justifyContent: 'space-around',
                    }}
                >
                    {!isExplore && !isBabyExplore && (
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{
                                // pt: 1,
                                // pb: {
                                //   xs: 2, sm: 0,
                                // },
                                pt: 2,
                                pb: 1,
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
                            {/* start buttons sections------------------------------------------ */}

                            {/* {!isBaby ? ( */}

                            <>
                                <MButton
                                    onClick={smallHandleOpen}
                                    title='Change Name'
                                // disabled={
                                //   selectedCard?.isRented
                                //      ? !selectedCard?.isRented
                                //      : !isOwner
                                // }
                                // disabled={!isOwner}
                                />

                                <MButton
                                    onClick={LoreHandleOpen}
                                    title='Change Lore'
                                // disabled={
                                //   selectedCard?.isRented
                                //      ? !selectedCard?.isRented
                                //      : !isOwner
                                // }
                                // disabled={!isOwner}
                                />
                            </>
                            {isBaby && (
                                <MButton
                                    onClick={babyBirth}
                                    title='Give Birth'
                                    loading={isGiveBirthLoading}
                                    disabled={!isOwner}
                                />
                            )}

                            <MButton
                                onClick={() => setTransferSmallOpen(true)}
                                title='Transfer'
                                disabled={!isOwner || isStaked}
                            />

                            {isStaked ? (
                                <MButton
                                    // disabled={!isOwner}
                                    // disabled={isLady}
                                    loading={isUnStakeLoading}
                                    onClick={handleUnStake}
                                    title='Unstake'
                                />
                            ) : (
                                <MButton
                                    // disabled={!isOwner}
                                    // disabled={isLady}
                                    disabled={
                                        isLady &&
                                        BUTTON_DISABLE['My Wapes'][COLLECTION_NAMES.lady]
                                            .stake
                                    }
                                    loading={isStakeLoading}
                                    onClick={handleStake}
                                    title='Stake'
                                />
                            )}

                            <MButton
                                loading={isUunRentLoading}
                                onClick={
                                    selectedCard?.isRented
                                        ? handleOpenUnRent
                                        : handleOpenPayRentModal
                                }
                                title={selectedCard?.isRented ? 'Unrent' : 'Rent'}
                                disabled={isDisableRent()}
                            />

                            {selectedCard?.isRented && (
                                <MButton
                                    // disabled={!isOwner}
                                    // disabled={isLady}
                                    loading={changePriceLoading}
                                    onClick={handleOpenChangePrice}
                                    title='Change Price'
                                />
                            )}

                            {isGenesis && (
                                <MButton
                                    title='Claim VX'
                                    sx={{
                                        mr: {
                                            md: 4.4,
                                        },
                                        background: 'skyblue',
                                        '&:hover': {
                                            background: 'skyblue',
                                        },
                                    }}
                                    disabled={1} // TODO: disabilita se già fatto claim
                                    onClick={handleClaimVX}
                                />
                            )}

                            {isGenesis3d && (
                                <MButton
                                    title='Evolve'
                                    sx={{
                                        mr: {
                                            md: 4.4,
                                        },
                                        background: 'skyblue',
                                        '&:hover': {
                                            background: 'skyblue',
                                        },
                                    }}
                                    disabled={1} // TODO: disabilita se già fatto evolve
                                    onClick={handleEvolveVX}
                                />
                            )}
                        </Grid>
                    )}

                    <PayRent
                        selectedCard={selectedCard}
                        isGenesis={isGenesis}
                        isLady={isLady}
                        handleClose={handleClosePayRentModal}
                        open={payRent}
                        isApprovedAllLoading={isERC20AndERC721ApproveLoading}
                    />

                    <PayRent
                        selectedCard={selectedCard}
                        isGenesis={isGenesis}
                        isLady={isLady}
                        isChangePrice
                        handleClose={handleClosePriceModal}
                        open={changePrice}
                        changePriceLoading={changePriceLoading}
                        setChangePriceLoading={setChangePriceLoading}
                    // isApprovedAllLoading={isApprovedAllLoading}
                    />

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

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(1,  1fr)',
                                // md: isExplore ? '1fr 2fr' : '1fr 2fr',
                                md: '1fr 2fr',
                            },
                            gridGap: 20,
                            mx: 'auto',
                            mt: {
                                xs: 3,
                                md: 0.7,
                            },
                            pb: {
                                xs: 5,
                                sm: 0,
                            },
                        }}
                    >
                        <ModalCard selectedCard={selectedCard} />

                        <ModalContent
                            selectedCard={selectedCard}
                            isExplore={isExplore || newExplore || isBabyExplore}
                            owner={owner}
                        />
                    </Box>
                </Grid>
            </Scrollbar>
        </Box>
    );
}
