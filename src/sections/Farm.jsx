
import React, { useState } from 'react';

import {
    Box,
    Divider,
    Stack,
    Card,
    Typography,
    FormControl,
    InputAdornment,
    OutlinedInput,
    Link
} from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import ClipText from '@/components/ClipText';
import Info from '@/components/Info';
import MButton from '@/components/MButton';
import SvgIconStyle from '@/components/SvgIconStyle';
import { BUTTON_DISABLE, HEIGHT } from '@/config';
import {
    useMutationERC20Approve,
    useMutationFarmStakeUnStake,
    useMutationFarmHarvest,
    useQueryFarmData,
    useQueryERC20IsApproved
} from '@/hooks/react-query';
import useResponsive from '@/hooks/useResponsive';
import { useSelectWeb3 } from '@/hooks/useSelectWeb3';
import useTabs from '@/hooks/useTabs';

const buttonStyle = {
    fontSize: 16,
    borderRadius: 1,
};

const MTypography = ({ children, sx, ...other }) => (
    <Typography
        sx={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            ...sx,
        }}
        {...other}
    >
        {children}
    </Typography>
);

const Stake = ({ isStaking }) => {
    const [amount, setAmount] = useState('0');
    const isMobile = useResponsive('down', 'sm');
    const { data: farmData } = useQueryFarmData(); //* this is give us 9 values
    const { isLoading, data: isERC20Approved } = useQueryERC20IsApproved();
    const { isLoading: isERC20Approving, mutate: approveERC20 } =
      useMutationERC20Approve();

    const { isLoading: isHarvesting, mutate: harvest } =
      useMutationFarmHarvest();
    const { isLoading: isStakingUnStaking, mutate: stakeUnStake } =
      useMutationFarmStakeUnStake();

    const { account, config } = useSelectWeb3();
    const whitelist = config?.WHITELIST?.some(
        (userAccount) => userAccount?.toLowerCase() === account?.toLowerCase()
    );

    const apy = 100 * ((1 + Number(farmData?.apr) / 36500) ** 365 - 1);

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}
            >
                <Box
                    sx={{
                        pt: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '40px 1fr',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                        
                            }}
                        >
                            <Box
                                component='img'
                                src='/img/svg/cro-logo.svg'
                                alt='cro logo'
                                sx={{
                                    width: 42,
                                    height: 42,
                                    position: 'fixed',
                                    zIndex: 1,
                                    display:{xs:'none',sm:'block'}
                                }}
                            />

                            <Box
                                component='img'
                                src='/img/svg/wac-logo.png'
                                alt='wac logo'
                                sx={{
                                    width: 38,
                                    height: 38,
                                    position: 'absolute',
                                    zIndex: 2,
                                    left: 10,
                                    top: 20,
                                }}
                            />
                        </Box>

                        <Stack
                            direction='column'
                            spacing={0}
                            justifyContent='start'
                            alignItems='start'
                        >
                            <MTypography
                                sx={{
                                    color: 'gray',
                                    fontSize: 16,
                                }}
                            >
                        FARMING
                            </MTypography>

                            <MTypography
                                sx={{
                                    fontSize: 16,
                                }}
                            >
                        WAC-CRO
                            </MTypography>
                        </Stack>

                        <Box
                            sx={{
                                gridColumn: '1/ -1',
                            }}
                        >
                            <Stack
                                direction='row'
                                spacing={1}
                                ml={2}
                            >
                                <Link
                                    href='https://dexscreener.com/cronos/0x88d84dcc19118378b56a33b5461b0e54e65b4ada'
                                    underline='none'
                                    target='_blank'
                                    sx={{
                                        color: '#CF8619',
                                        fontSize: 16,
                                    }}
                                >
                           See pair info
                                </Link>
                            </Stack>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        pt: 1,
                    }}
                >
                    <Stack
                        direction='row'
                        spacing={1}
                        justifyContent='center'
                    >
                        <MTypography
                            sx={{
                                fontSize: 14,
                            }}
                        >
                     WAC Address Contract
                        </MTypography>

                        <ClipText address='0xcf639e01bCDAe12c5405fe575B60499107A6B4FC' />
                    </Stack>

                    <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'
                        mt={1}
                    >
                        <SvgIconStyle
                            src='/img/svg/info.svg'
                            sx={{
                                width: 16,
                                height: 16,
                            }}
                        />

                        <MTypography
                            sx={{
                                fontSize: 12,
                                ml: -1,
                            }}
                        >
                     Enter the address manually in the link below:
                        </MTypography>
                    </Stack>

                    <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'
                        mt={1}
                        justifyContent='center'
                    >
                        <Link
                            href='https://mm.finance/swap'
                            underline='none'
                            target='_blank'
                            sx={{
                                color: '#CF8619',
                                fontSize: 20,
                            }}
                        >
                     Swap $WAC
                        </Link>

                        <Link
                            href='https://mm.finance/add'
                            underline='none'
                            target='_blank'
                            sx={{
                                color: '#CF8619',
                                fontSize: 20,
                            }}
                        >
                     Add Liquidity
                        </Link>
                    </Stack>
                </Box>
            </Box>

            <Divider
                sx={{
                    my: 2,
                }}
            />

            {/*  */}

            <Stack
                direction='column'
                spacing={1}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: '1fr max-content',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        justifyItems: 'start',
                    }}
                >
                    <Stack
                        direction='row'
                        spacing={1}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <MTypography>LIQUIDITY</MTypography>

                        <Info
                            message={
                                'Total value of the funds in WAC-CRO\'s liquidity pool'
                            }
                        />
                    </Stack>

                    <MTypography>
                  ${Number(farmData?.liquidity).toFixed(0)}
                    </MTypography>

                    <Stack
                        direction='row'
                        spacing={1}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <MTypography width='min-content'>TLV</MTypography>

                        <Info
                            message={
                                'Total Value Locked in this farm\'s liquidity pool'
                            }
                        />
                    </Stack>

                    <MTypography>${Number(farmData?.tvl).toFixed(2)}</MTypography>

                    <Stack
                        direction='row'
                        spacing={1}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <MTypography>APR</MTypography>

                        <Info message='Annual Percentage Rate (paid in WAC)' />
                    </Stack>

                    <MTypography>{Number(farmData?.apr).toFixed(2)}%</MTypography>

                    <Stack
                        direction='row'
                        spacing={1}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <MTypography>APY</MTypography>

                        <Info message='Annual Percentage Yield (if daily compound)' />
                    </Stack>

                    <MTypography>{Number(apy).toFixed(2)}%</MTypography>
                </Box>

                <Stack
                    direction='row'
                    spacing={1}
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <MTypography>WAC-CRO LP STAKED</MTypography>

                    <MTypography>
                        {Number(farmData?.skated).toFixed(2)} ($

                        {Number(farmData?.stakedInUsd).toFixed(2)})
                    </MTypography>
                </Stack>

                <Stack
                    direction='row'
                    spacing={1}
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <MTypography>WAC EARNED</MTypography>

                    <MTypography>
                        {Number(farmData?.earned).toFixed(2)} ($

                        {Number(farmData?.earnedInUsd).toFixed(2)})
                    </MTypography>
                </Stack>

                <Stack
                    direction='row'
                    spacing={1}
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <MTypography>
                  BALANCE: {Number(farmData?.balance).toFixed(2)} ($

                        {Number(farmData?.balanceInUsd).toFixed(2)})
                    </MTypography>

                    <MButton
                        loading={isHarvesting}
                        title='HARVEST'
                        disabled={Number(farmData.balance) === 0 || !whitelist || BUTTON_DISABLE.Farm.harvest}
                        onClick={() => harvest()}
                        sx={{
                            ...buttonStyle,
                        }}
                    />
                </Stack>
            </Stack>

            <Stack
                direction='row'
                spacing={1}
                justifyContent='space-between'
                alignItems='center'
                mt={2}
            >
                <FormControl
                    sx={{
                        width: '100%',
                    }}
                    variant='outlined'
                >
                    <OutlinedInput
                        fullWidth
                        inputProps={{
                            min: 0,
                            style: {
                                textAlign: isMobile ? 'right' : 'left',
                                marginLeft: 10,
                                fontSize: 20,
                            },
                        }}
                        sx={{
                            textAlign: 'center',
                            pl: 0.5,
                            // pr: 0,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#DBDBDB',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#DBDBDB !important',
                            },

                            // borderTopRightRadius: 0,
                            // borderTopLeftRadius: 0,
                        }}
                        id='stake-approve'
                        type='number'
                        placeholder='Enter Value'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        startAdornment={(
                            <InputAdornment position='end'>
                                <MButton
                                    sx={{
                                        ...buttonStyle,
                                    }}
                                    // loading={isClaiming}
                                    title='MAX'
                                    // disabled={Number(balance?.tokenPendingBalance) === 0 || !account}
                                    onClick={() => setAmount(Number(farmData.balance))}
                                />
                            </InputAdornment>
                        )}
                        endAdornment={
                            !isMobile && (
                                <InputAdornment position='end'>
                                    <MButton
                                        loading={isERC20Approving || isStakingUnStaking}
                                        title={
                                            isERC20Approved
                                                ? (isStaking
                                                    ? 'STAKE'
                                                    : 'UNSTAKE')
                                                : 'APPROVE'
                                        }
                                        // disabled={Number(balance?.tokenPendingBalance) === 0 || !account}
                                        onClick={() =>
                                            isERC20Approved
                                                ? stakeUnStake({
                                                    isStaking,
                                                    amount,
                                                })
                                                : approveERC20()
                                        }
                                        disabled={!whitelist || BUTTON_DISABLE.Farm.approve}
                                        sx={{
                                            ...buttonStyle,
                                        }}
                                    />
                                </InputAdornment>
                            )
                        }
                        label=''
                        // {...other}
                    />
                </FormControl>
            </Stack>

            {isMobile && (
                <Stack
                    direction='row'
                    spacing={1}
                    mt={3}
                >
                    <MButton
                        // loading={isClaiming}
                        title='APPROVE'
                        // onClick=
                        sx={{
                            width: '100%',
                        }}
                    />
                </Stack>
            )}
        </>
    );
};
const TAB_OPTIONS = [
    {
        id: 1,
        value: 'STAKE',
        component: <Stake isStaking />,
    },
    {
        id: 2,
        value: 'UNSTAKE',
        component: <Stake isStaking={false} />,
    }
];

