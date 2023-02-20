

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ethers } from 'ethers';

import { useNotify } from '@/components/notify';
import { COLLECTION_NAMES } from '@/utils/constants';

import { useSelectWeb3 } from '../useSelectWeb3';
import { queryKeys } from './queryConstants';

// ------------------------------------------------------------

//* BREED
export const useMutationBreed = (options) => {
    const queryClient = useQueryClient();
    const { account, babyApesContract } = useSelectWeb3();
    const notify = useNotify();

    const queryKey = [queryKeys.userTokens, account];
    const mutationFn = async ({ genesisApeId, ladyApeId }) => {
        const tx = await babyApesContract.breed(genesisApeId, ladyApeId);

        return tx.wait();
    };

    return useMutation(mutationFn, {
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
        onError: (/* error */) => {
            // const errMsg = error?.data?.message || error?.message || '';
            notify('error', 'Error while breeding.');
        },
        ...options,
    });
};

// ------------------------------------------------------------
//* My Wapes
export const useMutationUserClaim = (options) => {
    const queryClient = useQueryClient();
    const notify = useNotify();

    const { account, wacTokenContract, rentingContract } = useSelectWeb3();

    const queryKey = [queryKeys.getTokenBalance, account];
    const mutationFn = async (isPendingClaim) => {
        let tx;

        if (isPendingClaim) {
            tx = await rentingContract.ClaimWAC();
        }

        tx = await wacTokenContract.getReward();

        return tx.wait();
    };

    return useMutation(mutationFn, {
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
        onError: (/* error */) => {
            // const errMsg = error?.data?.message || error?.message || '';
            notify('error', 'Transaction Error!!');
        },
        ...options,
    });
};

export const useMutationUserClaimVX = (options) => {
    // const queryClient = useQueryClient();
    const notify = useNotify();

    const { genesis3DApesContract } = useSelectWeb3();

    // const queryKey = [queryKeys.getTokenBalance, account]; // TODO: Non so a cosa serviva questa linea
    const mutationFn = async (isPendingClaimVX) => {
        let tx;

        if (isPendingClaimVX) {
            tx = await genesis3DApesContract.controllaSeEClaimato(); // TODO: Mettere i nomi veri delle funzioni del contratto
        }

        tx = await genesis3DApesContract.claima(); // TODO: Mettere i nomi veri delle funzioni del contratto

        return tx.wait();
    };

    return useMutation(mutationFn, {
        onSettled: () => {
            // queryClient.invalidateQueries(queryKey);
        },
        onError: (/* error */) => {
            // const errMsg = error?.data?.message || error?.message || '';
            notify('error', 'Transaction Error!!');
        },
        ...options,
    });
};

//------------------------------------------------------------------------

export const useMutationGiveBirth = (babyId, options) => {
    const queryClient = useQueryClient();
    const notify = useNotify();
    const { account, babyApesContract } = useSelectWeb3();

    const mutationFn = async (tokenId) => {
        const tx = await babyApesContract.removeFromIncubator(tokenId);

        return tx.wait();
    };

    return useMutation(mutationFn, {
        onSettled: () => {
            const collectionName = COLLECTION_NAMES.baby;
            const queryKey = [
                queryKeys.babyParent,
                account,
                babyId,
                collectionName
            ];

            queryClient.invalidateQueries(queryKey);
        },
        onError: (/* error */) => {
            notify('error', 'Transaction Error!!');
        },
        ...options,
    });
};

