




import { useQueries, useQuery } from '@tanstack/react-query';
// import { ethers } from 'ethers';

import { useNotify } from '@/components/notify';
import { BABY_SERVER, NETWORK } from '@/config';
import httpClient from '@/utils/axios';
import { COLLECTION_NAMES } from '@/utils/constants';

import { useSelectWeb3 } from '../useSelectWeb3';
import {
    // convertWACsData,
    // getTokensNFTDetails,
    getBabyParentsDetails,
    // getTokenDetails,
    rentedMaleFemales,
    // getStakedTokensNFTDetails
} from './helper';
import { queryKeys } from './queryConstants';

// const {
//  account,
//  isCorrectChain,
//  babyApesContract,
//  genesisApesContract,
//  ladyApesContract,
//  proxyContract,
//  tokenContract,
// } = useSelectWeb3();
// ------------------------------------------------------------

// export const useQueryUserTokens = () => {
//  // // const notify = useNotify();
//  const {
//    account,
//    isCorrectChain,
//    babyApesContract,
//    genesisApesContract,
//    ladyApesContract,
//  } = useSelectWeb3();

//  const queryKey = [queryKeys.userTokens, account];
//  const queryFn = async () => {
//    let babyApes = await babyApesContract.walletOfOwner(account);

//    babyApes = babyApes?.map((babyTokenId) => Number(babyTokenId.toString()));

//    let genesisApes = await genesisApesContract.walletOfOwner(account);

//    genesisApes = genesisApes?.map((genesisTokenId) =>
//      Number(genesisTokenId.toString())
//    );

//    let ladyApes = await ladyApesContract.walletOfOwner(account);

//    ladyApes = ladyApes?.map((ladyTokenId) => Number(ladyTokenId.toString()));

//    return {
//      [COLLECTION_NAMES.baby]: babyApes,
//      [COLLECTION_NAMES.genesis]: genesisApes,
//      [COLLECTION_NAMES.lady]: ladyApes,
//    };
//  };

//  return useQuery(queryKey, queryFn, {
//    refetchOnWindowFocus: false,
//    enabled:
//      !!account &&
//      !!isCorrectChain &&
//      !!babyApesContract &&
//      !!genesisApesContract &&
//      !!ladyApesContract,
//    select: (res) => getTokenDetails(res),
//    onError: (error) => {
//      // notify('error', 'Error while fetching the User Token');
//    },
//  });
// };

// ------------------------------------------------------------

export const useQueryGenesisTokensStakedStatus = () => {
    // const notify = useNotify();
    const { account, /* isCorrectChain, */ proxyContract } = useSelectWeb3();

    const queryKey = [queryKeys.stakedTokenStatus, account];
    const queryFn = () => proxyContract.stakedStatusOfWallet(account);

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled: false,
        // onError: (error) =>
        // notify('error', 'Error while fetching the staked status'),
    });
};

// ------------------------------------------------------------

export const useQueryBalance = () => {
    // // const notify = useNotify();
    const { account, /* isCorrectChain, */ proxyContract/* , wacTokenContract */ } =
        useSelectWeb3();

    const queryKey = [queryKeys.getTokenBalance, account];
    const queryFn = async () => {
        const getBalancesOfUser = await proxyContract.getBalancesOfUser(account);

        // const balanceOf = await wacTokenContract.balanceOf(account); //?  this is equal to getBalancesOfUser[0]
        // const getTotalClaimable = await wacTokenContract.getTotalClaimable(account);//?  this is equal to getBalancesOfUser[1]

        return {
            tokenBalance: Math.floor(+getBalancesOfUser[0] / 10 ** 18),
            tokenPendingBalance: Math.floor(+getBalancesOfUser[1] / 10 ** 18),
            // 18 number of decimal
            // tokenBalance: ethers.utils.formatUnits(getBalancesOfUser[0], 18),
            // tokenPendingBalance: ethers.utils.formatUnits(
            // getBalancesOfUser[1],
            // 18
            // ),
        };
    };

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled: false,
        // !!account && !!isCorrectChain && !!proxyContract && !!wacTokenContract,
        // onError: (error) => notify('error', 'Error while fetching the balance'),
    });
};
// ------------------------------------------------------------

