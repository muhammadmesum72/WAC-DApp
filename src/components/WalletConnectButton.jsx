

import React, { useEffect } from 'react';

import { Button, Box } from '@mui/material';

import { conciseAddress } from '../helpers/utilities';
import { useSelectWeb3 } from '../hooks/useSelectWeb3';
import useWeb3Connector from '../hooks/web3Connector';

function WalletConnectButton({ sx }) {
    const { onConnect, onDisconnect } = useWeb3Connector();

    const { account, rentingContract } = useSelectWeb3();

    // useEffect(() => {
    //   if(account &&  rentingContract )
    // }, [account, refetch, rentingContract]);

    return (
        <Box
            sx={{
                textAlign: 'center',
                mt: '9px',
            }}
        >
            <Button
                sx={{
                    width: {
                        xs: 140,
                        md: 150,
                    },
                    background:
                  'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                    color: '#fff',
                    borderRadius: 1,
                    fontSize: {
                        xs: 16,
                        md: 18,
                        xl: 20,
                    },
                    py: 1,
                    ...sx,
                }}
                onClick={async () => (account ? await onDisconnect() : await onConnect())}
            >
                {account ? conciseAddress(account) : 'Connect'}
            </Button>
        </Box>
    );
}

export default WalletConnectButton;
