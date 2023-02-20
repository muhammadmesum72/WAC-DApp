import { useQueryLadyBreedNumber } from './queries';

export { useQueryGenesisTokensStakedStatus } from './queries';
export { useQueryBalance } from './queries';
export { useQueryTokenNames } from './queries';
export { useQueryBabyApesBornStatus } from './queries';
export { useQueryLore } from './queries';
export { useQueryName } from './queries';
export { useQueryIsOwner } from './queries';
export { useQueryBabyDetails } from './queries';
export { useQueriesLadiesNumChildren } from './queries';
export { useQueriesBabyApes } from './queries';
export { useQueriesOldPrice } from './queries';
export { useQueryGetInfo } from './queries';

// ------------------------------------------------------------

export { useMutationBreed } from './mutations';
export { useMutationUserClaim } from './mutations';
export { useMutationChangeLore } from './mutations';
export { useMutationChangeName } from './mutations';
export { useMutationStake } from './mutations';
export { useMutationUnStake } from './mutations';
export { useMutationTransfer } from './mutations';
export { useMutationGiveBirth } from './mutations';
export { useMutationRenting } from './mutations';
export { useMutationUnRent } from './mutations';

// farm
export { useQueryFarmData } from './queries/farm-query';
export { useQueryERC20IsApproved } from './queries/farm-query';

export { useMutationFarmHarvest } from './mutations/farm-mutation';
export { useMutationERC20Approve } from './mutations/farm-mutation';
export { useMutationFarmStakeUnStake } from './mutations/farm-mutation';

// ---------------------------------- for both

export { useERC20AndERC721Approve } from './queries';

// --------------------------------------- myWapes queries

export { useQueryGetUserNFTsData } from './queries/myWapes-query';

// --------------------------------------------------------------- myWapes Mutations

export { useMutationMultipleStaking } from './mutations/myWapes-mutation';
export { useMutationmultipleUnStaking } from './mutations/myWapes-mutation';
