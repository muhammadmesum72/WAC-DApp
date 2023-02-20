
import React from 'react';

import { Button, Typography, Switch, Grid } from '@mui/material';
import { Box } from '@mui/system';

import {blueBotel,
    botel,
    greenBotel,
    weirIcon,
    YellowCoin} from '../assets';
import MButton from './MButton';

export default function BalanceDetails() {
    const BOTEL_DATA = [
        {
            id: 0,
            number: 567,
            icon: botel,
        },
        {
            id: 1,
            number: 567,
            icon: weirIcon,
        },
        {
            id: 2,
            number: 567,
            icon: blueBotel,
        },
        {
            id: 3,
            number: 567,
            icon: greenBotel,
        }
    ];

    const GENETIC_DATA = [
        {
            id: 0,
            title: 'All',
        },
        {
            id: 1,
            title: 'Genesis',
        },
        {
            id: 2,
            title: 'Ladies',
        },
        {
            id: 3,
            title: 'babies',
        }
    ];

    return (
        <Box
            sx={{
                px: {
                    xl: 1,
                },
            }}
        >
            <Grid
                item
                container
                xs={12}
                sx={{
                    justifyContent: 'space-between',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    xl={5.5}
                    sx={{
                        gap: {
                            xs: 2, xl: 2,
                        },
                        display: {
                            xs: 'block', sm: 'flex',
                        },
                        justifyContent: {
                            xs: 'space-around', xl: 'left',
                        },
                        alignItems: 'center',
                        mx: {
                            xs: 'auto', xl: 0,
                        },
                        '& div': {
                            my: 2,
                            mx: 'auto',
                            maxWidth: {
                                xs: '100%', sm: '100%', xl: 218,
                            },
                            width: '100%',
                            textAlign: {
                                xs: 'center', sm: 'right', xl: 'left',
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: (theme) => theme.palette.primary.lighter,
                            px: 1.5,
                            height: 48,
                            borderRadius: '15px',
                        }}
                    >
                        <Typography>Balance:</Typography>

                        <Typography>100000</Typography>

                        <Box
                            component='img'
                            src={YellowCoin}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: (theme) => theme.palette.primary.lighter,
                            maxWidth: 218,
                            px: 1.5,
                            height: 48,
                            borderRadius: '15px',
                        }}
                    >
                        <Typography>Balance:</Typography>

                        <Typography>100000</Typography>

                        <Box
                            component='img'
                            src={YellowCoin}
                        />
                    </Box>

                    <MButton title='Claim' />
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    xl={5.5}
                    container
                    sx={{
                        justifyContent: 'space-between',
                        mx: {
                            xs: 'auto', xl: 0,
                        },
                        gap: {
                            xs: 2, xl: 0,
                        },
                        // mt: { xs: 2, xl: 0 },
                        my: 2,
                    }}
                >
                    {BOTEL_DATA.map((item, idx) => (
                        <Box
                            key={idx + item.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: (theme) => theme.palette.primary.lighter,
                                maxWidth: {
                                    xs: '120px', md: '23%', xl: 120,
                                },
                                width: '100%',
                                px: 1.5,
                                height: 48,
                                borderRadius: '14px',
                            }}
                        >
                            <Typography>{item.number}</Typography>

                            <Box
                                component='img'
                                src={item.icon}
                                sx={{}}
                            />
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}
