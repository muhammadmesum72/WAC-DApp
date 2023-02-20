import React from 'react';
import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { COLLECTION_NAMES } from '@/utils/constants';

import { staking, Renting, stakingL, stakingB } from '../../assets';

export default function ModalCard({ selectedCard, isRenting }) {

    const isLady = selectedCard?.collectionName === COLLECTION_NAMES.lady;
    // const isBaby = selectedCard?.collectionName === COLLECTION_NAMES.baby;
    const isGenesis = selectedCard?.collectionName === COLLECTION_NAMES.genesis;

    return (

        <Box
            component='a'
            href={selectedCard?.img.full}
            target='_blank'
            sx={{
                width: '100%', textDecoration: 'none', zIndex: 9, position: 'relative',
            }}
        >
            <Card
                sx={{
                    // height: '100%',
                    maxWidth: isRenting ? 260 : 465,
                    background: (theme) => theme.palette.primary.main,
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    px: 1,
                    mx: 'auto',
                    // position: 'relative',
                }}
            >
                <Typography
                    sx={{
                        px: 1,
                        py: 0.3,
                        borderRadius: '8px',
                        fontSize: 20,
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textAlign: 'center',
                        width: '100%',
                        color: '#fff',

                    }}
                >
          Rank: {selectedCard?.rank}
                </Typography>

                <Box
                    sx={{
                        position: 'absolute',
                        top: 42,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        justifyContent: 'space-between',
                        gap: 2,
                        px: 1,
                    }}
                >
                    {/* stakingL */}

                    {(selectedCard?.isStaked) && (
                        <Box
                            component='img'
                            src={isGenesis ? staking : (isLady ? stakingL : stakingB)}
                            sx={{
                                maxHeight: '500px',
                                height: '100%',
                                width: '100%',
                                borderRadius: '7px',
                                zIndex: 6,

                            }}
                        />
                    )}

                    {(selectedCard?.isRented) && (
                        <Box
                            component='img'
                            src={Renting}
                            sx={{
                                maxHeight: '500px',
                                height: 37,
                                width: 165,
                                borderRadius: '7px',
                                zIndex: 6,

                            }}
                        />
                    )}
                </Box>

                <Box
                    component='img'
                    src={selectedCard?.img?.medium}
                    sx={{
                        width: '100%',
                        borderRadius: '7px',
                        // height:'fit-content'
                    }}
                />

                <Typography
                    sx={{
                        fontSize: 19,
                        fontWeight: 'bold',
                        zIndex: 4,
                        color: '#fff',
                        px: 1,
                        py: isRenting ? 1 : 0.3,
                        textAlign: 'center',
                    }}
                >
                    {selectedCard?.name}
                </Typography>

            </Card>
        </Box>
    );
}
