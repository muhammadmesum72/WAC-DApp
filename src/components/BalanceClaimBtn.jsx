import React/* , { useEffect } */ from 'react';

import { Box, Typography, Stack } from '@mui/material';

import { YellowCoin } from '@/assets';
import { useMutationUserClaim, useQueryBalance } from '@/hooks/react-query';
import { useQueryGetUserAssetsData } from '@/hooks/react-query/queries/myWapes-query';
import useResponsive from '@/hooks/useResponsive';
import { useSelectWeb3 } from '@/hooks/useSelectWeb3';

import MButton from './MButton';

export default function BalanceClaimBtn() {
    const { /* isLoading: isLoadingBalance, */ data: balance } = useQueryBalance();

    const { account } = useSelectWeb3();
    const { isLoading: isClaiming, mutate: claim } = useMutationUserClaim();
    const isMobile = useResponsive('down', 'sm');

    const { data: getBalanceDetails } = useQueryGetUserAssetsData();


    let tokenBalance = getBalanceDetails?.userNFTsDetails?.[0];
    let tokenPendingBalance = getBalanceDetails?.userNFTsDetails?.[1];

    tokenBalance = Math.floor(tokenBalance / 10 ** 18);
    tokenPendingBalance = Math.floor(tokenPendingBalance / 10 ** 18);

    return (
        <Box
            sx={{
                display: 'grid',
                gap: {
                    xs: 1,
                    // xl: 2,
                },
                gridTemplateColumns: {
                    xs: 'repeat(2, minmax(max-content, 1fr))',
                    sm: 'repeat(3, max-content)',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    background: (theme) => theme.palette.primary.lighter,
                    px: 1.5,
                    borderRadius: '15px',
                    '& p': {
                        fontSize: {
                            xs: '16px',
                            sm: '20px',
                        },
                        px: 0.5,
                    },
                    ...(isMobile && {
                        py: 1,
                    }),
                }}
            >
                {isMobile ? (
                    <>
                        <Stack
                            direction='row'
                            spacing={1}
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '16px',
                                        sm: '20px',
                                    },
                                }}
                            >Balance:</Typography>

                            <Box
                                component='img'
                                src={YellowCoin}
                            />
                        </Stack>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: '16px',
                                    sm: '20px',
                                },
                            }}
                        > {tokenBalance || 0}</Typography>
                    </>
                ) : (
                    <>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: '16px',
                                    sm: '20px',
                                },
                            }}
                        >Balance: {tokenBalance || 0}</Typography>

                        <Box
                            component='img'
                            src={YellowCoin}
                        />
                    </>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    background: (theme) => theme.palette.primary.lighter,
                    px: 1.5,
                    borderRadius: '15px',
                    '& p': {
                        // fontSize: '16px',
                        px: 0.5,
                    },
                    ...(isMobile && {
                        py: 1,
                    }),
                }}
            >
                {isMobile ? (
                    <>
                        <Stack
                            direction='row'
                            spacing={1}
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '16px',
                                        sm: '20px',
                                    },
                                }}
                            >Pending:</Typography>

                            <Box
                                component='img'
                                src={YellowCoin}
                            />
                        </Stack>

                        <Typography> {tokenPendingBalance || 0}</Typography>
                    </>
                ) : (
                    <>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: '16px',
                                    sm: '20px',
                                },
                            }}
                        >Pending: {tokenPendingBalance || 0}</Typography>

                        <Box
                            component='img'
                            src={YellowCoin}
                        />
                    </>
                )}
            </Box>

            <Box
                sx={{
                    ...(isMobile && {
                        gridColumn: '1/-1',
                    }),
                }}
            >
                <MButton
                    loading={isClaiming}
                    title='Claim'
                    disabled={Number(balance?.tokenPendingBalance) === 0 || !account}
                    onClick={claim}
                    sx={{
                        ...(isMobile && {
                            width: '100%',
                        }),
                    }}
                />
            </Box>
        </Box>
    );
}
