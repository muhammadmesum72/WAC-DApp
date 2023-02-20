

// export const babyApesAddress = '0x93cb107C2e5EfAE26F8F217F3a5346c58fCC8e64';

// export { default as babyApesAbi } from './abi/BABY_APES.json';
// export { default as farmAbi } from './abi/FARM.json';
// export { default as genesisApesAbi } from './abi/GENESIS_APES.json';
// export { default as ladyApesAbi } from './abi/LADY_APES.json';
// export { default as proxyContractAbi } from './abi/ProxyUser.json';
// export { default as tokeERC20Abi } from './abi/TOKEN_ERC20.json';

// export { default as rentingContract } from './abi/RentingWrite.json';

// export { default as readRentingContract } from './abi/ReadRenting.json';

// export { default as vialsStakingContract } from './abi/VialsStaking.json';
// export { default as proxyNFTContract } from './abi/ProxyNFT.json';
// export { default as catalystContract } from './abi/Catalysts.json';

// testnet
import babyApesAbi_T from './abi/testnet/BABY_APES.json';
import catalystContract_T from './abi/testnet/Catalysts.json';
import farmAbi_T from './abi/testnet/FARM.json';
import genesisApesAbi_T from './abi/testnet/GENESIS_APES.json';
import genesis3DApesAbi_T from './abi/testnet/GENESIS_3D_APES.json';
import ladyApesAbi_T from './abi/testnet/LADY_APES.json';
import proxyNFTContract_T from './abi/testnet/ProxyNFT.json';
import proxyContractAbi_T from './abi/testnet/ProxyUser.json';
import readRentingContract_T from './abi/testnet/ReadRenting.json';
import rentingContract_T from './abi/testnet/RentingWrite.json';
import tokeERC20Abi_T from './abi/testnet/TOKEN_ERC20.json';
import vialsStakingContract_T from './abi/testnet/VialsStaking.json';

// mainnet
import babyApesAbi_M from './abi/mainnet/BABY_APES.json';
import catalystContract_M from './abi/mainnet/Catalysts.json';
import farmAbi_M from './abi/mainnet/FARM.json';
import genesisApesAbi_M from './abi/mainnet/GENESIS_APES.json';
import genesis3DApesAbi_M from './abi/mainnet/GENESIS_3D_APES.json';
import ladyApesAbi_M from './abi/mainnet/LADY_APES.json';
import proxyNFTContract_M from './abi/mainnet/ProxyNFT.json';
import proxyContractAbi_M from './abi/mainnet/ProxyUser.json';
import readRentingContract_M from './abi/mainnet/ReadRenting.json';
import rentingContract_M from './abi/mainnet/RentingWrite.json';
import tokeERC20Abi_M from './abi/mainnet/TOKEN_ERC20.json';
import vialsStakingContract_M from './abi/mainnet/VialsStaking.json';

export const contractAbis = {
    // testnet
    338: {
        babyApesAbi: babyApesAbi_T,
        farmAbi: farmAbi_T,
        genesisApesAbi: genesisApesAbi_T,
        genesis3DApesAbi: genesis3DApesAbi_T,
        ladyApesAbi: ladyApesAbi_T,
        proxyContractAbi: proxyContractAbi_T,
        tokeERC20Abi: tokeERC20Abi_T,
        rentingContract: rentingContract_T,
        readRentingContract: readRentingContract_T,
        vialsStakingContract: vialsStakingContract_T,
        proxyNFTContract: proxyNFTContract_T,
        catalystContract: catalystContract_T,
    },
    // mainnet
    25: {
        babyApesAbi: babyApesAbi_M,
        farmAbi: farmAbi_M,
        genesisApesAbi: genesisApesAbi_M,
        genesis3DApesAbi: genesis3DApesAbi_M,
        ladyApesAbi: ladyApesAbi_M,
        proxyContractAbi: proxyContractAbi_M,
        tokeERC20Abi: tokeERC20Abi_M,
        rentingContract: rentingContract_M,
        readRentingContract: readRentingContract_M,
        vialsStakingContract: vialsStakingContract_M,
        proxyNFTContract: proxyNFTContract_M,
        catalystContract: catalystContract_M,
    },
};
