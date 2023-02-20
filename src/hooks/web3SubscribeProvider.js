import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';

import { supportedChainsID } from '../helpers/chains';
import {
    changeAccount,
    changeChainId,
    changeProvider
} from '../redux/slice/web3';

function useWeb3SubscribeProvider() {
    const dispatch = useDispatch();

    const resetAll = () => {
        dispatch(changeChainId(null));
        dispatch(changeAccount(null));
        dispatch(changeProvider(null));
    };

    const subscribeProvider = async (provider) => {
        if (!provider.on) {
            return;
        }

        provider.on('disconnect', () => resetAll());

        provider.on('connect', (info) => { });

        provider.on('accountsChanged', async (accounts) => {
            // dispatch(changeAccount(accounts[0]));
            // ? Metamask documentation suggest you to refresh the page if account or chain is changed ---> https://stackoverflow.com/a/70408906
            window.location.reload();
        });

        provider.on('chainChanged', async (chainId) => {
            const signer = new ethers.providers.Web3Provider(provider).getSigner();
            // ? Metamask documentation suggest you to refresh the page if account or chain is changed ---> https://stackoverflow.com/a/70408906
            window.location.reload();
            // const _chainId = await signer.getChainId();

            // if (!supportedChainsID.includes(_chainId)) return resetAll();

            // dispatch(changeChainId(_chainId));
        });

        provider.on('networkChanged', (networkId) => {
            // handle the new network
            // ? Metamask documentation suggest you to refresh the page if account or chain is changed ---> https://stackoverflow.com/a/70408906
            window.location.reload();
        });
    };

    return {
        subscribeProvider,
        resetAll,
    };
}

export default useWeb3SubscribeProvider;