//----------------------------------------------------------------
export const useMutationChangeLore = (
    { tokenId, collectionName/* , isRented */ },
    options
) => {
    const queryClient = useQueryClient();
    const notify = useNotify();

    const {
        account,
        babyApesContract,
        genesisApesContract,
        genesis3DApesContract,
        ladyApesContract,
        rentingContract,
        vialsStakingContract,
        wacTokenContract,
    } = useSelectWeb3();

    // const queryKey = [queryKeys.lore, account, tokenId, collectionName];

    const queryKey = [queryKeys.getTokenInfo, tokenId, collectionName];
    const mutationFn = async ({
        collectionName,
        tokenId,
        newValue,
        isRented,
        isStaked,
    }) => {
        //    if (isRented) {
        //      const max = 2 ** 50;
        //      const parsedMax = ethers.utils.parseEther(`${max}`);
        // try {

        //       const isApproved = await rentingContract.approve(account, parsedMax);
        // } catch (error) {
        // }
        //    }

        if (collectionName === COLLECTION_NAMES.genesis) {
            const tx = isRented
                ? await rentingContract.rGWACchangeLore(tokenId, newValue)
                : await genesisApesContract.changeBio(tokenId, newValue);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.genesis3d) {
            const tx = await genesis3DApesContract.changeBio(tokenId, newValue); // TODO: check
            return tx.wait();
        }

        // * For both lady and baby
        // ? ERC20
        let allowance2 = await wacTokenContract.allowance(
            account,
            vialsStakingContract.address
        );
        allowance2 = Number(allowance2.toString());

        if (allowance2 === 0) {
            const approveAmount =
                '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // (2**256 - 1 )

            const tx = await wacTokenContract.approve(
                vialsStakingContract.address,
                approveAmount
            );
            await tx.wait();
        }

        if (isStaked) {
            const tx = await vialsStakingContract.LWACchangeName(
                tokenId,
                newValue
            );

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            if (isStaked) {
                const tx = await vialsStakingContract.LWACchangeLore(
                    tokenId,
                    newValue
                );

                return tx.wait();
            }

            if (isRented) {
                const tx = await rentingContract.rLWACchangeLore(tokenId, newValue);

                return tx.wait();
            }

            const tx = await ladyApesContract.changeBio(tokenId, newValue);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            if (isStaked) {
                const tx = await vialsStakingContract.BWACchangeLore(
                    tokenId,
                    newValue
                );

                return tx.wait();
            }

            const tx = await babyApesContract.changeBio(tokenId, newValue);

            return tx.wait();
        }

        return null;
    };

    return useMutation(mutationFn, {
        onError: (/* _err, _updatingFilter, context */) => {
            // const errMsg = _err?.data?.message || _err?.message || '';
            notify('error', 'Error while changing the lore');
        },
        onSettled: (/* res */) => {
            queryClient.invalidateQueries(queryKey); // Don't validate it right away as it takes few seconds to update on blockchain
        },

        //  /**Optimistic Update End */
        ...options,
    });
};

//------------------------------------------------------------------------

