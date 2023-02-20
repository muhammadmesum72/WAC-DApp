export const supportedChains = [
    {
        name: 'Binance Smart Chain',
        short_name: 'bsc',
        chain: 'smartchain',
        network: 'mainnet',
        chain_id: 56,
        network_id: 56,
        rpc_url: 'https://bsc-dataseed1.defibit.io/',
        native_currency: {
            symbol: 'BNB',
            name: 'BNB',
            decimals: '18',
            contractAddress: '',
            balance: '',
        },
    },
    {
        name: 'Binance Smart Chain Test net',
        short_name: 'bsc-testnet',
        chain: 'smartchain',
        network: 'testnet',
        chain_id: 97,
        network_id: 97,
        rpc_url: 'https://bsc-dataseed1.defibit.io/',
        native_currency: {
            symbol: 'BNB',
            name: 'BNB',
            decimals: '18',
            contractAddress: '',
            balance: '',
        },
    },

    {
        name: 'Cronos',
        short_name: 'Cronos',
        chain: 'smartchain',
        network: 'mainnet',
        chain_id: 25,
        network_id: 25,
        rpc_url: 'https://evm.cronos.org',
        native_currency: {
            symbol: 'CRO',
            name: 'CRO',
            decimals: '18',
            contractAddress: '',
            balance: '',
        },
    },
    {
        name: 'Cronos Testnet',
        short_name: 'Cronos Testnet',
        chain: 'Cronos',
        network: 'testnet',
        chain_id: 338,
        network_id: 338,
        rpc_url: 'https://cronos-testnet-3.crypto.org:8545/',
        native_currency: {
            symbol: 'CRO',
            name: 'CRO',
            decimals: '18',
            contractAddress: '',
            balance: '',
        },
    }
];

export const supportedChainsID = supportedChains.map(
    (chainData) => chainData.chain_id
);
