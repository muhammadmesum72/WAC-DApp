import React from 'react';
import { Button, ButtonGroup, Card, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { /* useDispatch, */ useSelector } from 'react-redux';

import { COLLECTION_NAMES } from '@/utils/constants';

import { staking } from '../../assets';

export default function RentingCard({
    card,
    onNftClick,
    cardSx,
    isRenting,
    sx,
}) {
    //  const dispatch = useDispatch();

    const { isUser: isMine/* , numOfBabies */ } = useSelector(
        (state) => state.rentingSlice,
    );

    const isGenesis = card.collectionName === COLLECTION_NAMES.genesis;
    const isLady = card.collectionName === COLLECTION_NAMES.lady;
    let price = 0;

    if (isGenesis) {
        price = card?.price;
    } else if (isLady) {
        price = card?.babyPrices
            ?.filter((newPrice) => newPrice !== '0')
            .toString();

        price = price?.split(',');
    }

    return (
        <Card
            sx={{
                height: 'auto',
                background: (theme) => theme.palette.primary.main,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '100%',
                    color: '#fff',
                    py: 0.3,
                }}
            >
                Rank: {card?.babyData ? 'Unknown' : card?.rank}
            </Typography>

            {card?.isStaked && !isRenting && (
                <Box
                    component='img'
                    src={staking}
                    sx={{
                        maxHeight: '500px',
                        height: 20,
                        width: 100,
                        borderRadius: '7px',
                        zIndex: 6,
                        // // position:'relative',
                        right: 5,
                        position: 'absolute',
                        top: 35,
                    }}
                />
            )}

            {card?.isOwner && (
                <Box
                    sx={{
                        maxHeight: '500px',
                        width: 'auto',
                        borderRadius: '7px',
                        zIndex: 6,
                        right: 15,
                        position: 'absolute',
                        top: 35,
                    }}
                >
                    <Typography
                        sx={{
                            bgcolor: 'orange',
                            textAlign: 'center',
                            borderRadius: 0.4,
                            letterSpacing: 1,
                            textShadow: 3,
                            fontSize: 18,
                            px: 2,
                        }}
                    >
                        My NFT
                    </Typography>
                </Box>
            )}

            <Box
                component='img'
                alt={card.title}
                src={card?.imgSrc || card?.img?.small}
                ratio='1/1'
                sx={{
                    borderRadius: '7px',
                }}
            />

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
                {card?.name || `Baby Weird Ape: #${card.id}`}
            </Typography>

            {isRenting && (
                <Stack
                    direction='row'
                    spacing={1}
                    justifyContent='center'
                    alignItems='center'
                    sx={{
                        mb: 1,
                    }}
                >
                    <ButtonGroup
                        onClick={() => {
                            !card.isStaked && onNftClick();
                        }}
                        variant='contained'
                        aria-label='outlined primary button group'
                        sx={{
                            minWidth: price?.length < 2 ? 74 : 120,
                            boxShadow: 0,
                            textAlign: 'center',
                            background:
                                'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',

                            '& button': {
                                // background: 'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                                color: '#fff',
                                boxShadow: 0,

                                fontSize: 18,
                                mx: 'auto',
                                background:
                                    'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',

                                letterSpacing: '0.08em',
                                '&:hover': {
                                    background:
                                        'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                                },
                            },
                        }}
                    >
                        {isLady && price ? (
                            price?.map((items) => (
                                <Button
                                    sx={{
                                        width: 75,
                                    }}
                                    key={items}
                                >
                                    {(items && Number(items).toFixed(0)) || 'Select'}
                                </Button>
                            ))
                        ) : (
                            <Button
                                sx={{
                                    minWidth: 120,
                                }}
                            >
                                {price ||
                                    (card?.isStaked && isMine
                                        ? 'Unstake to Select'
                                        : 'Select')}
                            </Button>
                        )}
                    </ButtonGroup>
                </Stack>
            )}
        </Card>
    );
}