export const useMutationChangeName = ({ tokenId, collectionName }, options) => {
    const queryClient = useQueryClient();
    const notify = useNotify();
    const {
        account,
        babyApesContract,
        genesisApesContract,
        genesis3DApesContract,
        ladyApesContract,
        rentingContract,
        vialsStakingContract,
        wacTokenContract,
    } = useSelectWeb3();

    // const queryKey = [queryKeys.name, account, tokenId, collectionName];
    const queryKey = [queryKeys.getTokenInfo, tokenId, collectionName];
    const mutationFn = async ({
        collectionName,
        tokenId,
        newValue,
        isRented,
        isStaked,
    }) => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            const tx = await (isRented
                ? rentingContract.rGWACchangeName(tokenId, newValue)
                : genesisApesContract.changeName(tokenId, newValue));

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.genesis3d) {
            const tx = await genesis3DApesContract.changeName(tokenId, newValue);
            return tx.wait();
        }

        // * For both lady and baby
        // ? ERC20
        let allowance2 = await wacTokenContract.allowance(
            account,
            vialsStakingContract.address
        );
        allowance2 = Number(allowance2.toString());

        if (allowance2 === 0) {
            const approveAmount =
                '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // (2**256 - 1 )

            const tx = await wacTokenContract.approve(
                vialsStakingContract.address,
                approveAmount
            );
            await tx.wait();
        }

        if (isStaked) {
            const tx = await vialsStakingContract.LWACchangeName(
                tokenId,
                newValue
            );

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            if (isStaked) {
                const tx = await vialsStakingContract.LWACchangeName(
                    tokenId,
                    newValue
                );

                return tx.wait();
            }

            if (isRented) {
                const tx = await rentingContract.rLWACchangeName(tokenId, newValue);

                return tx.wait();
            }

            const tx = await ladyApesContract.changeName(tokenId, newValue);

            return tx.wait();

            // const tx = isRented
            //  ? await rentingContract.rLWACchangeName(tokenId, newValue)
            //  : await ladyApesContract.changeName(tokenId, newValue);

            // return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            if (isStaked) {
                const tx = await vialsStakingContract.BWACchangeName(
                    tokenId,
                    newValue
                );

                return tx.wait();
            }

            const tx = await babyApesContract.changeName(tokenId, newValue);

            return tx.wait();
        }

        return null;
    };

    return useMutation(mutationFn, {
        /** Optimistic Update Start */
        // onMutate: async (data) => {
        //   const { newValue } = data;
        //   await queryClient.cancelQueries(queryKey);
        //   const previousData = queryClient.getQueryData(queryKey);

        //   queryClient.setQueryData(queryKey, newValue); // format of data should be same as we are using 'select' in query

        //   // ? with callback
        //   // queryClient.setQueryData('countData', (oldQueryData) => {
        //   //    const dataObject = {
        //   //       ...oldQueryData.countData,
        //   //    };

        //   //    return [];
        //   // });

        //   // ? without callback
        //   //    queryClient.setQueryData(['play', currentEpoch], [0, 1, false]); // format of data should be same as we are using 'select' in query

        //   // ** roll back in case mutation errors out
        //   return {
        //      previousData,
        //   };
        // },
        onError: (/* _err, _updatingFilter, context */) => {
            // queryClient.setQueryData(queryKey, context.previousData);
            // const errMsg = _err?.data?.message || _err?.message || '';
            notify('error', 'Error while changing the name.');
        },
        onSettled: (/* res */) => {
            queryClient.invalidateQueries(queryKey); // Don't validate it right away as it takes few seconds to update on blockchain
        },

        //  /**Optimistic Update End */
        ...options,
    });
};

// ------------------------------------------------------------

export const useMutationStake = ({ tokenId, collectionName }/* , options */) => {
    const queryClient = useQueryClient();
    // const notify = useNotify();
    const {
        account,
        genesisApesContract,
        // genesis3DApesContract, // TODO: For staking
        rentingContract,
        ladyApesContract,
        vialsStakingContract,
        babyApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getDataCollectively, account];

    const mutationFn = async ({ tokenId, isRented }) => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            if (isRented) {
                const tx = await rentingContract.rGWACStaking(tokenId);

                return tx.wait();
            }

            //! Etherjs: TypeError: contract.XXX is not a function
            //* https://stackoverflow.com/a/72395119
            // const tx = await genesisApesContract['stake(uint256)'](tokenId);
            const tx = await genesisApesContract?.['stake(uint16[])']([tokenId]);

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

            /*const tx = await vialsStakingContract.stakeLwac(tokenId);*/
            const tx = await vialsStakingContract.batchStakeLwac(tokenId);

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

            /*const tx = await vialsStakingContract.stakeBwac(tokenId);*/
            const tx = await vialsStakingContract.batchStakeBwac(tokenId);

            return tx.wait();
        }
    };

    return useMutation(mutationFn, {
        onError: (/* _err */) => {
            // notify('error', 'Error while Staking...');
        },
        // onSettled: (res) => {
        //   queryClient.invalidateQueries(queryKey); // Don't validate it right away as it takes few seconds to update on blockchain

        //   queryClient.invalidateQueries(queryKey2); // Don't validate it right away as it takes few seconds to update on blockchain
        // },

        onSuccess: (/* data */) => {
            /** Query Invalidation Start */
            queryClient.invalidateQueries(queryKey);
            /** Query Invalidation End */

            /** Handling Mutation Response Start */
            queryClient.setQueryData(queryKey, (oldQueryData) => {
                const previousData = {
                    ...oldQueryData,
                };
                const collectionData = previousData[collectionName];

                const index = collectionData.findIndex((obj) => obj.id === tokenId);

                collectionData[index].isStaked = true;

                return {
                    ...previousData,
                    [collectionName]: collectionData,
                };
            });

            // onSuccess(data);
            /** Handling Mutation Response Start */
        },
    });
};

