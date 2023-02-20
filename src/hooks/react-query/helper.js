// import { includes } from 'lodash';

import ladyApesMetadata from '@/assets/metadata/fapes_metadata';
import gwacRank from '@/assets/metadata/GWAC_Rank.json';
import ladyApesTraitsRarityMetaData from '@/assets/metadata/ladies_rarity.json';
import lwacRank from '@/assets/metadata/LWAC_Rank.json';
import genesisApesMetadata from '@/assets/metadata/mapes_metadata';
import genesis3DApesMetadata from '@/assets/metadata/mapes3d_metadata';
import genesisApesTraitsRarityMetaData from '@/assets/metadata/traits_rarity';
import genesis3DApesTraitsRarityMetaData from '@/assets/metadata/mapes3d_rarity';
import { BABY_SERVER, NETWORK } from '@/config';
// import httpClient from '@/utils/axios';
import { COLLECTION_NAMES } from '@/utils/constants';
import {
    getBabyApesTraitsRarityMetaData,
    getBWacRankId,
} from '@/utils/getBabyData';

//--------------------------------------------

export const getBabyParentsDetails = (babyData) => {
    const { fatherId, motherId, isBabyBorn, id: babyId } = babyData;

    const babyImgSrc = getBabyTokenURL(babyId, isBabyBorn);
    const foundFatherMetaData = genesisApesMetadata.find(
        metadata => metadata.edition === fatherId,
    );
    const fatherTraitsRarity = genesisApesTraitsRarityMetaData[fatherId];
    // const fatherImgSrc = `/apes/medium/${COLLECTION_NAMES.genesis}/${foundFatherMetaData?.edition}.png`;
    const fatherRank = fatherTraitsRarity?.rank || '?';

    const fatherData = {
        ...foundFatherMetaData,
        id: fatherId,
        collectionName: COLLECTION_NAMES.genesis,
        img: {
            small: `/apes/${COLLECTION_NAMES.genesis}/small/${fatherId}.png`,
            medium: `/apes/${COLLECTION_NAMES.genesis}/medium/${fatherId}.png`,
            full: `/apes/${COLLECTION_NAMES.genesis}/full/${fatherId}.png`,
        },
        rank: fatherRank,
        attributes: fatherTraitsRarity?.attributes,
        traitsRarity: fatherTraitsRarity,
    };

    const foundMotherMetaData = ladyApesMetadata.find(
        metadata => metadata.edition === motherId,
    );

    const traitsRarity = ladyApesTraitsRarityMetaData?.[motherId];
    const rank = traitsRarity || '?';
    // const fileName = motherId <= 1500 ? motherId : foundMotherMetaData.date;
    const fileName = foundMotherMetaData.date;

    const motherData = {
        ...foundMotherMetaData,
        id: motherId,
        collectionName: COLLECTION_NAMES.lady,
        img: {
            small: `/apes/${COLLECTION_NAMES.lady}/small/${fileName}.png`,
            medium: `/apes/${COLLECTION_NAMES.lady}/medium/${fileName}.png`,
            full: `/apes/${COLLECTION_NAMES.lady}/full/${fileName}.png`,
        },
        rank,
        traitsRarity,
    };

    return {
        babyData: {
            ...babyData,
        },
        id: babyId,
        imgSrc: babyImgSrc,
        motherData,
        fatherData,
        collectionName: COLLECTION_NAMES.baby,
    };
};

function getBabyTokenURL(tokenId, babyIsBorn, size = 'medium') {
    if (babyIsBorn) {
        // if (tokenId <= 3000) {
        // const filename = tokenId;

        // return `/apes/${COLLECTION_NAMES.baby}/${size}/${filename}.png`;
        // }

        // const filename = (24567 - Number(tokenId)) * 6;
        // const filename = (12000 - Number(tokenId)) * 3;

        let filename;

        if (NETWORK.CHAIN_ID === 25) {
            filename = (12000 - Number(tokenId)) * 3;

            return size === 'small'
                ? `${BABY_SERVER}/img/${filename}.png`
                : `${BABY_SERVER}/img/${size}/${filename}.png`;
        }

        if (NETWORK.CHAIN_ID === 338) {
            filename = (24567 - Number(tokenId)) * 6;

            return size === 'small'
                ? `${BABY_SERVER}/testnet/img/${filename}.png`
                : `${BABY_SERVER}/testnet/img/${size}/${filename}.png`;
        }
    } else {
        return '/img/incubatorWAC.gif';
    }
}