export const useQueryTokenNames = () => {
    // // const notify = useNotify();
    const { account, isCorrectChain, proxyContract } = useSelectWeb3();

    const queryKey = [queryKeys.tokenNames, account];
    const queryFn = async () => {
        const babyApesNames = await proxyContract.nameOfBabyWallet(account);
        const genesisApesNames = await proxyContract.nameOfMaleWallet(account);
        const ladyApesNames = await proxyContract.nameOfFemaleWallet(account);

        return {
            [COLLECTION_NAMES.baby]: babyApesNames,
            [COLLECTION_NAMES.genesis]: genesisApesNames,
            [COLLECTION_NAMES.lady]: ladyApesNames,
        };
    };

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled: !!account && !!isCorrectChain && !!proxyContract,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching the Token Names');
        },
    });
};

export const useQueryBabyApesBornStatus = () => {
    // // const notify = useNotify();
    const { account, isCorrectChain, proxyContract } = useSelectWeb3();

    const queryKey = [queryKeys.babyTokensStatus, account];
    const queryFn = () => proxyContract.bornStatusOfWallet(account);

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled: !!account && !!isCorrectChain && !!proxyContract,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching the baby Bone Status');
        },
    });
};

//------------------------------------------------------------------------------------------------------------

export const useQueryLore = ({ tokenId, collectionName }) => {
    // // const notify = useNotify();
    const {
        account,
        isCorrectChain,
        babyApesContract,
        genesisApesContract,
        genesis3DApesContract,
        ladyApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.lore, account, tokenId, collectionName];
    const queryFn = async () => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            return genesisApesContract.bioByTokenId(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.genesis3d) {
            return genesis3DApesContract.bioByTokenId(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            return ladyApesContract.bioByTokenId(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            return babyApesContract.bioByTokenId(tokenId);
        }

        return null;
    };

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled:
            !!account &&
            !!isCorrectChain &&
            !!babyApesContract &&
            !!genesisApesContract &&
            !!genesis3DApesContract &&
            !!ladyApesContract,
        // onError: (error) => notify('error', 'Error while fetching the lore'),
    });
};
// ------------------------------------------------------------------------------------------------------------

export const useQueryName = ({ tokenId, collectionName }) => {
    // // const notify = useNotify();
    const {
        account,
        isCorrectChain,
        babyApesContract,
        genesisApesContract,
        genesis3DApesContract,
        ladyApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.name, account, tokenId, collectionName];
    const queryFn = async () => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            return genesisApesContract.nameByTokenId(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.genesis3d) {
            return genesis3DApesContract.nameByTokenId(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            return ladyApesContract.nameByTokenId(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            return babyApesContract.nameByTokenId(tokenId);
        }

        return null;
    };

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled:
            !!account &&
            !!isCorrectChain &&
            !!babyApesContract &&
            !!genesisApesContract &&
            !!genesis3DApesContract &&
            !!ladyApesContract,
        // onError: (error) => notify('error', 'Error while fetching the name'),
    });
};

//------------------------------------------------------------------------

export const useQueryIsOwner = ({ tokenId, collectionName, isRented }) => {
    // // const notify = useNotify();
    const {
        account,
        isCorrectChain,
        babyApesContract,
        genesisApesContract,
        genesis3DApesContract,
        ladyApesContract,
        rentingContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.isOwner, account, tokenId, collectionName];
    const queryFn = async () => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            return isRented
                ? rentingContract.ownerOf(tokenId)
                : genesisApesContract.ownerOf(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.genesis3d) {
            return genesis3DApesContract.ownerOf(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            return isRented
                ? rentingContract.ownerOf(tokenId + 2500)
                : ladyApesContract.ownerOf(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            return babyApesContract.ownerOf(tokenId);
        }

        return null;
    };

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled:
            !!account &&
            !!isCorrectChain &&
            !!babyApesContract &&
            !!genesisApesContract &&
            !!genesis3DApesContract &&
            !!ladyApesContract &&
            !!tokenId &&
            !!collectionName,
        // select: (res) => res.toLowerCase() === account.toLowerCase(),

        // onError: (error) => notify('error', 'Error while fetching the owner'),
    });
};

// ------------------------------------------------------------

export const useQueryBabyDetails = ({ tokenId, collectionName }) => {
    const notify = useNotify();
    const { account, isCorrectChain, babyApesContract } = useSelectWeb3();

    const queryKey = [queryKeys.babyParent, account, tokenId, collectionName];
    const queryFn = () => babyApesContract.apeInfo(tokenId);

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled:
            !!account &&
            !!isCorrectChain &&
            !!babyApesContract &&
            collectionName === COLLECTION_NAMES.baby,

        select: (res) => {
            const babyData = {
                id: tokenId,
                isBabyBorn: res[0],
                birthData: res[1].toString(),
                fatherId: Number(res[2].toString()),
                motherId: Number(res[3].toString()),
                uri: res[4],
                isBabyReadyToBorn: Boolean(res[4]),
            };

            return getBabyParentsDetails(babyData);
        },
        onError: (/* error */) => {
            notify('error', 'Error while fetching the Baby Parents');
        },
    });
};