// ------------------------------------------------------------

export const useMutationUnStake = ({ tokenId, collectionName }/* , options */) => {
    const queryClient = useQueryClient();
    // const notify = useNotify();
    const {
        account,
        genesisApesContract,
        // genesis3DApesContract, // TODO: For unstaking
        rentingContract,
        vialsStakingContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getDataCollectively, account];

    const mutationFn = async ({ tokenId, isRented/* , isStaked */ }) => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            if (isRented) {
                const tx = await rentingContract.rGWACUnstaking(tokenId);

                return tx.wait();
            }

            const tx = await genesisApesContract.unstake(tokenId);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            const tx = await vialsStakingContract.batchUnstakeLwac(tokenId);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            const tx = await vialsStakingContract.batchUnstakeBwac(tokenId);

            return tx.wait();
        }
    };

    return useMutation(mutationFn, {
        onError: (/* _err */) => {
            // notify('error', 'Error while UnStaking...');
        },
        // onSettled: (res) => {
        //   queryClient.invalidateQueries(queryKey); // Don't validate it right away as it takes few seconds to update on blockchain

        //   queryClient.invalidateQueries(queryKey2); // Don't validate it right away as it takes few seconds to update on blockchain
        // },

        onSuccess: (/* data */) => {
            /** Query Invalidation Start */
            queryClient.invalidateQueries(queryKey);
            /** Query Invalidation End */

            /** Handling Mutation Response Start */
            queryClient.setQueryData(queryKey, (oldQueryData) => {
                const previousData = {
                    ...oldQueryData,
                };
                const collectionData = previousData[collectionName];

                const index = collectionData.findIndex((obj) => obj.id === tokenId);

                collectionData[index].isStaked = false;

                return {
                    ...previousData,
                    [collectionName]: collectionData,
                };
            });

            // onSuccess(data);
            /** Handling Mutation Response Start */
        },
    });
};

// ------------------------------------------------------------

export const useMutationTransfer = (
    { tokenId, collectionName },
    { onSuccess, ...rest }
) => {
    const queryClient = useQueryClient();
    // const notify = useNotify();

    const {
        account,
        //  isCorrectChain,
        babyApesContract,
        genesisApesContract,
        genesis3DApesContract,
        ladyApesContract,
        rentingContract,
        //  proxyContract,
        //  tokenContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getDataCollectively, account];

    const mutationFn = async ({
        collectionName,
        tokenId,
        newValue,
        isRented,
    }) => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            let tx;

            if (isRented) {
                tx = await rentingContract.transferFrom(account, newValue, tokenId);
            }

            tx = await genesisApesContract.transferFrom(
                account,
                newValue,
                tokenId
            );

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.genesis3d) {
            const tx = await genesis3DApesContract.transferFrom(
                account,
                newValue,
                tokenId
            );

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            let tx;

            if (isRented) {
                tx = await rentingContract.transferFrom(
                    account,
                    newValue,
                    Number(tokenId) + 2500
                );
            }

            tx = await ladyApesContract.transferFrom(account, newValue, tokenId);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            const tx = await babyApesContract.transferFrom(
                account,
                newValue,
                tokenId
            );

            return tx.wait();
        }

        return null;
    };

    return useMutation(mutationFn, {
        /** Optimistic Update Start */
        // onSuccess: async (data) => {
        //  const { collectionName, tokenId, newValue } = data;
        //  await queryClient.cancelQueries(queryKey);
        //  const previousData = queryClient.getQueryData(queryKey);
        //  const newData = {
        //    ...previousData,
        //  };
        //  const newTokens = newData[collectionName]?.filter(
        //    (item) => item !== tokenId
        //  );
        //  const updatedData = {
        //    ...newData,
        //    [collectionName]: newTokens,
        //  };
        //  queryClient.setQueryData(queryKey, updatedData); // format of data should be same as we are using 'select' in query

        //  // ** roll back in case mutation errors out
        //  return {
        //    previousData,
        //  };
        // },
        onSuccess: (data) => {
            /** Query Invalidation Start */
            queryClient.invalidateQueries(queryKey);
            /** Query Invalidation End */

            /** Handling Mutation Response Start */
            queryClient.setQueryData(queryKey, (oldQueryData) => {
                const previousData = {
                    ...oldQueryData,
                };
                const collectionData = previousData[collectionName];

                const data = collectionData.filter((obj) => obj.id !== tokenId);

                return {
                    ...previousData,
                    [collectionName]: data,
                };
            });

            onSuccess(data);
            /** Handling Mutation Response Start */
        },

        onError: (/* _err, _updatingFilter, context */) => {
            // notify('error', 'Error while transfer');
        },
        onSettled: (/* res */) => {
            queryClient.invalidateQueries(queryKey); // Don't validate it right away as it takes few seconds to update on blockchain
        },

        //  /**Optimistic Update End */
        ...rest,
    });
};

