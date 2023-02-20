import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BUTTON_DISABLE } from '@/config';
import useResponsive from '@/hooks/useResponsive';
import { useSelectWeb3 } from '@/hooks/useSelectWeb3';
import useTabs from '@/hooks/useTabs';
import { changeDashboardTab } from '@/redux/slice/myWapes';
import { selectRentingCard } from '@/redux/slice/renting';

import { TAB_OPTIONS } from './TabsOptions';

export default function TabMenuBtn({ onCloseSidebar, isSideBar }) {
   // const { currentTab, onChangeTab } = useTabs(TAB_OPTIONS[0].value);
   const dispatch = useDispatch();
   const matches = useResponsive('custom', '(max-height: 1050px)');
   const currentTab = useSelector((state) => state?.tabSlice?.dashboardTab);

   const { account, config } = useSelectWeb3();

   useEffect(() => {
      // dispatch(changeDashboardTab(currentTab));
      dispatch(selectRentingCard('page'));
   }, [currentTab, dispatch]);

   const whitelist = config?.WHITELIST?.some(
      (userAccount) => userAccount?.toLowerCase() === account?.toLowerCase()
   );

   return (
      <Tabs
         value={currentTab}
         // onChange={dispatch(changeDashboardTab(TAB_OPTIONS[0].value))}
         orientation='vertical'
         variant='scrollable'
         scrollButtons='auto'
         TabIndicatorProps={{
            style: {
               display: 'none',
            },
         }}
         aria-label='scrollable auto tabs example'
         sx={{
            '& .MuiTabs-flexContainer': {
               display: 'grid',
               gap: {
                  xs: 1,
                  lg: 5,
                  xl: 3,
               },
               ...(matches && {
                  gap: 2,
               }),
               gridTemplateColumns: '1fr',
               // gridTemplateRows: 'repeat(7, minmax(min-content, 1fr))',
               // gridTemplateRows: 'repeat(7, minmax(10px, 1fr))',
               gridTemplateRows: 'repeat(7, 1fr)',
               height: {
                  xs: 520,
                  lg: '75vh',
               },
            },
         }}
      >
         {TAB_OPTIONS.map((tab, idx) => (
            <Tab
               key={tab.value}
               label={tab.value}
               component={idx === 5 ? Link : Button}
               to={tab.linkUrl}
               value={tab.value}
               onClick={() => {
                  if (isSideBar) {
                     onCloseSidebar();
                  }

                  dispatch(changeDashboardTab(tab.value));
               }}
               disabled={
                  !BUTTON_DISABLE?.[tab.value]?.show 
                  // ||
                  // (tab.value === 'Farm' && !whitelist)
               }
               sx={{
                  width: '100%',
                  borderRadius: '18px',
                  fontSize: 26,
                  px: 2,
                  mx: 'auto',
                  fontWeight: 'bold',

                  letterSpacing: '0.045em',
                  textTransform: 'none',
                  // mt: 2,
                  wordBreak: 'break-word',
                  color: '#fff ',
                  // minHeight: {
                  //   xs: 60,
                  //   lg: '74px',
                  // },
                  background: (theme) => theme.palette.secondary.main,
                  '&.Mui-selected': {
                     background: (theme) => theme.palette.secondary.light,
                     color: '#fff',
                  },
                  '&:hover': {
                     background: (theme) => theme.palette.secondary.main,
                     color: '#fff',
                  },
               }}
            />
         ))}
      </Tabs>
   );
}
