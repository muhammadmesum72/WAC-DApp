import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { DeFiWeb3Connector } from 'deficonnect';
import { providers } from 'web3modal';

import { infuraId, NETWORK } from '../config';

// export const providerOptions = {
//   walletconnect: {
//      package: WalletConnectProvider,
//      options: {
//         infuraId,
//      },
//   },
//   // coinbasewallet: {
//   //  package: CoinbaseWalletSDK,
//   //  options: {
//   //    appName: 'Web3Modal coinbasewallet',
//   //    infuraId,
//   //  },
//   // },
//   'custom-defiwallet': {
//      display: {
//         logo: 'https://crypto.com/static/06ab78bca1a07a4fd7f9146c8e600d0f/415a1/icon.png',
//         name: 'Crypto.com DeFi Wallet',
//         description: 'Connect with DeFi Wallet browser extension or app',
//      },
//      options: {},
//      package: WalletConnectProvider,
//      connector: async () => {
//         const connector = new DeFiWeb3Connector({
//            supportedChainIds: [NETWORK.ID],
//            rpc: {
//               [NETWORK.ID]: NETWORK.RPC,
//            },
//         });

//         await connector.activate();

//         return await connector.getProvider();
//      },
//   },
// };

// https://github.com/Web3Modal/web3modal/issues/242#issuecomment-1024968629
// if (!window.ethereum) {
//   providerOptions['custom-metamask'] = {
//      display: {
//         logo: providers.METAMASK.logo,
//         name: 'Install MetaMask',
//         description: 'Connect using browser wallet',
//      },
//      package: {
// },
//      connector: async () => {
//         window.open('https://metamask.io');
//         throw new Error('MetaMask not installed');
//      },
//   };
// }

export const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: '4e996ad0d62449cab486de7242d26ef6',
            rpc: {
                // [config.NETWORK.ID]: config.NETWORK.RPC,
                338: 'https://evm-cronos.crypto.org',
            },
        },
    },

    injected: {
        display: {
            logo: 'https://github.com/MetaMask/brand-resources/raw/master/SVG/metamask-fox.svg',
            name: 'MetaMask',
            description: 'Connect with MetaMask in your browser',
        },
        package: null,
    },

    'custom-defiwallet': {
        display: {
            logo: 'https://crypto.com/static/06ab78bca1a07a4fd7f9146c8e600d0f/415a1/icon.png',
            name: 'Crypto.com DeFi Wallet',
            description: 'Connect with DeFi Wallet browser extension or app',
        },
        options: {
            //
        },
        package: WalletConnectProvider,
        connector: async () => {
            const connector = new DeFiWeb3Connector({
                // supportedChainIds: [config.NETWORK.ID],
                supportedChainIds: [338],
                rpc: {
                    // [config.NETWORK.ID]: config.NETWORK.RPC,
                    338: 'https://evm-cronos.crypto.org',
                },
            });

            await connector.activate();

            return connector.getProvider();
        },
    },
};

if (!window.ethereum) {
    providerOptions['custom-metamask'] = {
        display: {
            logo: providers.METAMASK.logo,
            name: 'Install MetaMask',
            description: 'Connect using browser wallet',
        },
        package: {
            //
        },
        connector: async () => {
            window.open('https://metamask.io');
            throw new Error('MetaMask not installed');
        },
    };
}
