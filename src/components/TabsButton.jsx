import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';

import useResponsive from '@/hooks/useResponsive';
import { useSelectMyWapes } from '@/hooks/useSelectMyWapes';
import { changeTab, rentingTab, changeDimension } from '@/redux/slice/myWapes';
import { COLLECTION_NAMES } from '@/utils/constants';

import { FilterButton } from './FilterButton';
import MSwitch from './Switch';

export default function   TabsButton({ isRenting }) {
    const { currentTab: nftType, rentingCurrentTab, dimensionalSwitchType } =
      useSelectMyWapes(isRenting);
    const dispatch = useDispatch();
    const isMobile = useResponsive('down', 'sm');
    // dispatch(currentTab({isRenting}))

    const handleSwitch = (checked) => {
        dispatch(changeDimension(!checked ? '2d' : '3d'));
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gap: {
                    xs: 1,
                    // xl 2,
                },
                // width: 'fit-content',
                gridTemplateColumns: {
                    xs: 'repeat(2, minmax(max-content, 1fr))',
                    sm: !isRenting
                        ? 'repeat(5, minmax(max-content, 1fr))'
                        : 'repeat(2, minmax(max-content, 1fr))',
                },
                background: (theme) => theme.palette.primary.lighter,
                p: 1,
                borderRadius: '14px',
                fontSize: {
                    xs: '16px',
                    sm: '22px',
                },

                width: '100%',
            // ...(isMobile && {
            //   width: '100%',
            // }),
            }}
        >
            {!isRenting && (
                <FilterButton
                    title={COLLECTION_NAMES.all}
                    selected={nftType}
                    onClick={() => dispatch(changeTab(COLLECTION_NAMES.all))}
                />
            )}

            <FilterButton
                title={COLLECTION_NAMES.genesis}
                selected={!isRenting ? nftType : rentingCurrentTab}
                onClick={() =>
                    dispatch(
                        !isRenting
                            ? changeTab(COLLECTION_NAMES.genesis)
                            : rentingTab(COLLECTION_NAMES.genesis)
                    )
                }
            />

            <FilterButton
                title={COLLECTION_NAMES.lady}
                selected={!isRenting ? nftType : rentingCurrentTab}
                onClick={() =>
                    dispatch(
                        !isRenting
                            ? changeTab(COLLECTION_NAMES.lady)
                            : rentingTab(COLLECTION_NAMES.lady)
                    )
                }
                disabled={dimensionalSwitchType === '3d'}
            />

            {!isRenting && (
                <FilterButton
                    title={COLLECTION_NAMES.baby}
                    selected={nftType}
                    onClick={() => dispatch(changeTab(COLLECTION_NAMES.baby))}
                    disabled={dimensionalSwitchType === '3d'}
                />
            )}

            {!isRenting && (
                <Box
                    sx={{
                        alignSelf: 'center',
                        ...(isMobile && {
                            gridColumn: '1/-1',
                            justifySelf: 'center',
                        }),
                    }}
                >
                    <MSwitch
                        leftlabel='2D'
                        rightlabel='3D'
                        dimensionalswitch={1}
                        handleSwitch={handleSwitch}
                        disabled={![COLLECTION_NAMES.all, COLLECTION_NAMES.genesis].includes(nftType)}
                    />
                </Box>
            )}
        </Box>
    );
}