//------------------------------------------------------------------------

export const useMutationRenting = (
    { tokenId, collectionName },
    { onSuccess, ...options }
) => {
    const queryClient = useQueryClient();
    // const notify = useNotify();

    const { account, rentingContract, vialsStakingContract } = useSelectWeb3();

    const queryKey = [queryKeys.getDataCollectively, account];

    const mutationFn = async ({
        isLady,
        isGenesis,
        price = 0,
        tokenId,
        femaleInput1 = 0,
        femaleInput2 = 0,
        femaleInput3 = 0,
        isChangePrice,
        isStaked,
    }) => {
        const isApprovedForAllRenting = await rentingContract.isApprovedForAll(
            account,
            vialsStakingContract.address
        );

        const priceInWei = ethers.utils.parseEther(price.toString());
        const femaleInput1InWei = ethers.utils.parseEther(
            femaleInput1.toString()
        );
        const femaleInput2InWei = ethers.utils.parseEther(
            femaleInput2.toString()
        );
        const femaleInput3InWei = ethers.utils.parseEther(
            femaleInput3.toString()
        );

        if (!isApprovedForAllRenting) {
            const tx = await rentingContract.setApprovalForAll(
                vialsStakingContract.address,
                true
            );

            await tx.wait();
        }

        // for ladies
        if (isLady) {
            let tx;

            tx = isStaked
                ? await (isChangePrice
                    ? vialsStakingContract.setNewCostStakedLWAC(
                        tokenId,
                        femaleInput1InWei,
                        femaleInput2InWei,
                        femaleInput3InWei
                    )
                    : vialsStakingContract.rentStakedLWAC(
                        tokenId,
                        femaleInput1InWei,
                        femaleInput2InWei,
                        femaleInput3InWei
                    ))
                : await (isChangePrice
                    ? rentingContract.setNewCostLWAC(
                        tokenId,
                        femaleInput1InWei,
                        femaleInput2InWei,
                        femaleInput3InWei
                    )
                    : rentingContract.rentLWAC(
                        tokenId,
                        femaleInput1InWei,
                        femaleInput2InWei,
                        femaleInput3InWei
                    ));

            return tx.wait();
        }

        if (isGenesis) {
            const tx = await (isChangePrice
                ? rentingContract.setNewCostGWAC(tokenId, priceInWei)
                : rentingContract.rentGWAC(tokenId, priceInWei));

            return tx.wait();
        }

        return null;
    };

    return useMutation(mutationFn, {
        onError: (/* _err */) => {
            // notify('error', 'Error while Renting ...');
        },
        onSuccess: (data) => {
            /** Query Invalidation Start */
            queryClient.invalidateQueries(queryKey);
            /** Query Invalidation End */

            /** Handling Mutation Response Start */
            queryClient.setQueryData(queryKey, (oldQueryData) => {
                const previousData = {
                    ...oldQueryData,
                };
                const collectionData = previousData[collectionName];

                const index = collectionData.findIndex((obj) => obj.id === tokenId);

                collectionData[index].isRented = true;

                return {
                    ...previousData,
                    [collectionName]: collectionData,
                };
            });

            onSuccess(data);
            /** Handling Mutation Response Start */
        },
        ...options,
    });
};