//-----------------------------------------------------------------

export const useQueryBabyMetaData = ({ tokenId, collectionName }) => {
    const notify = useNotify();
    const { chainId } = useSelectWeb3();
    let tokenMask;

    if (chainId === 25) {
        tokenMask = (12000 - Number(tokenId)) * 4;
    } else if (chainId === 338) {
        tokenMask = (24567 - Number(tokenId)) * 7;
    }

    // const url =
    // tokenId <= 3000
    //  ? `/apes/${collectionName}/meta/${tokenId}.json`
    //  : `${BABY_SERVER}/meta/${tokenMask}.json`;

    // const url = `${BABY_SERVER}/testnet/meta/${tokenMask}.json`;
    // const url = `${BABY_SERVER}/meta/${tokenMask}.json`;

    const url =
        NETWORK.CHAIN_ID === 25
            ? `${BABY_SERVER}/meta/${tokenMask}.json`
            : `${BABY_SERVER}/testnet/meta/${tokenMask}.json`;

    const queryKey = [queryKeys.babyMetaData, tokenId, collectionName];
    const queryFn = () => httpClient.get(url);

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled: !!tokenId,
        select: (res) => res.data,
        onError: (/* error */) =>
            notify('error', 'Error while fetching the Baby Meta Data'),
    });
};

//------------------------------------------------------------------------------

export const useQueriesLadiesNumChildren = (userTokens) => {
    let ladies = userTokens ? userTokens?.[COLLECTION_NAMES.lady] : [];
    ladies = ladies.filter((item) => item.isRented === false);
    const { account, isCorrectChain, ladyApesContract } = useSelectWeb3();

    const queryFn = (tokenId) => ladyApesContract.numChildren(tokenId);
    const queries = ladies?.map(nft => ({
        queryKey: [queryKeys.ladyNumberOfChild, account, nft?.id],
        queryFn: () => queryFn(nft?.id),
        enabled: !!ladyApesContract && !!account && !!isCorrectChain,
        select: (res) => {
            const numChildren = Number(res.toString());

            return numChildren < 3;
        },
    }));

    // const data = results.map((result) => result.data);

    // return ladies.filter((item, idx) => data[idx] === true);
    return useQueries({
        queries,
    });
};

//------------------------------------------------------------------------------

export const useQueryLadyBreedNumber = ({ tokenId, collectionName }) => {
    // // const notify = useNotify();
    const { account, /* isCorrectChain, */ ladyApesContract } = useSelectWeb3();

    const queryKey = [queryKeys.ladyNumberOfChild, account, tokenId];

    const queryFn = () => ladyApesContract.numChildren(tokenId);

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled: !!tokenId && collectionName === COLLECTION_NAMES.lady,
        select: (res) => {
            let remainingBabies = 0;
            remainingBabies = 3 - res;

            return remainingBabies;
        },
        onError: (/* error */) => {
            // notify('error', 'Error while fetching the Baby Meta Data');
        },
    });
};

// ----------------------------------------------

export const useQueriesBabyApes = (userTokens) => {
    const collectionName = COLLECTION_NAMES.baby;
    const babies = userTokens ? userTokens?.[COLLECTION_NAMES.baby] : [];
    const { account, isCorrectChain, babyApesContract } = useSelectWeb3();

    const queryFn = (tokenId) => babyApesContract.apeInfo(tokenId);

    const queries = babies?.map(nft => ({
        queryKey: [queryKeys.babyParent, account, nft?.id, collectionName],
        queryFn: () => queryFn(nft?.id),
        enabled: !!babyApesContract && !!account && !!isCorrectChain,
        select: (res) => {
            const babyData = {
                id: nft?.id,
                isBabyBorn: res[0],
                birthData: res[1].toString(),
                fatherId: Number(res[2].toString()),
                motherId: Number(res[3].toString()),
                uri: res[4],
                isBabyReadyToBorn: Boolean(res[4]),
            };

            return getBabyParentsDetails(babyData);
        },
    }));

    const results = useQueries({
        queries,
    });

    return results.map((result) => result.data);
};

// ----------------------------------------------

