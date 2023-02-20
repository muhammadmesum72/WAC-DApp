import { useQuery/* , useQueryClient, useQueries */ } from '@tanstack/react-query';
import { ethers } from 'ethers';

// import { useNotify } from '@/components/notify';
// import { COLLECTION_NAMES } from '@/utils/constants';

import { useSelectWeb3 } from '../../useSelectWeb3';
import { queryKeys } from '../queryConstants';

// ------------------------------------------------------------

export const useQueryFarmData = () => {
    // const notify = useNotify();
    const { account, /* isCorrectChain, */ farmContract } = useSelectWeb3();
    const queryKey = [queryKeys.queryContract, account];
    // const account1 = '0xECAc7AbEb03169910815Ea798a73ED0baA3113a5';
    const queryFn = () => farmContract.queryContract(account);

    return useQuery(queryKey, queryFn, {
        enabled: !!account && !!farmContract,
        initialData: () => [0, 0, 0, 0, 0, 0, 0, 0, 0], //* make sure initialData is in same format as the res in
        select: (res) => ({
            liquidity: ethers.utils.formatUnits(res[0], 18),
            tvl: ethers.utils.formatUnits(res[1], 18),
            // apr:  ethers.utils.formatUnits(res[2]),
            apr: res[2].toString(),
            skated: ethers.utils.formatUnits(res[3], 18),
            // stakedInUsd: Number(ethers.utils.formatUnits(res[4], 18)) / 1000000,
            stakedInUsd: ethers.utils.formatUnits(res[4], 24),
            earned: ethers.utils.formatUnits(res[5], 18),
            earnedInUsd: ethers.utils.formatUnits(res[6], 24),
            balance: ethers.utils.formatUnits(res[7], 18),
            balanceInUsd: ethers.utils.formatUnits(res[8], 24),
        }),
        onError: (/* error */) => {
        },
    });
};

// ------------------------------------------------------------

export const useQueryERC20IsApproved = () => {
    // const notify = useNotify();
    const { account, /* isCorrectChain, */ farmContract, lpTokenContract } =
        useSelectWeb3();

    const queryKey = [queryKeys.farmIsApprovedForAll, account];

    // const account1 = '0xECAc7AbEb03169910815Ea798a73ED0baA3113a5';
    // ? make sure you are correct chain
    const queryFn = () =>
        lpTokenContract.allowance(account, farmContract.address);

    return useQuery(queryKey, queryFn, {
        enabled: !!account && !!lpTokenContract && !!farmContract,
        select: (res) => !!Number(res.toString()),
        onError: (/* error */) => {
            // notify('error', 'Error while fetching approve farm');
        },
    });
};