//----------------------------------------------
// copy function
export const getTokenDetails = (data/* , isBabIes */) => {
    const babyApesDetails = data?.[COLLECTION_NAMES.baby]?.map((babyId) => {
        const collectionName = COLLECTION_NAMES.baby;

        return {
            id: babyId,
            imgSrc: '/img/incubatorWAC.gif',
            img: {
                small: `/apes/${collectionName}/small/${babyId}.png`,
                medium: `/apes/${collectionName}/medium/${babyId}.png`,
                full: `/apes/${collectionName}/full/${babyId}.png`,
            },
            name: `Baby Weird Apes: #${babyId}`,
            collectionName: COLLECTION_NAMES.baby,
        };
    });

    const genesisApesDetails = data?.[COLLECTION_NAMES.genesis]?.map(
        genesisId => {
            const foundMetaData = genesisApesMetadata.find(
                metadata => metadata.edition === genesisId,
            );

            const collectionName = COLLECTION_NAMES.genesis;
            const traitsRarity = genesisApesTraitsRarityMetaData[genesisId];
            const rank = traitsRarity?.rank || '?';

            return {
                ...foundMetaData,
                id: genesisId,
                collectionName,
                img: {
                    small: `/apes/${collectionName}/small/${foundMetaData.edition}.png`,
                    medium: `/apes/${collectionName}/medium/${foundMetaData.edition}.png`,
                    full: `/apes/${collectionName}/full/${foundMetaData.edition}.png`,
                },
                rank,
                attributes: traitsRarity?.attributes,
                traitsRarity,
            };
        },
    );

    const genesis3DApesDetails = data?.[COLLECTION_NAMES.genesis3d]?.map(
        genesisId => {
            const foundMetaData = genesis3DApesMetadata.find(metadata => metadata.edition === genesisId);

            const collectionName = COLLECTION_NAMES.genesis3d;
            const traitsRarity = genesis3DApesTraitsRarityMetaData[genesisId];
            const rank = traitsRarity?.rank || '?';

            return {
                ...foundMetaData,
                id: genesisId,
                collectionName,
                img: {
                    small: `/apes/${collectionName}/small/${foundMetaData.edition}.png`,
                    medium: `/apes/${collectionName}/medium/${foundMetaData.edition}.png`,
                    full: `/apes/${collectionName}/full/${foundMetaData.edition}.png`,
                },
                rank,
                attributes: traitsRarity?.attributes,
                traitsRarity,
            };
        },
    );

    const ladyApesDetails = data?.[COLLECTION_NAMES.lady]?.map(ladyId => {
        const foundMetaData = ladyApesMetadata.find(
            metadata => metadata.edition === ladyId,
        );

        const collectionName = COLLECTION_NAMES.lady;
        const traitsRarity = ladyApesTraitsRarityMetaData?.[ladyId];
        const rank = traitsRarity || '?';

        // const fileName = ladyId <= 1500 ? ladyId : foundMetaData.date;
        const fileName = foundMetaData.date;

        return {
            ...foundMetaData,
            id: ladyId,
            collectionName,
            img: {
                small: `/apes/${collectionName}/small/${fileName}.png`,
                medium: `/apes/${collectionName}/medium/${fileName}.png`,
                full: `/apes/${collectionName}/full/${fileName}.png`,
            },
            rank,
            traitsRarity,
        };
    });

    const all = [...babyApesDetails, ...genesisApesDetails, ...ladyApesDetails, ...genesis3DApesDetails];

    // return [...babyApesDetails, ...genesisApesDetails, ...ladyApesDetails];
    return {
        [COLLECTION_NAMES.all]: all,
        [COLLECTION_NAMES.baby]: babyApesDetails,
        [COLLECTION_NAMES.genesis]: genesisApesDetails,
        [COLLECTION_NAMES.genesis3d]: genesis3DApesDetails,
        [COLLECTION_NAMES.lady]: ladyApesDetails,
    };
};

