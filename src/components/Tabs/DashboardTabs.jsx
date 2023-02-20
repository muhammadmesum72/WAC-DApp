import { useEffect } from 'react';

import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { HEIGHT } from '@/config';
import useResponsive from '@/hooks/useResponsive';
import { selectRentingCard } from '@/redux/slice/renting';

import Scrollbar from '../Scrollbar';
import TabMenuBtn from './TabMenuBtn';
import { TAB_OPTIONS } from './TabsOptions';

export default function DashboardTabs() {
  const isLgDown = useResponsive('down', 'lg');
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state?.tabSlice?.dashboardTab);

  useEffect(() => {
    // dispatch(changeDashboardTab(currentTab));
    dispatch(selectRentingCard('page'));
  }, [currentTab, dispatch]);

  return (
    <Box
       sx={{
        pl: {
          xs: 0,
          lg: 5.5,
        },
        display: 'grid',
        // gridTemplateColumns: '1fr 2fr',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'minmax(200px, 1fr) 4fr',
        },
        gridAutoRows: '1fr',
        // gridTemplateRows: 'auto',
        columnGap: 5.5,
        // height:'100',
        // maxHeight: '75vh',
        // width: '90vw',
      }}
    >
      {!isLgDown && (
        <Box
           sx={{
            mt: 0.7,
            py: 3,
          }}
        >
          <TabMenuBtn />
        </Box>
      )}

      <Box
         sx={{
          background: (theme) => theme.palette.primary.maxLight,
          borderRadius: '32px',
          py: 3,
          pb: 5,
        }}
      >
        <Box
           sx={{
            height: HEIGHT,
            overflow: 'auto',
            ...(isLgDown && {
              height: 'auto',
              maxHeight: {
                xs: '80vh',
                sm: '75vh',
              },
            }),
            // pb:10,
          }}
        >
          <Scrollbar autoHide={false}>
            {TAB_OPTIONS.map((tab) => {
              const isMatched = tab.value === currentTab;

              return (
                isMatched && (
                  <Box
                     key={tab.value}
                     sx={{
                      px: 2,
                    }}
                  >
                    {tab.component}
                  </Box>
                )
              );
            })}
          </Scrollbar>
        </Box>
      </Box>
    </Box>
  );
}
