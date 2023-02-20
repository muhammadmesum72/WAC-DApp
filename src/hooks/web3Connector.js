
import { useCallback, useEffect, useRef } from 'react';

import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import Web3Modal from 'web3modal';

import { useNotify } from '@/components/notify';
import { contractAbis } from '@/contracts';

import { supportedChainsID } from '../helpers/chains';
import { getChainData/* , switchNetwork */ } from '../helpers/utilities';
import {
    changeAccount,
    changeChainId,
    changeConfig,
    changeContracts,
    changeProvider
} from '../redux/slice/web3';
// import { contractAddress, contractABI } from '../utils/contract';
import { providerOptions } from './providerOptions';
import { useSelectWeb3 } from './useSelectWeb3';
import useWeb3SubscribeProvider from './web3SubscribeProvider';

const getData = async () => {
    const response = await fetch('/config/config.json', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    return response.json();
};

const useWeb3Connector = () => {
    const notify = useNotify();

    const web3Modal = useRef();
    const dispatch = useDispatch();
    const { chainId } = useSelectWeb3();

    const { subscribeProvider, resetAll } = useWeb3SubscribeProvider();

    const getNetwork = useCallback(() => {
        if (!chainId || !supportedChainsID.includes(chainId ?? 0)) return null;

        return getChainData(chainId).network;
    }, [chainId]);

    const getProviderOptions = useCallback(() => providerOptions, []);

    useEffect(() => {
        web3Modal.current = new Web3Modal({
            network: getNetwork(),
            cacheProvider: true,
            // disableInjectedProvider: false,
            providerOptions: getProviderOptions(),
        });

        // web3Modal.current.clearCachedProvider(); // this will make sure to open the modal each time
    }, [getNetwork, getProviderOptions]);

    const onConnect = useCallback(async () => {
        try {
            if (web3Modal?.current) {
                const provider = await web3Modal.current.connect();
                subscribeProvider(provider);

                provider.request({
                    method: 'eth_requestAccounts',
                });

                const _provider = new ethers.providers.Web3Provider(provider);
                const signer = _provider.getSigner();

                const account = await signer.getAddress();
                const chainId = await signer.getChainId();

                const CONFIG = await getData();
                const { CHAIN_ID } = CONFIG;

                if (chainId !== CHAIN_ID) {
                    notify('error', 'Please change the network');
                }

                const zeroAddress = '0x0000000000000000000000000000000000000000';
                // instantiate contract instance and assign to component ref variable
                const babyApesContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.BABY_APES_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.babyApesAbi,
                    signer
                );

                const farmContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.FARM_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.farmAbi,
                    signer
                );

                const genesisApesContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.GENESIS_APES_ADDRESS ||
                    zeroAddress,
                    contractAbis?.[CHAIN_ID]?.genesisApesAbi,
                    signer
                );
                const genesis3DApesContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.GENESIS_3D_APES_ADDRESS ||
                    zeroAddress,
                    contractAbis?.[CHAIN_ID]?.genesis3DApesAbi,
                    signer
                );
                const ladyApesContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.LADY_APES_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.ladyApesAbi,
                    signer
                );
                const proxyContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.WEIRD_USER_PROXY_ADDRESS ||
                    zeroAddress,
                    contractAbis?.[CHAIN_ID]?.proxyContractAbi,
                    signer
                );
                const wacTokenContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.WAC_TOKEN_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.tokeERC20Abi,
                    signer
                );

                const lpTokenContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.LP_TOKEN_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.tokeERC20Abi,
                    signer
                );

                const rentingContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.WAPE_DATE_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.rentingContract,
                    signer
                );

                const readRentingContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.VIEW_WAPE_DATE_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.readRentingContract,
                    signer
                );

                const vialsStakingContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.VIALS_STAKING_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.vialsStakingContract,
                    signer
                );
                // proxyNFTContract

                const proxyNFTContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.WEIRD_WAPE_PROXY_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.proxyNFTContract,
                    signer
                );

                const catalystContract = new ethers.Contract(
                    CONFIG?.[CHAIN_ID]?.CONTRACTS.WEIRD_CATALYST_ADDRESS || zeroAddress,
                    contractAbis?.[CHAIN_ID]?.catalystContract,
                    signer
                );

                dispatch(
                    changeChainId({
                        chainId,
                        isCorrectChain: chainId === CHAIN_ID,
                    })
                );

                dispatch(changeAccount(account));
                dispatch(changeProvider(_provider));
                dispatch(changeConfig(CONFIG?.[CHAIN_ID]));

                dispatch(
                    changeContracts({
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
                    })
                );

                // switchNetwork(provider, CHAIN_ID);
            } else {
                notify('error', 'Network is not connected');
            }
        } catch (error) {
            notify('error', error?.message);
        }
    }, [dispatch, notify, subscribeProvider]);

    const onDisconnect = async () => {
        web3Modal.current?.clearCachedProvider();
        resetAll();
    };

    useEffect(() => {
        if (web3Modal?.current?.cachedProvider) {
            onConnect();
        }
    }, []);

    return {
        onConnect,
        onDisconnect,
    };
};

export default useWeb3Connector;