// -----------------------------------------------
export const getSingleTokenDetails = async ({
    currentExplorerButton,
    dimensionalSwitchType = '2d',
    idRankType = 'id',
    enteredNumber,
}, babyApesTraitsRarityMetaDataParam = null) => {
    let number = Number(enteredNumber);

    if (idRankType === 'rank') {
        if (currentExplorerButton === COLLECTION_NAMES.lady) {
            number = Number(lwacRank[number]);
        }

        if (currentExplorerButton === COLLECTION_NAMES.genesis) {
            number = Number(gwacRank[number]);
        }

        // TODO: 3d genesis: rank -> id

        if (currentExplorerButton === COLLECTION_NAMES.baby) {
            const bWacRank = await getBWacRankId();
            number = Number(bWacRank[number][Math.floor(Math.random() * bWacRank[number].length)]);
        }
    }

    if (dimensionalSwitchType === '2d') {
        if (currentExplorerButton === COLLECTION_NAMES.genesis) {
            const foundMetaData = genesisApesMetadata.find(
                metadata => metadata.edition === number,
            );

            const collectionName = COLLECTION_NAMES.genesis;
            const traitsRarity = genesisApesTraitsRarityMetaData[number];
            const rank = traitsRarity?.rank || '?';

            return {
                ...foundMetaData,
                id: number,
                collectionName,
                name: `${collectionName} Weird Apes: #${number}`,
                img: {
                    small: `/apes/${collectionName}/small/${foundMetaData.edition}.png`,
                    medium: `/apes/${collectionName}/medium/${foundMetaData.edition}.png`,
                    full: `/apes/${collectionName}/full/${foundMetaData.edition}.png`,
                },
                rank,
                attributes: traitsRarity?.attributes,
                traitsRarity,
            };
        }

        if (currentExplorerButton === COLLECTION_NAMES.lady) {
            const foundMetaData = ladyApesMetadata.find(
                metadata => metadata.edition === number,
            );

            const collectionName = COLLECTION_NAMES.lady;
            const traitsRarity = ladyApesTraitsRarityMetaData?.[number];
            const rank = traitsRarity || '?';

            return {
                ...foundMetaData,
                id: number,
                collectionName,
                name: `${collectionName} Weird Apes: #${number}`,
                img: {
                    small: `/apes/${collectionName}/small/${foundMetaData.date}.png`,
                    medium: `/apes/${collectionName}/medium/${foundMetaData.date}.png`,
                    full: `/apes/${collectionName}/full/${foundMetaData.date}.png`,
                },
                rank,
                traitsRarity,
            };
        }

        if (currentExplorerButton === COLLECTION_NAMES.baby) {
            const babyApesTraitsRarityMetaData = babyApesTraitsRarityMetaDataParam ?
                babyApesTraitsRarityMetaDataParam :
                await getBabyApesTraitsRarityMetaData();

            const id = number;
            const collectionName = COLLECTION_NAMES.baby;
            const traitsRarity = babyApesTraitsRarityMetaData[number];
            const rank = traitsRarity?.rank || '?';


            return {
                id,
                imgSrc: '/img/incubatorWAC.gif',
                img: {
                    small: getBabyTokenURL(id, true, 'small'),
                    medium: getBabyTokenURL(id, true, 'medium'),
                    full: getBabyTokenURL(id, true, 'full'),
                },
                name: `${collectionName} Weird Apes: #${id}`,
                collectionName,
                rank,
                traitsRarity,
                attributes: traitsRarity?.attributes.traits,
                metatraits: traitsRarity?.attributes.metatraits,
            };
        }
    }

    if (dimensionalSwitchType === '3d') {
        if (currentExplorerButton === COLLECTION_NAMES.genesis3d || currentExplorerButton === COLLECTION_NAMES.genesis) {
            const collectionName = COLLECTION_NAMES.genesis3d;
            const foundMetaData = genesis3DApesMetadata.find(metadata => metadata.edition === number);

            const traitsRarity = genesis3DApesTraitsRarityMetaData[number];
            const rank = traitsRarity?.rank || '?';

            return {
                ...(foundMetaData || {}),
                id: number,
                collectionName: collectionName,
                name: `${collectionName} Weird Apes: #${number}`,
                img: {
                    small: `/apes/${collectionName}/small/${number}.png`,
                    medium: `/apes/${collectionName}/medium/${number}.png`,
                    full: `/apes/${collectionName}/full/${number}.png`,
                },
                rank,
                attributes: traitsRarity?.attributes,
                traitsRarity,
            };
        }
    }

    console.error('Not expected case: ', dimensionalSwitchType, currentExplorerButton);
    return {
        id: number,
        collectionName: currentExplorerButton,
    };
};

// -----------------------------------------

// get rented genesis and ladies

