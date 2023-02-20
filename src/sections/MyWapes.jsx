import React, { useState } from 'react';

import { Box } from '@mui/material';

import BabiesDetailsModal from '@/components/Modal/BabiesDetailsModal';
import NFTModal from '@/components/Modal/NFTModal';
import { NftList } from '@/components/NftList';

import Header from '../components/Header';

export default function MyWapes() {
    const [selectedNft, setSelectedNft] = useState();
    const [open, setOpen] = useState(false);
    const handleCloseModal = () => {
        setOpen(false);
    };
    const handleOpenModal = () => setOpen(true);

    // babies details modal
    const [openBabyDetails, setOpenBabyDetails] = useState(false);
    const handleCloseBabyDetailsModal = () => setOpenBabyDetails(false);
    const handleOpenBabyDetailsModal = () => setOpenBabyDetails(true);

    const handleNftClick = (selectObj) => {
        setSelectedNft(selectObj);
        handleOpenModal();
    };

    const handleBabyDetails = (selectObj) => {
        setSelectedNft(selectObj);
        handleOpenBabyDetailsModal();
    };

    return (
        <Box
            sx={{
                pb: {
                    xs: 4,
                    sm: 0,
                },
            }}
        >
            {open || openBabyDetails ? (
                openBabyDetails ? (
                    <BabiesDetailsModal
                        handleCloseModal={handleCloseBabyDetailsModal}
                        open={openBabyDetails}
                        selectedCard={selectedNft}
                    />
                ) : (
                    <NFTModal
                        handleCloseModal={handleCloseModal}
                        open={open}
                        selectedCard={selectedNft}
                    />
                )
            ) : (
                <Box >
                    <Header />

                    <Box
                        sx={{
                            mt: 4,
                        }}
                    >
                        <NftList
                            handleNftClick={handleNftClick}
                            handleBabyDetails={handleBabyDetails}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
