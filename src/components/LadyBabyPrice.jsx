

import React from 'react';

import { Typography, Box, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

import { YellowCoin } from '@/assets';

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        borderRadius: 6,
        padding: '0px 10px',
        position: 'relative',
        backgroundColor: '#fcfcfb',
        border: '1px solid #ced4da',
        width: 'auto',

        // padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow'
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
            '"Segoe UI Symbol"'
        ].join(','),
        '&:focus': {
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default function LadyBabyPrice({ defaultValue,num, setFemaleInput ,femaleInput }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
                gap: 1,
            }}
        >
            <Typography
                sx={{
                    fontSize: 22,
                    mr: 0.5,
                }}
            > # {num}</Typography>

            <BootstrapInput
                type='number'
                max='1'
                id='bootstrap-input'
                onChange={(e)=>setFemaleInput(e.target.value)}
                defaultValue={femaleInput}
                sx={{
                    width: '100px',
                    height: '40px',
                }}

            />

            <Typography
                sx={{
                    fontSize: 22,
                }}
            >WAC</Typography>

            <Box
                component='img'
                src={YellowCoin}

            />
        </Box>
    );
}
