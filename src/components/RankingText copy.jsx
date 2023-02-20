import React, { useEffect, useState } from 'react';

import { Box, Stack, Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';

import {
    useMutationMultipleStaking,
    useMutationmultipleUnStaking,
    useQueryGetUserNFTsData,
} from '@/hooks/react-query';
import useResponsive from '@/hooks/useResponsive';
import { useSelectMyWallet } from '@/hooks/useSelectMyWallet';
import { multipleStaked, multipleUnStaked } from '@/redux/slice/myWallet';
import { COLLECTION_NAMES } from '@/utils/constants';

const Item = ({
    children,
    stackSx,
    sx,
    onClick,
    bgColor,
    unStaking,
    isLoading,
}) => {
    const multipleStakedState = useSelector(
        (state) => state.tabSlice.multipleStaking,
    );

    return (
        <Stack
            direction='column'
            onClick={onClick}
            spacing={1}
            justifyContent='center'
            alignItems='center'
            sx={{
                borderRadius: '14px',
                background:
               multipleStakedState || unStaking || isLoading
                   ? bgColor
                   : (theme) => theme.palette.primary.lighter,
                height: '100%',
                ...stackSx,
            }}
        >
            {isLoading ? (
                <Button
                    sx={{
                        py: 1,
                    }}
                >
                    <CircularProgress />
                </Button>
            ) : (
                <Typography
                    sx={{
                        textAlign: 'center',
                        px: {
                            xs: 1,
                            sm: 3,
                            md: 2,
                        },
                        py: 1,
                        fontSize: {
                            xs: '16px',
                            sm: '20px',
                        },
                        ...sx,
                    }}
                >
                    {children}
                </Typography>
            )}
        </Stack>
    );
};
export default function RankingText() {
    const { currentCollection } = useSelectMyWallet();
    const dispatch = useDispatch();
    const { data: allUserNFTs } = useQueryGetUserNFTsData();

    const nftCount = allUserNFTs?.[currentCollection]?.length;
    let rentedDataLength;

    switch (currentCollection) {
    case COLLECTION_NAMES.all: {
        rentedDataLength = allUserNFTs?.all?.filter(
            (items) => items.isRented === true,
        )?.length;

        break;
    }

    case COLLECTION_NAMES.genesis: {
        rentedDataLength = allUserNFTs?.Genesis?.filter(
            (items) => items.isRented === true,
        )?.length;

        break;
    }

    case COLLECTION_NAMES.lady: {
        rentedDataLength = allUserNFTs?.Ladies?.filter(
            (items) => items.isRented === true,
        )?.length;

        break;
    }

    case COLLECTION_NAMES.Babies: {
        rentedDataLength = allUserNFTs?.Babies?.filter(
            (items) => items.isRented === true,
        )?.length;

        break;
    }

    default:
        rentedDataLength = null;
    }

    let stakingCount;

    switch (currentCollection) {
    case COLLECTION_NAMES.all: {
        stakingCount = allUserNFTs?.all?.filter(
            (items) => items.isStaked === true,
        )?.length;

        break;
    }

    case COLLECTION_NAMES.genesis: {
        stakingCount = allUserNFTs?.Genesis?.filter(
            (items) => items.isStaked === true,
        )?.length;

        break;
    }

    case COLLECTION_NAMES.lady: {
        stakingCount = allUserNFTs?.Ladies?.filter(
            (items) => items.isStaked === true,
        )?.length;

        break;
    }

    case COLLECTION_NAMES.baby: {
        stakingCount = allUserNFTs?.Babies?.filter(
            (items) => items.isStaked === true,
        )?.length;

        break;
    }

    default:
        stakingCount = null;
    }

    // const matches = useResponsive('between', '', 1200, 1420);
    const isMobile = useResponsive('down', 'sm');
    // const [unStaking, setUnStaking] = useState(false);
    const [idsArrayData, setIdsArrayData] = useState([]);

    // Staked
    const multipleStakedState = useSelector(
        (state) => state.tabSlice.multipleStaking,
    );
    const multipleStakedArrayData = useSelector(
        (state) => state.tabSlice.multipleStakingArray,
    );
    // UnStaked
    const multipleUnStakedState = useSelector(
        (state) => state.tabSlice.multipleUnstaking,
    );

    const arrayData = multipleStakedArrayData?.length;

    // Staking Mutations

    const collectionName = multipleStakedArrayData?.[0]?.collectionName;

    const {
        isLoading: multipleStakingLoading,
        mutate: multipleStakingMutate,
    } = useMutationMultipleStaking(collectionName);

    const {
        isLoading: multipleUnStakingLoading,
        mutate: multipleUnStakingMutate,
    } = useMutationmultipleUnStaking(collectionName);

    const handleSelectStakingCount = () => {
        if (arrayData === 0 && multipleStakedState) {
            dispatch(multipleUnStaked(true));
            dispatch(multipleStaked(false));
        }

        if (arrayData !== 0 && multipleStakedState) {
            dispatch(multipleStaked(false));

            multipleStakingMutate({
                idsArrayData,
                collectionName,
            });
        }

        if (arrayData !== 0 && multipleUnStakedState) {
            dispatch(multipleUnStaked(false));

            multipleUnStakingMutate({
                idsArrayData,
                collectionName,
            });
            // setUnStaking(false);
        }

        if (multipleUnStakedState && arrayData === 0) {
            dispatch(multipleUnStaked(false));

            // setUnStaking(false);
            dispatch(multipleStaked(false));
        }

        if (!multipleStakedState && !multipleUnStakedState) {
            dispatch(multipleStaked(true));
        }

        // if (multipleStaked) {
        //   dispatch(multipleStaked(false));
        // }
    };

    useEffect(() => {
        const ids = multipleStakedArrayData?.[arrayData - 1]?.id || 0;

        if (ids !== 0) {
            setIdsArrayData([...idsArrayData, ids]);
        }
    }, [arrayData]);

    useEffect(() => {
        if (!multipleStakingLoading && !multipleUnStakingLoading) {
            dispatch(multipleStaked(false));
            dispatch(multipleUnStaked(false));
            setIdsArrayData([]);
        }
    }, [currentCollection]);

    return (
        <Box
            sx={{
                height: '100%',
                display: 'grid',
                gap: {
                    xs: 1,
                    // xl: 2,
                },
                gridTemplateColumns: {
                    xs: 'repeat(2, minmax(max-content, 1fr))',
                    sm: 'repeat(3, minmax(max-content, 1fr))',
                    // sm: 'repeat(3, max-content)',
                },
            // ...(matches && {
            //   gridTemplateColumns: 'repeat(2, minmax(max-content, 1fr))',
            // }),
            }}
        >
            <Item bgColor={(theme) => theme.palette.primary.lighter}>
            NFTs: {nftCount || 0}
            </Item>

            <Item
                isLoading={multipleStakingLoading || multipleUnStakingLoading}
                unStaking={multipleUnStakedState}
                onClick={currentCollection !== 'all' && handleSelectStakingCount}
                bgColor='linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)'
                sx={{
                    color:
                  multipleStakedState || multipleUnStakedState
                      ? '#fff'
                      : '#FFDA19',
                    cursor: currentCollection !== 'all' && 'pointer',
                }}
            >
                {multipleUnStakedState && 'UnStaking:'}

                {multipleStakedState && 'Staking:'}

                {!multipleStakedState && !multipleUnStakedState && 'Staking:'}

                {multipleStakedState || multipleUnStakedState
                    ? multipleStakedArrayData?.length
                    : stakingCount || 0}
            </Item>

            <Item
                sx={{
                    color: '#04F3E5',
                }}
                bgColor={(theme) => theme.palette.primary.lighter}
                stackSx={{
                    // ...((matches ||isMobile)&& {
                    ...(isMobile && {
                        gridColumn: '1/-1',
                        width: '100%',
                        justifySelf: 'center',
                    }),
                }}
            >
            Renting: {rentedDataLength || 0}
            </Item>
        </Box>
    );
}
