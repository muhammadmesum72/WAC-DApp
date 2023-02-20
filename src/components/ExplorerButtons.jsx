import { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';

import useResponsive from '@/hooks/useResponsive';
import { useSelectExplorer } from '@/hooks/useSelectExplorer';
import {changeDimensionalSwitchType,
    changeExplorerButton} from '@/redux/slice/explorer';
import { COLLECTION_NAMES } from '@/utils/constants';

import { FilterButton } from './FilterButton';
import MSwitch from './Switch';

export default function ExplorerButtons({ isDisable }) {
    const { currentExplorerButton, dimensionalSwitchType } = useSelectExplorer();
    const matches = useResponsive('between', '', 900, 980);

    const dispatch = useDispatch();

    // useEffect(() => {
    //    dispatch(changeExplorerButton(selectedFilter));
    // }, [dispatch, selectedFilter]);

    const handleSwitch = (checked) => {
        dispatch(changeDimensionalSwitchType(!checked ? '2d' : '3d'));
    };

    return (
        <Box
            sx={{
                background: (theme) => theme.palette.primary.lighter,
                p: 1.5,
                borderRadius: '14px',

            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gap: {
                        xs: 1,
                        xl: 2,
                    },
                    width: '100%',
                    gridTemplateColumns: {
                        xs: 'repeat(2, minmax(max-content, 1fr))',
                        sm: 'repeat(5, minmax(max-content, 1fr))',
                    },

                    fontSize: {
                        xs: '16px',
                        sm: '22px',
                    },
                }}
            >
                <FilterButton
                    title={COLLECTION_NAMES.genesis}
                    selected={currentExplorerButton}
                    onClick={() =>
                        dispatch(changeExplorerButton(COLLECTION_NAMES.genesis))
                    }
                    disabled={currentExplorerButton !== COLLECTION_NAMES.genesis && isDisable}
                />

                <FilterButton
                    title={COLLECTION_NAMES.lady}
                    selected={currentExplorerButton}
                    onClick={() =>
                        dispatch(changeExplorerButton(COLLECTION_NAMES.lady))
                    }
                    disabled={currentExplorerButton !== COLLECTION_NAMES.lady && isDisable || dimensionalSwitchType === '3d'}
                />

                <FilterButton
                    title={COLLECTION_NAMES.baby}
                    selected={currentExplorerButton}
                    onClick={() =>
                        dispatch(changeExplorerButton(COLLECTION_NAMES.baby))
                    }
                    disabled={currentExplorerButton !== COLLECTION_NAMES.baby && isDisable || dimensionalSwitchType === '3d'}
                    sx={{
                        height: 'min-content',
                    }}
                />

                <Box
                    sx={{
                        alignSelf: 'center',
                        ...(matches && {
                            display: 'none',
                        }),
                    }}
                >
                    <MSwitch
                        leftlabel='2D'
                        rightlabel='3D'
                        dimensionalswitch={1}
                        handleSwitch={handleSwitch}
                        disabled={currentExplorerButton !== COLLECTION_NAMES.genesis}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    alignSelf: 'center',
                    display: 'none',
                    mt: 2,
                    ...(matches && {
                        display: 'block',
                    }),
                }}
            >
                <MSwitch
                    leftlabel='2D'
                    rightlabel='3D'
                    dimensionalswitch={1}
                    handleSwitch={handleSwitch}
                    disabled={currentExplorerButton !== COLLECTION_NAMES.genesis}
                />
            </Box>
        </Box>
    );
}
