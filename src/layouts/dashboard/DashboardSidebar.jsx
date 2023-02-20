
import React, { useEffect } from 'react';

import {
    Box,
    Button,
    Drawer,
    Grid,
    IconButton,
    Link,
    Stack,
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { /* Link as RouterLink, */ useLocation } from 'react-router-dom';

// import WalletConnectButton from '@/components/WalletConnectButton';

import MenuDropDown from '@/components/DropDownMenu';
import TabMenuBtn from '@/components/Tabs/TabMenuBtn';

import Scrollbar from '../../components/Scrollbar';
import useResponsive from '../../hooks/useResponsive';
import { BUTTON_ARRAY, ICON_BTN_ARRAY } from './DashboardNavbar';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 290;

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        // width: DRAWER_WIDTH,
    },
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
    const { pathname } = useLocation();

    const isDesktop = useResponsive('up', 'lg');

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
    }, [pathname]);

    const handleClickAway = () => {
        onCloseSidebar();
    };

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <ClickAwayListener onClickAway={handleClickAway}>

                <Box
                    sx={{
                        px: 2.5,
                        pb: 3,
                        mt: 10,
                    }}
                >
                    <Stack
                        direction='column'
                        alignItems='stretch'
                        spacing={3}
                        sx={{
                            flex: 1,
                            pt: 5,
                            borderRadius: 2,
                            position: 'relative',
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                display: {
                                    lg: 'none',
                                },
                            }}
                        >
                            <Box>
                                {BUTTON_ARRAY.map((btn, idx) => (
                                    <Button
                                        fullWidth
                                        onClick={onCloseSidebar}
                                        key={btn.title + idx}
                                        component='a'
                                        href={btn.link}
                                        target='_blank'
                                        sx={{
                                            mr: 1,
                                            color: '#fff !important',
                                            fontWeight: 700,
                                            letterSpacing: '0.045em',
                                            fontSize: 18,
                                            justifyContent: 'left',
                                            '&:hover': {
                                                background: '#919190',
                                                color: '#fff',
                                            },

                                            maxWidth: idx === 1 ? '155px' : '160px',
                                            width: '100%',
                                            background: (theme) => theme.palette.primary.main,
                                            borderRadius: 1,
                                            pl:3,

                                        }}
                                    >
                                        {btn.title}
                                    </Button>
                                ))}

                                <Box
                                    sx={{
                                        mt: 1,
                                    }}
                                >
                                    <MenuDropDown />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    '& svg': {
                                        fill: '#fff !important',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        my: 3,
                                        mx: 'auto',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    {ICON_BTN_ARRAY.map((icon, idx) => (
                                        <IconButton
                                            component={Link}
                                            onClick={onCloseSidebar}
                                            target='_blank'
                                            href={icon.link}
                                            key={idx + icon.id}
                                            sx={{
                                                color: 'common.white',
                                                background:
                                    'rgba(255, 255, 255, 0.5) !important',
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Box
                                                component='img'
                                                src={icon.src}
                                                sx={{
                                                    color: '#fff',
                                                    width: 30,
                                                }}
                                            />
                                        </IconButton>
                                    ))}
                                </Box>

                                <TabMenuBtn onCloseSidebar={onCloseSidebar} isSideBar />

                                {/* <WalletConnectButton /> */}
                            </Box>
                        </Grid>
                    </Stack>
                </Box>
            </ClickAwayListener>

        </Scrollbar>
    );

    return (

        <RootStyle>
            {!isDesktop && (
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    // onClick={onCloseSidebar}
                    hideBackdrop
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: '#000',
                            boxShadow: 0,
                        },
                    }}
                >
                    {renderContent}
           
                </Drawer>
            )}
        </RootStyle>
    // </ClickAwayListener>
    );
}
