
import React from 'react';

import { Typography, Box } from '@mui/material';

import { useQueryGetUserAssetsData } from '@/hooks/react-query/queries/myWapes-query';
import useResponsive from '@/hooks/useResponsive';

import { blueBotel, botel, greenBotel, weirIcon, YellowCoin } from '../assets';

export default function Bottles() {
    const { data: getBalanceDetails } = useQueryGetUserAssetsData();

    const greenBotelValue = getBalanceDetails?.userNFTsDetails?.[3];
    const blueBotelValue = getBalanceDetails?.userNFTsDetails?.[4];

    // const matches = useResponsive('between', '', 1200, 1420);
    // const matches2 = useResponsive('between', '', 880, 1170);
    const matches = useResponsive('between', '', 880, 1420);

    const BOTEL_DATA = [
        {
            id: 0,
            number: 0,
            icon: botel,
        },
        {
            id: 1,
            number: 0,
            icon: weirIcon,
        },
        {
            id: 2,
            number: blueBotelValue,
            icon: blueBotel,
        },
        {
            id: 3,
            number: greenBotelValue,
            icon: greenBotel,
        }
    ];

    return (
        <Box
            sx={{
                display: 'grid',
                gap: {
                    xs: 1,
                    xl: 2,
                },
                gridTemplateColumns: {
                    xs: 'repeat(2, minmax(max-content, 1fr))',
                    sm: 'repeat(4, minmax(max-content, 1fr))',
                },
                ...(matches && {
                    gridTemplateColumns: 'repeat(2, minmax(max-content, 1fr))',
                }),
                height: '100%',
            }}
        >
            {BOTEL_DATA.map((item, idx) => (
                <Box
                    key={idx + item.id}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                        background: (theme) => theme.palette.primary.lighter,
                        px: 1,
                        borderRadius: '14px',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: '16px',
                                sm: '20px',
                            },
                        }}
                    >
                        {item.number}
                    </Typography>

                    <Box
                        component='img'
                        src={item.icon}
                    />
                </Box>
            ))}
        </Box>
    );
}