export default function Farm() {
    const { currentTab, onChangeTab } = useTabs(TAB_OPTIONS[0].value);

    return (
        <Box
            sx={{
                pb: {
                    xs: 4,
                    sm: 0,
                },
            }}
        >
            <Stack
                direction='row'
                spacing={1}
                justifyContent={{
                    xs: 'start',
                    sm: 'center',
                }}
                alignItems='start'
                sx={{
                    height: HEIGHT,
                }}
            >
                <Card
                    sx={{
                        height: 'auto',
                        background: (theme) => theme.palette.primary.main,
                        width: {
                            xs: '100%',
                            sm: 'max-content',
                        },
                        // maxWidth: 470,
                        borderRadius: '7px',
                    }}
                >
                    <Tabs
                        value={currentTab}
                        onChange={onChangeTab}
                        TabIndicatorProps={{
                            style: {
                                display: 'none',
                            },
                        }}
                        aria-label='scrollable auto tabs example'
                        sx={{
                            '& .MuiTabs-flexContainer': {
                                //
                            },
                        }}
                    >
                        {TAB_OPTIONS.map((tab, idx) => (
                            <Tab
                                key={tab.value}
                                label={tab.value}
                                disableRipple
                                value={tab.value}
                                sx={{
                                    flex: 1,
                                    minWidth: 'max-content',
                                    fontSize: 18,
                                    background: (theme) => theme.palette.secondary.main,
                                    color: '#fff ',
                                    '&.Mui-selected': {
                                        background: (theme) =>
                                            theme.palette.primary.darker,
                                        color: '#fff ',
                                    },
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.4)',
                                    },
                                }}
                            />
                        ))}
                    </Tabs>

                    {TAB_OPTIONS.map((tab) => {
                        const isMatched = tab.value === currentTab;

                        return (
                            isMatched && (
                                <Box
                                    key={tab.value}
                                    sx={{
                                        p: 3,
                                        pt: 0,
                                    }}
                                >
                                    {tab.component}
                                </Box>
                            )
                        );
                    })}
                </Card>
            </Stack>
        </Box>
    );
}
