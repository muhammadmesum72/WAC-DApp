import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useQueryGetUserNFTsData } from '@/hooks/react-query';
// import { useQueryGetUserNFTsData } from '@/hooks/react-query/queries';
import { useSelectMyWapes } from '@/hooks/useSelectMyWapes';
import { multipleStakedArray } from '@/redux/slice/myWapes';
import { rentedSelectArray } from '@/redux/slice/renting';
import { COLLECTION_NAMES } from '@/utils/constants';

import NftCard from './card/NftCard';

export const NftList = ({ handleNftClick, handleBabyDetails }) => {
    const dispatch = useDispatch();

    const [selectedNfts, setSelectedNfts] = useState([]);
    const [userNfts, setUserNfts] = useState();
    const [firstSelectedNft, setFirstSelectedNft] = useState(false);

    const multipleStakedState = useSelector(
        (state) => state.tabSlice.multipleStaking
    );

    const multipleStakedArrayData = useSelector(
        (state) => state.tabSlice.multipleStakingArray
    );

    const multipleUnStakedState = useSelector(
        (state) => state.tabSlice.multipleUnstaking
    );

    const { currentCollection } = useSelectMyWapes();

    const { data: allUserNFTs } = useQueryGetUserNFTsData();

    useEffect(() => {
        setSelectedNfts(userNfts?.[currentCollection]);
        // dispatch(multipleStakedArray([]))
    }, [currentCollection, userNfts]);

    useEffect(() => {
        if (allUserNFTs) {
            setUserNfts(allUserNFTs);
        }
    }, [allUserNFTs]);

    useEffect(() => {
        dispatch(multipleStakedArray([]));
    }, [currentCollection, multipleStakedState, multipleUnStakedState, dispatch]);

    // ======================================================

    const toggleElement = (arr, val) => {
        if (
            val.collectionName !== COLLECTION_NAMES.baby ||
            val?.incubatedBWAC === false
        ) {
            // stake
            if (
                val.isStaked !== true &&
                multipleStakedState
            ) {
                // const newValue = arr.includes(val)
                // && !(val?.isRented === firstSelectedNft)
                //   ? arr.filter((el) => el !== val)
                //   : [...arr, val];
                if (val.collectionName === COLLECTION_NAMES.genesis) {
                    // let newValue;
                    if (arr?.includes(val)) {
                        const newValue = arr.filter((el) => el !== val);
                        setFirstSelectedNft(newValue?.[0]?.isRented);
                        dispatch(multipleStakedArray(newValue));

                    } else if (
                        multipleStakedArrayData.length === 0 ||
                        val?.isRented === firstSelectedNft
                    ) {
                        const newValue = [...arr, val];
                        setFirstSelectedNft(newValue?.[0]?.isRented);
                        dispatch(multipleStakedArray(newValue));
                    }
                } else {
                    // TODO: credo questo if - else sia eliminabile:
                    // fai sempre e solo l'else (non riesco ad entrare nell'if)
                    if (arr?.includes(val)) {
                        const newValue = arr.filter((el) => el !== val);
                        dispatch(multipleStakedArray(newValue));
                    } else {
                        dispatch(multipleStakedArray([...arr, val]));
                    }

                }
            }

            // unstake
            if (val.isStaked === true && multipleUnStakedState) {
                // const newValue = arr.includes(val)
                //   ? arr.filter((el) => el !== val)
                //   : [...arr, val];
                if (val.collectionName === COLLECTION_NAMES.genesis) {
                    if (arr?.includes(val)) {
                        const newValue = arr.filter((el) => el !== val);
                        setFirstSelectedNft(newValue?.[0]?.isRented);
                        dispatch(multipleStakedArray(newValue));
                    } else if (
                        multipleStakedArrayData.length === 0 ||
                        val?.isRented === firstSelectedNft
                    ) {
                        const newValue = [...arr, val];
                        setFirstSelectedNft(newValue?.[0]?.isRented);
                        dispatch(multipleStakedArray(newValue));
                    }

                    // dispatch(multipleStakedArray(newValue));
                } else {
                    if (arr?.includes(val)) {
                        const newValue = arr.filter((el) => el !== val);
                        setFirstSelectedNft(newValue?.[0]?.isRented);
                        dispatch(multipleStakedArray(newValue));
                    } else {
                        dispatch(multipleStakedArray([...arr, val]));
                    }
                }
            }
        }
    };

    useEffect(() => {
        dispatch(rentedSelectArray(firstSelectedNft));
    }, [dispatch, firstSelectedNft]);

    return (
        <Box>
            <Box
                sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                }}
            >
                {selectedNfts?.map(nft => (
                    <NftCard
                        key={`my_wallet__nft__${nft.id}__${nft.collectionName}`}
                        card={nft}
                        stakedArrayCard={multipleStakedArrayData}
                        onNftClick={() => {
                            if (multipleStakedState || multipleUnStakedState) {
                                if (multipleUnStakedState &&
                                    nft.collectionName === COLLECTION_NAMES.genesis &&
                                    !nft.isRented
                                ) {
                                    // do nothing: not rented genesis can't be batch unstaked
                                } else {
                                    toggleElement(multipleStakedArrayData, nft);
                                }
                            } else if (nft?.collectionName === COLLECTION_NAMES.baby) {
                                handleBabyDetails(nft);
                            } else {
                                handleNftClick(nft);
                            }
                        }}
                        cardSx={{
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};
//
