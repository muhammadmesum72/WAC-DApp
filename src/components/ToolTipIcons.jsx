import React from 'react';

import { BoxProps, IconButton, Tooltip } from '@mui/material';

import SvgIconStyle from './SvgIconStyle';

export const ToolTipIcons = ({ tipTitle, src, sx, BtnSx }) => (
    <Tooltip title={tipTitle}>
        <IconButton
            sx={{
                ...BtnSx,
            }}
        >
            <SvgIconStyle
                src={src}
                sx={{
                    width: '12px',
                    color: 'gray',
                    '&:hover': {
                        color: (theme) => theme.palette.primary.main,
                    },
                    ...sx,
                }}
            />
        </IconButton>
    </Tooltip>
);
