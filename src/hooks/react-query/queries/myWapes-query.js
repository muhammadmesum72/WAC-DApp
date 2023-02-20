import { useQuery } from '@tanstack/react-query';

// import { useNotify } from '@/components/notify';
import { COLLECTION_NAMES } from '@/utils/constants';

import { useSelectWeb3 } from '../../useSelectWeb3';
import {
    convertWACsData,
    getStakedTokensNFTDetails,
    getTokensNFTDetails
} from '../helper';
import { queryKeys } from '../queryConstants';

export const useQueryGetUserNFTsData = () => {
    // const notify = useNotify();
    const {
        account,
        isCorrectChain,
        genesis3DApesContract,
        proxyContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getDataCollectively, account];

    const queryFn = async () => {
        const userNFTsDetails = await proxyContract.getUserNFTsData(account);
        const genesis3DWallet = await genesis3DApesContract.walletOfOwner(account);
        let genesisWAC = userNFTsDetails?.[0];
        let stakedGWAC = userNFTsDetails?.[1];
        let rentedGWAC = userNFTsDetails?.[2];

        let ladiesWAC = userNFTsDetails?.[3];
        let stakedLWAC = userNFTsDetails?.[4];
        let rentedLWAC = userNFTsDetails?.[5];

        let babiesWAC = userNFTsDetails?.[6];
        let incubatedBWAC = userNFTsDetails?.[7];
        let stakedBWAC = userNFTsDetails?.[8];

        // allGenesisWAC = allGenesisWAC?.map((item) => Number(item?.toString()));
        stakedGWAC = convertWACsData(stakedGWAC);
        rentedGWAC = convertWACsData(rentedGWAC);
        babiesWAC = convertWACsData(babiesWAC);
        stakedLWAC = convertWACsData(stakedLWAC);
        rentedLWAC = convertWACsData(rentedLWAC);

        incubatedBWAC = convertWACsData(incubatedBWAC);
        stakedBWAC = convertWACsData(stakedBWAC);

        const { lady, genesis, genesis3d, baby } = COLLECTION_NAMES;

        babiesWAC = await getTokensNFTDetails(babiesWAC, baby);
        genesisWAC = await getTokensNFTDetails(genesisWAC, genesis);
        const genesis3DWAC = await getTokensNFTDetails(genesis3DWallet, genesis3d, '3d');
        ladiesWAC = await getTokensNFTDetails(ladiesWAC, lady);

        ladiesWAC = getStakedTokensNFTDetails(ladiesWAC, stakedLWAC, rentedLWAC);

        genesisWAC = getStakedTokensNFTDetails(
            genesisWAC,
            stakedGWAC,
            rentedGWAC
        );

        babiesWAC = getStakedTokensNFTDetails(
            babiesWAC,
            stakedBWAC,
            incubatedBWAC
        );

        const all3d = [
            ...(genesis3DWAC || []),
        ];

        const all = [
            ...(babiesWAC || []),
            ...(genesisWAC || []),
            ...(ladiesWAC || []),
        ];
        const allSorted = all.sort((a, b) => a.id - b.id);

        return {
            all: allSorted,
            'all 3D': all3d,
            [baby]: babiesWAC,
            [genesis]: genesisWAC,
            [genesis3d]: genesis3DWAC,
            [lady]: ladiesWAC,
        };
    };

    return useQuery(queryKey, queryFn, {
        enabled: !!isCorrectChain && !!proxyContract && !!account,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching useQueryGetUserNFTsData');
        },
    });
};

// ==============================================================================

export const useQueryGetUserAssetsData = () => {
    // const notify = useNotify();
    const {
        account,
        isCorrectChain,
        proxyContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.GetUserAssetsData, account];

    // const account1 = '0x59BdF05c58b5920DD2BDe1Dea6b8e4d469e98c26';
    const queryFn = async () => {
        // const showBalance = await proxyContract.getUserAssetsData(account1);

        let userNFTsDetails = await proxyContract.getUserAssetsData(account);
        userNFTsDetails = convertWACsData(userNFTsDetails);

        return {
            userNFTsDetails,
        };
    };

    return useQuery(queryKey, queryFn, {
        enabled: !!isCorrectChain && !!proxyContract && !!account,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching useQueryGetUserAssetsData');
        },
    });
};
