import { createSlice } from '@reduxjs/toolkit';

// import { NETWORK } from '@/config';

const initialState = {
    chainId: null,
    isCorrectChain: null,
    account: null,
    provider: null,

    config: {
    //
    },

    babyApesContract: null,
    farmContract: null,
    genesisApesContract: null,
    genesis3DApesContract: null,
    ladyApesContract: null,
    proxyContract: null,
    wacTokenContract: null,
    lpTokenContract: null,
    rentingContract: null,
    readRentingContract: null,
    vialsStakingContract: null,
    proxyNFTContract: null,
    catalystContract: null,
};

export const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        changeChainId: (state, action) => {
            state.chainId = action.payload.chainId;
            state.isCorrectChain = action.payload.isCorrectChain;
        },
        changeAccount: (state, action) => {
            state.account = action.payload;
            // state.account = '0x6fD92755302196b7A1B4C0eE5982E84A6A103f32';
            // state.account = import.meta.env.DEV ? '0x231f1408651bEc4f7fDe1670d29BD90477E92768' : action.payload;
        },
        changeProvider: (state, action) => {
            state.provider = action.payload;
        },
        changeConfig: (state, action) => {
            state.config = action.payload;
        },

        changeContracts: (state, action) => {
            const {
                babyApesContract,
                farmContract,
                genesisApesContract,
                genesis3DApesContract,
                ladyApesContract,
                proxyContract,
                wacTokenContract,
                lpTokenContract,
                rentingContract,
                readRentingContract,
                vialsStakingContract,
                proxyNFTContract,
                catalystContract,
            } = action.payload;

            state.babyApesContract = babyApesContract;
            state.farmContract = farmContract;
            state.genesisApesContract = genesisApesContract;
            state.genesis3DApesContract = genesis3DApesContract;
            state.ladyApesContract = ladyApesContract;
            state.proxyContract = proxyContract;
            state.wacTokenContract = wacTokenContract;
            state.lpTokenContract = lpTokenContract;
            state.rentingContract = rentingContract;
            state.readRentingContract = readRentingContract;
            state.vialsStakingContract = vialsStakingContract;
            state.proxyNFTContract = proxyNFTContract;
            state.catalystContract = catalystContract;
        }
    },
});

export const {
    changeAccount,
    changeChainId,
    changeProvider,
    changeConfig,
    changeContracts,
    changeBalance,
} = web3Slice.actions;
export default web3Slice.reducer;
