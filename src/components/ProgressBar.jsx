import * as React from 'react';

import Box from '@mui/material/Box';
import CircularProgress, {circularProgressClasses} from '@mui/material/CircularProgress';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
         theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: '#FF0000',
        boxShadow: 'inset 0px 4px 4px rgba(255, 252, 252, 0.68)',
        borderRadius: '0px 10px 10px 0px',
    },
}));

// Inspired by the former Facebook spinners.

export default function CustomizedProgressBars() {
    return (
        <Box
            sx={{
                flexGrow: 1,
                mt: 1,
            }}
        >
            <BorderLinearProgress
                variant='determinate'
                value={30}
            />
        </Box>
    );
}