export const useQueryLadyRent = (tokenId, collectionName) => {
    // // const notify = useNotify();
    const { account, /* isCorrectChain, */ ladyApesContract } = useSelectWeb3();

    const queryKey = [queryKeys.rentPrice, account, tokenId];

    const queryFn = async () => await ladyApesContract.numChildren(tokenId);

    return useQuery(queryKey, queryFn, {
        refetchOnWindowFocus: false,
        enabled: !!tokenId && collectionName === COLLECTION_NAMES.lady,
        // select: (res) => ,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching the Baby Meta Data');
        },
    });
};

// ------------------------------------------------------------------

export const useERC20AndERC721Approve = (collectionName) => {
    // // const notify = useNotify();
    const {
        account,
        rentingContract,
        //  isCorrectChain,
        ladyApesContract,
        genesisApesContract,
        wacTokenContract,
        //  vialsStakingContract,
        //  babyApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.isApprovedForAll, account];
    const queryFn = async () => {
        // ? ERC20
        let allowance = await wacTokenContract.allowance(
            account,
            rentingContract.address
        );
        allowance = Number(allowance.toString());

        if (allowance === 0) {
            const approveAmount =
                '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // (2**256 - 1 )

            const tx = await wacTokenContract.approve(
                rentingContract.address,
                approveAmount
            );
            await tx.wait();
        }

        // ? ERC721
        // address owner, address operator
        // Here owner is the user, operator is the renting smart contract. After you call this it returns true if the user has authorized the smart contract, false otherwise
        if (collectionName === COLLECTION_NAMES.genesis) {
            const isApprovedForAllGenesis =
                await genesisApesContract.isApprovedForAll(
                    account,
                    rentingContract.address
                );

            if (!isApprovedForAllGenesis) {
                const tx = await genesisApesContract.setApprovalForAll(
                    rentingContract.address,
                    true
                );

                await tx.wait();
            }
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            const isApprovedForAllLady = await ladyApesContract.isApprovedForAll(
                account,
                rentingContract.address
            );

            if (!isApprovedForAllLady) {
                const tx = await ladyApesContract.setApprovalForAll(
                    rentingContract.address,
                    true
                );

                await tx.wait();
            }
        }

        return false;
    };

    return useQuery(queryKey, queryFn, {
        enabled: false,
        // select: (res) => ,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching useIsApprovedForAll');
        },
    });
};

export const useERC20AndERC721ApproveStaking = () => {
    // // const notify = useNotify();
    const {
        account,
        rentingContract,
        //  isCorrectChain,
        ladyApesContract,
        //  genesisApesContract,
        wacTokenContract,
        vialsStakingContract,
        babyApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.isApprovedForAllStaking, account];
    const queryFn = async () => {
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

        // ? ERC721
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

        const isApprovedForAllRenting = await rentingContract.isApprovedForAll(
            account,
            vialsStakingContract.address
        );

        if (!isApprovedForAllRenting) {
            const tx = await rentingContract.setApprovalForAll(
                vialsStakingContract.address,
                true
            );

            await tx.wait();
        }

        return false;
    };

    return useQuery(queryKey, queryFn, {
        // enabled: true,
        // select: (res) => ,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching useIsApprovedForAll');
        },
    });
};

export const useQueryGetRentGenesis = () => {
    // // const notify = useNotify();
    const { account, isCorrectChain, readRentingContract } = useSelectWeb3();
    const queryKey = [queryKeys.getUserRentedNfts, account];
    const queryFn = async () => {
        const MAX_SUPPLY = 2500;

        let userRentedNfts = await readRentingContract.walletOfOwner(account);

        userRentedNfts = userRentedNfts?.map((tokenId) =>
            Number(tokenId.toString())
        );

        const genesis = userRentedNfts?.filter(
            (tokenId) => tokenId <= MAX_SUPPLY
        );
        let ladies = userRentedNfts?.filter((tokenId) => tokenId > MAX_SUPPLY);
        ladies = ladies?.map((tokenId) => tokenId - MAX_SUPPLY);

        return {
            [COLLECTION_NAMES.genesis]: genesis,
            [COLLECTION_NAMES.lady]: ladies,
        };
    };

    return useQuery(queryKey, queryFn, {
        enabled: !!account && !!isCorrectChain && !!readRentingContract,
        select: (res) => rentedMaleFemales(res),
        onError: (/* error */) => {
            // notify('error', 'Error while fetching rented user nfts');
        },
    });
};

