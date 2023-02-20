import React, { useEffect } from 'react';

import { Box, IconButton, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { closeBtn } from '@/assets';
import useResponsive from '@/hooks/useResponsive';
import { useSelectExplorer } from '@/hooks/useSelectExplorer';
import { changeEnteredNumber, changeIdRankType } from '@/redux/slice/explorer';
import { COLLECTION_NAMES } from '@/utils/constants';

import MButton from './MButton';
import MSwitch from './Switch';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    color: '#000',
    borderRadius: '24px',
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
        borderRadius: 14,
        position: 'relative',
        backgroundColor: '#fcfcfb',
        border: '1px solid #ced4da',
        width: 'auto',
        // padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default function ExplorerIdRank({
    handleGoBtn,
    modalOpen,
    handleCloseModal,
}) {
    const isMobile = useResponsive('down', 'sm');
    const {
        currentExplorerButton,
        // dimensionalSwitchType,
        // idRankType,
        // enteredNumber,
    } = useSelectExplorer();
    const dispatch = useDispatch();
    const handleSwitch = (checked) => {
        dispatch(changeIdRankType(!checked ? 'id' : 'rank'));
    };

    useEffect(() => {
        if (currentExplorerButton === COLLECTION_NAMES.baby)
            dispatch(changeIdRankType('id'));
    }, [currentExplorerButton, dispatch]);

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gap: {
                        xs: 1,
                        xl: 2,
                    },
                    width: {
                        xs: '100%',
                        md: 'min-content',
                    },
                    gridTemplateColumns: {
                        xs: 'repeat(2, minmax(max-content, 1fr))',
                        sm: 'repeat(3, minmax(max-content, 1fr))',
                    },
                    background: (theme) => theme.palette.primary.lighter,
                    p: 1.5,
                    mr: 6,
                    borderRadius: '14px',
                    fontSize: {
                        xs: '16px',
                        sm: '22px',
                    },
                }}
            >
                {!modalOpen && (
                    <Box
                        sx={{
                            alignSelf: 'center',
                        }}
                    >
                        <MSwitch
                            leftlabel='ID'
                            rightlabel='Rank'
                            idrankswitch={1}
                            handleSwitch={handleSwitch}
                            // disabled={currentExplorerButton === COLLECTION_NAMES.baby}
                        />
                    </Box>
                )}

                <Box
                    sx={{
                        alignSelf: 'center',
                        maxWidth: {
                            xs: 110,
                            sm: '150px',
                        },
                    }}
                >
                    <BootstrapInput
                        type='number'
                        id='bootstrap-input'
                        disabled={false}
                        sx={{
                            width: '100%',
                            position: 'relative',
                            zIndex: 9,
                        }}
                        onChange={(e) =>
                            dispatch(changeEnteredNumber(e.target.value))
                        }
                    />
                </Box>

                <Box
                    sx={{
                        ...(isMobile && {
                            gridColumn: '1/-1',
                        }),
                    }}
                >
                    <MButton
                        title='Go!'
                        // disabled={!currentExplorerButton || !enteredNumber}
                        sx={{
                            fontSize: 20,
                            borderRadius: '8px',
                            py: 0,
                            ...(isMobile && {
                                width: '100%',
                            }),
                            position: 'relative',
                            zIndex: 2,
                        }}
                        onClick={handleGoBtn}
                    />
                </Box>
            </Box>

            {modalOpen && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        mt: {
                            xs: 1,
                            md: -8,
                        },
                        mr: {
                            xs: 1,
                            md: 0,
                        },
                        position: 'relative',
                    }}
                >
                    <IconButton
                        onClick={handleCloseModal}
                        // sx={{
                        //   position: {
                        //      // xs: 'absolute',
                        //      // sm: 'absolute',
                        //   },
                        //  // right: 10,
                        //  // top: -40,
                        //  // zIndex: 9,
                        // }}
                    >
                        <Box
                            component='img'
                            src={closeBtn}
                            sx={{
                                width: 30,
                            }}
                        />
                    </IconButton>
                </Box>
            )}
        </>
    );
}
