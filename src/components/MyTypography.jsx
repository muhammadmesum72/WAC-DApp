import React from 'react';

import {Typography} from '@mui/material';

function MyTypography({textColor,text, sx,}) {
    return (
        <Typography sx={{ fontSize:{xs:18, sm:18, md:22, lg:22,}, fontWeight:'bold',color:textColor , ...sx }}>{text}</Typography>
    );
}

export default MyTypography;