export const useQueryAppTenderNft = () => {
    // // const notify = useNotify();
    const {
        readRentingContract,
        isCorrectChain,
        //  ladyApesContract,
        //  rentingContract,
        //  genesisApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getAppTenderNft];
    const queryFn = async () => {
        // const showBalance = await readRentingContract.ShowBalance();

        const showBalance = await readRentingContract.ShowBalanceAndPrices();
        const rentedGenesis = showBalance?.[0]?.map((genesisTokenId, idx) => ({
            id: Number(genesisTokenId.toString()),
            price: (showBalance?.[1][idx] / 10 ** 18).toString(),
        }));

        const rentedLadies = showBalance?.[2]?.map((ladiesTokenId, idx) => {
            const babyPrices = showBalance?.[3][idx].map((babyPrice) =>
                (babyPrice / 10 ** 18).toString()
            );

            return {
                id: Number(ladiesTokenId.toString()),
                babyPrices,
            };
        });

        return {
            [COLLECTION_NAMES.genesis]: rentedGenesis,
            [COLLECTION_NAMES.lady]: rentedLadies,
        };
    };

    return useQuery(queryKey, queryFn, {
        enabled: !!isCorrectChain && !!readRentingContract,
        select: (res) => rentedMaleFemales(res),
        onError: (/* error */) => {
            // notify('error', 'Error while fetching all rented nfts');
        },
    });
};

// -----------------------===================================================
export const useQueriesOldPrice = ({ tokenId, collectionName }) => {
    // // const notify = useNotify();
    const {
        //  account,
        readRentingContract,
        isCorrectChain,
        //  ladyApesContract,
        rentingContract,
        //  genesisApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getAppTenderNft];
    const queryFn = async () => {
        // const showBalance = await readRentingContract.ShowBalance();

        if (collectionName === COLLECTION_NAMES.genesis) {
            const showBalance = await rentingContract.GenesisCostMapping(tokenId);

            return Number(showBalance.toString());
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            const showBalance = await rentingContract.LadyCostsMapping(tokenId);

            return showBalance.map((item) => Number(item.toString()));
        }
    };

    return useQuery(queryKey, queryFn, {
        enabled: !!isCorrectChain && !!readRentingContract,
        // select: (res) => rentedMaleFemales(res),
        onError: (/* error */) => {
            // notify('error', 'Error while fetching OldPrice');
        },
    });
};

export const useQueryBurnRate = () => {
    // // const notify = useNotify();
    const {
        //  account,
        //  readRentingContract,
        isCorrectChain,
        //  ladyApesContract,
        rentingContract,
        //  genesisApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getBurnRate];

    const queryFn = async () => {
        const showBalance = await rentingContract.BurnRate();

        return showBalance / 10; // .toString();
    };

    return useQuery(queryKey, queryFn, {
        enabled: !!isCorrectChain,
        select: (res) => res,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching burn rate');
        },
    });
};

// ---------------------------------------------------------------

// wacPending

export const useQueryPending = () => {
    // // const notify = useNotify();
    const {
        account,
        readRentingContract,
        //  isCorrectChain,
        //  ladyApesContract,
        //  rentingContract,
        //  genesisApesContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getPendingBalance];
    const queryFn = async () => {
        // const showBalance = await readRentingContract.ShowBalance();

        let showBalance = await readRentingContract.wacPending(account);
        // showBalance = ethers.utils.formatUnits(showBalance, 18)
        showBalance = showBalance.toString();
        showBalance = Math.floor(showBalance / 10 ** 18);

        return showBalance;
    };

    return useQuery(queryKey, queryFn, {
        enabled: !!readRentingContract && !!account,
        // select: (res) => rentedMaleFemales(res),
        onError: (/* error */) => {
            // notify('error', 'Error while fetching all rented nfts');
        },
    });
};

// ================================================================

export const useQueryGetInfo = ({ tokenId, collectionName }) => {
    const {
        account,
        //  readRentingContract,
        //  isCorrectChain,
        //  ladyApesContract,
        //  rentingContract,
        //  genesisApesContract,
        proxyNFTContract,
    } = useSelectWeb3();

    const queryKey = [queryKeys.getTokenInfo, tokenId, collectionName];
    const queryFn = async () => {
        if (collectionName === COLLECTION_NAMES.genesis) {
            return proxyNFTContract.infoGWAC(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.lady) {
            return proxyNFTContract.infoLWAC(tokenId);
        }

        if (collectionName === COLLECTION_NAMES.baby) {
            return proxyNFTContract.infoBWAC(tokenId);
        }

        return null;
    };

    return useQuery(queryKey, queryFn, {
        enabled: !!proxyNFTContract && !!account,
        select: (res) => res,
        onError: (/* error */) => {
            // notify('error', 'Error while fetching all rented nfts');
        },
    });
};
