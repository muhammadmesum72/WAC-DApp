import React, { useState } from 'react';

// import { ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

// import { AppBg } from '../dashboard/assets';
import { AppBg } from '@/assets';

import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

// const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    // display: 'flex',
    // minHeight: '100%',
    // overflow: 'hidden',
    background: `url(${AppBg}), #000`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100vh',
    border: '1px solid #000',
    paddingTop: APP_BAR_DESKTOP,
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
        paddingTop: APP_BAR_DESKTOP,
    },

    [theme.breakpoints.down('lg')]: {
        paddingTop: APP_BAR_DESKTOP,
        // ...(!transparent && { paddingTop: APP_BAR_DESKTOP }),
        // paddingTop: APP_BAR_DESKTOP,
        paddingBottom: '0px',
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),
    },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    // const handleClickAway = () => {
    //     setOpen(false);
    // };

    return (
        <RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(!open)} />

            {/* <ClickAwayListener onClickAway={handleClickAway}> */}

            <DashboardSidebar
                isOpenSidebar={open}
                onCloseSidebar={() => setOpen(false)}
            />

            {/* </ClickAwayListener> */}

            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    );
}