export const rentedMaleFemales = (data) => {
    let genesisApesDetails = data?.[COLLECTION_NAMES.genesis]?.map(
        genesis => {
            const genesisId = genesis?.id ?? genesis;
            const foundMetaData = genesisApesMetadata.find(
                metadata => metadata.edition === genesisId,
            );

            const collectionName = COLLECTION_NAMES.genesis;
            const traitsRarity = genesisApesTraitsRarityMetaData[genesisId];
            const rank = traitsRarity?.rank || '?';

            return {
                ...foundMetaData,
                id: genesisId,
                collectionName,
                isRented: true,
                img: {
                    small: `/apes/${collectionName}/small/${foundMetaData.edition}.png`,
                    medium: `/apes/${collectionName}/medium/${foundMetaData.edition}.png`,
                    full: `/apes/${collectionName}/full/${foundMetaData.edition}.png`,
                },
                rank,
                attributes: traitsRarity?.attributes,
                traitsRarity,
                price: genesis.price,
            };
        },
    );

    let ladyApesDetails = data?.[COLLECTION_NAMES.lady]?.map(lady => {
        const ladyId = lady?.id ?? lady;
        const foundMetaData = ladyApesMetadata.find(
            metadata => metadata.edition === ladyId,
        );

        const collectionName = COLLECTION_NAMES.lady;
        const traitsRarity = ladyApesTraitsRarityMetaData?.[ladyId];
        const rank = traitsRarity || '?';

        // const fileName = ladyId <= 1500 ? ladyId : foundMetaData.date;
        const fileName = foundMetaData.date;

        return {
            ...foundMetaData,
            id: ladyId,
            collectionName,
            isRented: true,
            img: {
                small: `/apes/${collectionName}/small/${fileName}.png`,
                medium: `/apes/${collectionName}/medium/${fileName}.png`,
                full: `/apes/${collectionName}/full/${fileName}.png`,
            },
            rank,
            traitsRarity,
            babyPrices: lady.babyPrices,
        };
    });

    genesisApesDetails = genesisApesDetails || [];
    ladyApesDetails = ladyApesDetails || [];

    const all = [...genesisApesDetails, ...ladyApesDetails];

    return {
        [COLLECTION_NAMES.all]: all,
        [COLLECTION_NAMES.genesis]: genesisApesDetails,
        [COLLECTION_NAMES.lady]: ladyApesDetails,
    };
};

// ------------------------------------------------------------

// get prices of genesis and ladies
// f(N,G,L1,L2,L3)
// wac cost = f(N,G,L1,L2,L3) = (480+G) x N + L1 - (N^2-4xN+3) x L2 + (N^2-3xN+2) x L3

export const getWacPrice = (
    numOfBabies = 0,
    genesisBabyPrice = 0,
    ladyBabiesPrice = [0, 0, 0],
    isLady,
) => {
    let N;
    let G;
    let L1;
    let L2;
    let L3;

    if (isLady) {
        N = Number(numOfBabies) || 0;
        G = Number(ladyBabiesPrice) || 0;
        L1 = Number(genesisBabyPrice[0]);
        L2 = Number(genesisBabyPrice[1]) || 0;
        L3 = Number(genesisBabyPrice[2]) || 0;
    } else {
        N = Number(numOfBabies) || 0;
        G = Number(genesisBabyPrice) || 0;
        L1 = Number(ladyBabiesPrice[0]);
        L2 = Number(ladyBabiesPrice[1]);
        L3 = Number(ladyBabiesPrice[2]);
    }

    return (
        (480 + G) * N + L1 - (N ** 2 - 4 * N + 3) * L2 + (N ** 2 - 3 * N + 2) * L3
    );
};

// =============================================================================
// new functions

export const convertWACsData = (data) =>
    data?.map((item) => Number(item.toString()));

// get nfts details

export const getTokensNFTDetails = async (idList, collectionName, dimension = '2d') => {
    let nftData = idList?.map((item) => Number(item.toString()))?.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    let babyApesTraitsRarityMetaDataParam = null;
    if (collectionName === COLLECTION_NAMES.baby) {
        babyApesTraitsRarityMetaDataParam = await getBabyApesTraitsRarityMetaData();
    }

    return await Promise.all(nftData?.map(nftID =>
        getSingleTokenDetails({
            currentExplorerButton: collectionName,
            dimensionalSwitchType: dimension,
            enteredNumber: nftID,
        }, babyApesTraitsRarityMetaDataParam)
    ));
};

export const getStakedTokensNFTDetails = (nftData, staked, rented) =>
    nftData?.map((nft) => {
        const isStaked = staked?.includes(nft?.id);
        const isRented = rented?.includes(nft?.id);

        return {
            ...nft,
            isStaked,
            [nft?.collectionName !== COLLECTION_NAMES.baby
                ? 'isRented'
                : 'incubatedBWAC']: isRented,
        };
    });
