import React from 'react';

import { Container as MContainer } from '@mui/material/';

const Container = ({ children, sx, ...other }) => (
    <MContainer
        maxWidth='xl'
        // maxWidth={false}
        sx={{
            ...sx,
        }}
        {...other}
    >
        {children}
    </MContainer>
);

export default Container;