//--------------------------------------------------------

export const useMutationUnRent = ({ tokenId, collectionName }) => {
    const queryClient = useQueryClient();
    // const notify = useNotify();
    const { account, rentingContract, vialsStakingContract } = useSelectWeb3();

    const queryKey = [queryKeys.getDataCollectively, account];

    const mutationFn = async ({ tokenId, isStaked }) => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            const tx = await rentingContract.derentGWAC(tokenId);

            return tx.wait();
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            const tx = await (isStaked
                ? vialsStakingContract.derentStakedLWAC(tokenId)
                : rentingContract.derentLWAC(tokenId));

            return tx.wait();
        }

        return null;
    };

    return useMutation(mutationFn, {
        onError: (/* _err */) => {
            // notify('error', 'Error while UnRenting...');
        },
        onSuccess: (/* data */) => {
            /** Query Invalidation Start */
            queryClient.invalidateQueries(queryKey);
            /** Query Invalidation End */

            /** Handling Mutation Response Start */
            queryClient.setQueryData(queryKey, (oldQueryData) => {
                const previousData = {
                    ...oldQueryData,
                };
                const collectionData = previousData[collectionName];

                const index = collectionData.findIndex((obj) => obj.id === tokenId);

                collectionData[index].isRented = false;
                collectionData[index].isStaked = false;

                return {
                    ...previousData,
                    [collectionName]: collectionData,
                };
            });

            // onSuccess(data);
            /** Handling Mutation Response Start */
        },
    });
};

// -------------------------------------------------------------
// Ape tinder

export const useMutationRentingGWAC = (options) => {
    const queryClient = useQueryClient();
    // const notify = useNotify();

    const { account, rentingContract } = useSelectWeb3();
    const queryKey = [queryKeys.getUserRentedNfts, account];
    const queryKey2 = [queryKeys.getAppTenderNft];

    // const queryKey3 = [queryKeys.userTokens, account];

    const mutationFn = async (data) => {
        const { tokenIdGenesis, tokenIdLadies, numOfBabies, funNumber } = data;
        let tx;

        //  const options = {
        //      // from: account,
        //      // to: toAddress,
        //      // value: 0,
        //      // value: ethers.utils.parseEther(enteredValue),
        //      // value: enteredValue,
        //      gasLimit: 5000000,
        //      // nonce: nonce || undefined,
        //  };

        // useRenting(uint256 tokenIDGenesis, uint256 tokenIDLady, uint8 numChildren)
        switch (funNumber) {
        case 1: {
            tx = await rentingContract.useRentingGWAC(
                tokenIdGenesis,
                tokenIdLadies,
                numOfBabies
            );

            break;
        }

        case 2: {
            tx = await rentingContract.useRentingLWAC(
                tokenIdGenesis,
                tokenIdLadies,
                numOfBabies
            );

            break;
        }

        case 3: {
            tx = await rentingContract.useRenting(
                tokenIdGenesis,
                tokenIdLadies,
                numOfBabies
            );

            break;
        }

        default:
            return null;
        }

        return tx.wait();
    };

    return useMutation(mutationFn, {
        onError: (/* _err */) => {
            // notify('error', 'Error while Renting of Ape Tinder');
        },
        onSettled: (/* res */) => {
            queryClient.invalidateQueries(queryKey);
            queryClient.invalidateQueries(queryKey2);
            // queryClient.invalidateQueries(queryKey3);
        },
        ...options,
    });
};
