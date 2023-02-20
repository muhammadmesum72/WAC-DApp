import React from 'react';
import { Card, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { stakingB } from '@/assets';

export default function BabyCard({
    // isBaby,
    data,
    imgSrc,
    name,
    isRenting,
    card,
    // parentId,
}) {
    return (
        <Card
            sx={{
                maxWidth: isRenting ? 260 : 465,
                background: (theme) => theme.palette.primary.main,
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                px: 1,
                pb: 1,
                mx: 'auto',
                position: 'relative',
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
                    // ml: "55%",
                    textAlign: 'center',
                    width: '100%',
                    color: '#fff',
                }}
            >
                {/* Rank: {isBaby ? 'Unknown' : data?.rank} */}

            Rank: {data?.rank}
            </Typography>

            <Link
                href={data?.img?.full}
                target='_blank'
            >
                <Box
                    component='img'
                    src={imgSrc || data?.img?.medium}
                    sx={{
                        width: '100%',
                        borderRadius: '7px',
                    }}
                />
            </Link>

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

                {card?.isStaked && (
                    <Box
                        component='img'
                        src={stakingB}
                        sx={{
                            maxHeight: '500px',
                            height: '100%',
                            width: '100%',
                            borderRadius: '7px',
                            zIndex: 6,
                        }}
                    />
                )}
            </Box>

            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    zIndex: 4,
                    color: '#fff',
                    py: 0.3,
                    textAlign: 'center',
                }}
            >
                {data?.name || name || `Baby Weird Ape: #${data?.id}`}
            </Typography>
        </Card>
    );
}
