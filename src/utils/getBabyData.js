import { BABY_SERVER, NETWORK } from '@/config';

import httpClient from './axios';

export const getBabyApesTraitsRarityMetaData = async () => {
    // const url = 'https://server.weirdapesclub.com:8585/rank/id_to_rank.json'; // mainnet
    // const url = 'https://server.weirdapesclub.com:8585/testnet/rank/id_to_rank.json'; // testnet
    const url =
        NETWORK.CHAIN_ID === 25
            ? `${BABY_SERVER}/rank/id_to_rank.json`
            : `${BABY_SERVER}/testnet/rank/id_to_rank.json`;

    let response = await httpClient.get(url);
    response = response?.data;

    return response;
};

export const getBWacRankId = async () => {
    // const url = 'https://server.weirdapesclub.com:8585/rank/rank_to_id.json'; // mainnet
    // const url =     'https://server.weirdapesclub.com:8585/testnet/rank/rank_to_id.json'; // testnet

    const url = //= `${BABY_SERVER}/rank/rank_to_id.json`;
        NETWORK.CHAIN_ID === 25
            ? `${BABY_SERVER}/rank/rank_to_id.json`
            : `${BABY_SERVER}/testnet/rank/rank_to_id.json`;

    let response = await httpClient.get(url);
    response = response?.data;

    return response;
};
