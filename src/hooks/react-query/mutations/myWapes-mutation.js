// ==================================================== Multiple Staking Array =================================

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotify } from '@/components/notify';
import { useSelectWeb3 } from '@/hooks/useSelectWeb3';
import { COLLECTION_NAMES } from '@/utils/constants';

import { queryKeys } from '../queryConstants';

export const useMutationMultipleStaking = (/* collectionName */) => {
    const queryClient = useQueryClient();
    // const notify = useNotify();

    const {
        account,
        babyApesContract,
        genesisApesContract,
        ladyApesContract,
        rentingContract,
        vialsStakingContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getDataCollectively, account];

    const mutationFn = async ({
        idsArrayData,
        collectionName,
        isRentedArray,
    }) => {

        // Staking functions
        if (collectionName === COLLECTION_NAMES.genesis) {
            const tx = isRentedArray
                ? await rentingContract.rGWACBatchStaking(idsArrayData)
                : await genesisApesContract?.['stake(uint16[])'](idsArrayData);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            const isApprovedForAllStakedLadies =
                await ladyApesContract.isApprovedForAll(
                    account,
                    vialsStakingContract.address
                );

            if (!isApprovedForAllStakedLadies) {
                const tx = await ladyApesContract.setApprovalForAll(
                    vialsStakingContract.address,
                    true
                );

                await tx.wait();
            }

            const tx = await vialsStakingContract.batchStakeLwac(idsArrayData);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            const isApprovedForAllStakedBabies =
                await babyApesContract.isApprovedForAll(
                    account,
                    vialsStakingContract.address
                );

            if (!isApprovedForAllStakedBabies) {
                const tx = await babyApesContract.setApprovalForAll(
                    vialsStakingContract.address,
                    true
                );

                await tx.wait();
            }

            const tx = await vialsStakingContract.batchStakeBwac(idsArrayData);

            return tx.wait();
        }

        return null;
    };

    return useMutation(mutationFn, {
        onError: (/* _err, _updatingFilter, context */) => {
            // const errMsg = _err?.data?.message || _err?.message || '';
            // notify('error', 'Error while multipul staking');
        },
        onSettled: (/* res */) => {
            queryClient.invalidateQueries(queryKey); // Don't validate it right away as it takes few seconds to update on blockchain
        },

        //  /**Optimistic Update End */
        // ...options,
    });
};

export const useMutationmultipleUnStaking = (/* collectionName */) => {
    const queryClient = useQueryClient();
    const notify = useNotify();

    const {
        account,
        //  babyApesContract,
        //  genesisApesContract,
        //  ladyApesContract,
        rentingContract,
        vialsStakingContract,
    } = useSelectWeb3();


    // const queryKey = [queryKeys.multipleStaking, account, collectionName];
    const queryKey = [queryKeys.getDataCollectively, account];

    const mutationFn = async ({
        idsArrayData,
        collectionName,
        isRentedArray,
    }) => {
        if (isRentedArray && collectionName === COLLECTION_NAMES.genesis) {
            const tx = await rentingContract.rGWACBatchUnstaking(idsArrayData);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            const tx = await vialsStakingContract.batchUnstakeLwac(idsArrayData);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            const tx = await vialsStakingContract.batchUnstakeBwac(idsArrayData);

            return tx.wait();
        }

        return null;
    };

    return useMutation(mutationFn, {
        onError: (/* _err, _updatingFilter, context */) => {
            // const errMsg = _err?.data?.message || _err?.message || '';
            notify('error', 'Error while multiple UnStaking');
        },
        onSettled: (/* res */) => {
            queryClient.invalidateQueries(queryKey); // Don't validate it right away as it takes few seconds to update on blockchain
        },

        //  /**Optimistic Update End */
        // ...options,
    });
};
