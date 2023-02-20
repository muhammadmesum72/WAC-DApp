import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { LogoImage } from '../assets';

// ----------------------------------------------------------------------

Logo.propTypes = {
    sx: PropTypes.object,
};

export default function Logo({ sx }) {
    return (
        <RouterLink to='/'>
            <Box
                component='img'
                src={LogoImage}
                sx={{
                    width: {
                        xs: 70,
                        xl: 85,
                    },
                    height: {
                        xs: 70,
                        xl: 85,
                    },
                    my: {
                        xs: 1,
                        xl: 0.8,
                    },
                    ...sx,
                }}
            />
        </RouterLink>
    );
}
