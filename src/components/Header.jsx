

import { Box } from '@mui/system';

import useResponsive from '@/hooks/useResponsive';

import BalanceClaimBtn from './BalanceClaimBtn';
import Bottles from './Bottles';
import RankingText from './RankingText';
import TabsButton from './TabsButton';

export default function Header() {
    const matches = useResponsive('between', '', 880, 1420);
    // const matches2 = useResponsive('between', '', 880, 1170);

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 2,
                columnGap: {
                    md: 6,
                    xl: 4,
                },
                // ...(matches && {
                //   columnGap: 3,
                // }),
                gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    // lg: 'repeat(2, 1fr)',
                },

                ...(matches && {
                    columnGap: 2,
                    gridTemplateColumns:'repeat(2, 1fr)',
                }),
            }}
        >
            <Box
                sx={{
                    ...(matches && {
                        gridColumn: '1 /-1',
                        gridRow: '1 / 2',
                    }),
                }}
            >
                <BalanceClaimBtn />
            </Box>

            <Box
                sx={{
                    ...(matches && {
                        gridRow: '2 / 4',
                    }),
                }}
            >
                <Bottles />
            </Box>

            <Box
                sx={{
                    ...(matches && {
                        gridColumn: '1/2',
                        gridRow: '2 / 3',
                    }),
                }}
            >
                <TabsButton />
            </Box>

            <Box>
                <RankingText />
            </Box>
        </Box>
    );
}
