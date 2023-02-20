import React from 'react';

import { Co2Sharp } from '@mui/icons-material';
import { Button } from '@mui/material';

export const FilterButton = ({ title, selected, sx, ...other }) => (
    <Button
        sx={{
            background: (theme) => theme.palette.primary.lighter,
            px: 2.5,
            py: {
                xs: 1, sm: 0,
            },
            borderRadius: '14px',
            textAlign: 'center',
            color: '#fff',
            textTransform: 'capitalize',
            fontSize: {
                xs: '16px',
                sm: '22px',
            },
            ...(selected === title && {
                background: (theme) => theme.palette.primary.darker,
                color: '#fff',
            }),
            '&:hover': {
                background: 'rgba(255, 255, 255, 0.4)',
            },
            ...sx,
        }}
        {...other}
    >
        {title}
    </Button>
);
