
import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useDispatch/* , useSelector */ } from 'react-redux';

import ExplorerHeader from '@/components/ExplorerHeader';
import BabiesDetailsModal from '@/components/Modal/BabiesDetailsModal';
import NFTModal from '@/components/Modal/NFTModal';
import { getSingleTokenDetails } from '@/hooks/react-query/helper';
import { useSelectExplorer } from '@/hooks/useSelectExplorer';
import {
    // changeEnteredNumber,
    // changeExplorerButton,
    resetExplorer
} from '@/redux/slice/explorer';
import { COLLECTION_NAMES } from '@/utils/constants';
// import { useSelectWeb3 } from '@/hooks/useSelectWeb3';

export default function Explore() {
    const dispatch = useDispatch();
    // const { config } = useSelectWeb3();

    const {
        currentExplorerButton,
        dimensionalSwitchType,
        idRankType,
        enteredNumber,
        isSearch,
    } = useSelectExplorer();
    const [selectedNft, setSelectedNft] = useState();

    const [isDisable, setIsDisable] = useState(false);
    const [open, setOpen] = useState(false);
    // const [parentClicked, setParentClicked] = useState(false);
    const handleCloseModal = () => {
        setIsDisable(false);
        setOpen(false);
    };
    const handleOpenModal = () => setOpen(true);

    // const handleChildeParents = (type, data) => {
    //   dispatch(changeExplorerButton(type));
    //   dispatch(changeEnteredNumber(data?.id));
    //   setParentClicked(true);
    // };

    const handleGoBtn = async () => {
        if (
            currentExplorerButton === COLLECTION_NAMES.lady
        ) {

            const nft = await getSingleTokenDetails({
                currentExplorerButton,
                dimensionalSwitchType,
                idRankType,
                enteredNumber,
            });

            if (nft) {
                setIsDisable(true);
                setSelectedNft(nft);
                handleOpenModal();
            }
        } else if (currentExplorerButton !== COLLECTION_NAMES.lady) {

            const nft = await getSingleTokenDetails({
                currentExplorerButton,
                dimensionalSwitchType,
                idRankType,
                enteredNumber,
            });

            if (nft) {
                setIsDisable(true);
                setSelectedNft(nft);
                handleOpenModal();
            }
        } else {
            //
        }

        // setParentClicked(false);
    };

    // useEffect(() => {
    //   if (parentClicked) {
    //      handleGoBtn();
    //   }
    // }, [parentClicked]);

    // const handleExplore = () => {
    //    dispatch(resetExplorer());
    // };

    useEffect(() => {
        dispatch(resetExplorer());
    }, [dispatch]);

    return (
        <Box
            sx={{
                pb: {
                    xs: 5,
                    sm: 0,
                },
            }}
        >
            {!isSearch && (
                <ExplorerHeader
                    handleGoBtn={handleGoBtn}
                    modalOpen={open}
                    handleCloseModal={handleCloseModal}
                    isDisable={isDisable}
                    selectedNft={selectedNft}
                />
            )}

            {/* genesis and lady */}

            {open && currentExplorerButton !== COLLECTION_NAMES.baby && (
                <NFTModal
                    handleClose={handleCloseModal}
                    open={open}
                    selectedCard={selectedNft}
                    isExplore
                    handleGoBtn={handleGoBtn}
                />
            )}

            {/* Baby */}

            {open && currentExplorerButton === COLLECTION_NAMES.baby && (
                <BabiesDetailsModal
                    handleClose={handleCloseModal}
                    open={open}
                    selectedCard={selectedNft}
                    isExplore
                    // handleChildeParents={handleChildeParents}
                />
            )}
        </Box>
    );
}
