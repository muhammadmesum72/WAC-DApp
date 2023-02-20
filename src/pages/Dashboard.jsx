import React from 'react';

import { Box } from '@mui/material';

import Container from '@/components/Container';
import Scrollbar from '@/components/Scrollbar';

import DashboardTabs from '../components/Tabs/DashboardTabs';

export default function Home() {
    return (
        <Box
            sx={{
            
                height: {
                    xs: '100vh',
                    lg: '100%',
                },
            }}
        >
            <Scrollbar>
                <Container sx={{ p: { xs: 1, sm: 2, md: 2} }}>
                    <DashboardTabs />
                </Container>
            </Scrollbar>
        </Box>
    );
}
