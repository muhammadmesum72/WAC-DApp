import React from 'react';
import { Box } from '@mui/system';

// import useResponsive from '@/hooks/useResponsive';

import ExplorerButtons from './ExplorerButtons';
import ExplorerIdRank from './ExplorerIdRank';

export default function ExplorerHeader({
    handleGoBtn,
    modalOpen,
    handleCloseModal,
    isDisable,
}) {

    // const matches = useResponsive('between', '', 880, 1420);

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 2,
                mb: {
                    xs: 0,
                    sm: 0.5,
                },
                columnGap: {
                    md: 2,
                    xl: 6,
                },
                gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                },
            // ...(matches && {
            //   columnGap: 2,
            //   gridTemplateColumns: 'repeat(1, min-content)',
            // }),
            }}
        >
            <Box>
                <ExplorerButtons isDisable={isDisable} />
            </Box>

            <Box
                sx={{
                    mb: {md:2.5},
                    // ...(matches && {
                    //   gridColumn: {
                    //      // xs: '1/2', sm: '1/3',
                    //   }
                    // }),
                }}
            >
                <ExplorerIdRank
                    handleGoBtn={handleGoBtn}
                    modalOpen={modalOpen}
                    handleCloseModal={handleCloseModal}
                />
            </Box>
        </Box>
    );
}
