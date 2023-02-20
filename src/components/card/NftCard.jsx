
import React, { /* useEffect, */ useState } from 'react';

import { Card, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

import { COLLECTION_NAMES } from '@/utils/constants';

import { staking, Renting, stakingL, stakingB } from '../../assets';
// import Image from '../Image';
import MButton from '../MButton';
import RentingModal from '../Modal/RentingModal';

export default function NftCard({
    breed = false,
    card,
    onBtnClick,
    onNftClick,
    cardSx,
    isRenting,
    // selectedRenting,
    // selectedCard,
    sx,
    stakedArrayCard,
}) {
    const [renting, setRenting] = useState(false);

    const handleRentingModalOpen = () => setRenting(true);
    const handleRentingModalClose = () => setRenting(false);
    const isLady = card?.collectionName === COLLECTION_NAMES.lady;
    // const isBaby = card?.collectionName === COLLECTION_NAMES.baby;
    const isGenesis = card?.collectionName === COLLECTION_NAMES.genesis;
    const multipleStakedState = useSelector(state => state.tabSlice.multipleStaking);
    const multipleUnStakedState = useSelector(state => state.tabSlice.multipleUnstaking);

    return (
        <Card
            onClick={onNftClick}
            sx={{
                height: 'auto',
                background:
               (multipleStakedState || multipleUnStakedState) &&
               stakedArrayCard?.includes(card)
                   ? (theme) => theme.palette.primary.lighter
                   : (theme) => theme.palette.primary.main,
                // width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // py: 1,
                px: 1,
                position: 'relative',
                borderRadius: '7px',
                ...cardSx,
            }}
        >
            <Typography
                sx={{
                    px: 1,
                    borderRadius: '8px',
                    // height: '42px',
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    // ml: "55%",
                    textAlign: 'center',
                    width: '100%',
                    color: '#fff',
                    py: 0.3,
                }}
            >
            Rank:{' '}

                {card?.babyData || card?.incubatedBWAC ? 'Unknown' : card?.rank}
            </Typography>

            <Box
                sx={{
                    position: 'absolute',
                    right: 14,
                    left: 14,
                    top: 35,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {card?.isStaked && (
                    <Box
                        component='img'
                        // src={staking}
                        src={isGenesis ? staking : (isLady ? stakingL : stakingB)}
                        sx={{
                            maxHeight: '500px',
                            height: 20,
                            width: 100,
                            borderRadius: '7px',
                            zIndex: 6,
                        }}
                    />
                )}

                {card?.isRented && (
                    <Box
                        component='img'
                        src={Renting}
                        sx={{
                            maxHeight: '500px',
                            height: 20,
                            width: 100,
                            borderRadius: '7px',
                            zIndex: 6,
                            justifySelf: 'end',
                        }}
                    />
                )}
            </Box>

            {}

            <Box
                component='img'
                src={card?.incubatedBWAC ? card?.imgSrc : card?.img?.small}
                sx={{
                    maxHeight: '500px',
                    height: 'auto',
                    width: '100%',
                    borderRadius: '7px',
                }}
            />

            {/* <Image
            alt={card.title}
            src={card?.imgSrc || card?.img?.small}
            ratio='1/1'
            sx={{
               maxHeight: '500px',
               height: 'auto',
               width: '100%',
               borderRadius: '7px',
            }}
         /> */}

            <Typography
                sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    zIndex: 4,
                    color: '#fff',
                    py: 0.3,
                    textAlign: 'center',
                    ...sx,
                }}
            >
                {card?.name || `Baby Weird Ape: #${card?.id}`}
            </Typography>

            {(breed || isRenting) && (
                <Stack
                    direction='row'
                    spacing={1}
                    justifyContent='center'
                    alignItems='center'
                    sx={{
                        mb: 1,
                    }}
                >
                    <MButton
                        title={isRenting ? 'View Offer' : 'Select'}
                        onClick={isRenting ? handleRentingModalOpen : onBtnClick}
                        sx={{
                            px: 2,
                            fontSize: 18,
                        }}
                    />
                </Stack>
            )}

            <RentingModal
                open={renting}
                handleClose={handleRentingModalClose}
            />
        </Card>
    );
}
