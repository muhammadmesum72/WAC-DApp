import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Box } from '@mui/material';

import useResponsive from '@/hooks/useResponsive';

function MButton({ loading, title, spinnerColor, sx, ...others }) {
    const matches = useResponsive('between', '', 880, 1420);

    return loading ? (
        <LoadingButton
            loading={loading}
            sx={{
            // width: "139px",
                background:
               'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                borderRadius: '12px',
                textTransform: 'capitalize !important',
                px: {
                    xs: 1,
                    sm: 1.5,
                },
                color: '#fff',
                fontSize: {
                    xs: 16,
                    sm: 18,
                },
                ...(matches && {
                    fontSize: 19,
                }),
                '& .MuiLoadingButton-loadingIndicator': {
                    color: spinnerColor || '#fff',
                },
                ...sx,
            }}
            {...others}
        >
            {title}
        </LoadingButton>
    ) : (
        <Button
            sx={{
                background:
               'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                borderRadius: '12px',
                px: {
                    xs: 1,
                    sm: 2,
                },
                color: '#fff',
                fontSize: {
                    xs: 16,
                    sm: 18,
                },

                ...(matches && {
                    fontSize: 19,
                }),
                textTransform: 'capitalize !important',
                ...sx,
            }}
            {...others}
        >
            {title}
        </Button>
    );
}

export default MButton;
