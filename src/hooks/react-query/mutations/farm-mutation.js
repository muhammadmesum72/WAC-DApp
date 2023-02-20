import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ethers } from 'ethers';

import { useNotify } from '@/components/notify';
// import { COLLECTION_NAMES } from '@/utils/constants';

import { useSelectWeb3 } from '../../useSelectWeb3';
import { queryKeys } from '../queryConstants';

// const {
//  account,
//  isCorrectChain,
//  babyApesContract,
//  genesisApesContract,
//  ladyApesContract,
//  proxyContract,
//  tokenContract,
// } = useSelectWeb3();

// return new Promise((resolve, reject) => {
//    setTimeout(() => {
//        resolve();
//    }, 1000);
//  });

// new Promise((resolve, reject) => {
//     setTimeout(() => {

//       resolve();
//       // reject();
//     }, 5000);
//   });

// ------------------------------------------------------------

export const useMutationFarmHarvest = () => {
    const queryClient = useQueryClient();
    const { account, farmContract } = useSelectWeb3();
    const notify = useNotify();

    const queryKey = [queryKeys.queryContract, account];
    const mutationFn = async () => {
        const tx = await farmContract.withdrawYield();

        return tx.wait();
    };

    return useMutation(mutationFn, {
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
        onError: (/* error */) => {
            notify('error', 'Error while harvesting.');
        },
    });
};

// ------------------------------------------------------------;

export const useMutationERC20Approve = () => {
    const notify = useNotify();
    const queryClient = useQueryClient();
    const { account, lpTokenContract, farmContract } = useSelectWeb3();

    const queryKey = [queryKeys.farmIsApprovedForAll, account];
    const mutationFn = async () => {
        const approveAmount =
            '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // (2**256 - 1 )
        // const parsedMax = ethers.utils.parseEther(`${approveAmount}`);
        const tx = await lpTokenContract.approve(
            farmContract.address,
            // parsedMax
            approveAmount
        );

        return tx.wait();
    };

    return useMutation(mutationFn, {
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
        onError: (/* error */) => {
            notify('error', 'Error while approving farm.');
        },
    });
};

// ------------------------------------------------------------;
export const useMutationFarmStakeUnStake = () => {
    const notify = useNotify();
    const queryClient = useQueryClient();
    const { account, farmContract } = useSelectWeb3();

    const queryKey = [queryKeys.queryContract, account];
    const mutationFn = async ({ isStaking, amount }) => {
        const amountInWei = ethers.utils.parseEther(`${amount}`);
        const tx = await (isStaking
            ? farmContract.stake(amountInWei)
            : farmContract.unstake(amountInWei));

        return tx.wait();
    };

    return useMutation(mutationFn, {
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
        onError: (/* error */) => {
            notify('error', 'Error in Farm.');
        },
    });
};

// ------------------------------------------------------------;
