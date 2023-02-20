import React, { useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';

import {
    closeBtn,
    // ResultBreed,
    selectGenesisBackground,
    selectLadyBackground,
} from '@/assets';
import NftCard from '@/components/card/NftCard';
// import MyTypography from '@/components/MyTypography';
import { HEIGHT } from '@/config';
import {
    useMutationBreed,
    useQueriesLadiesNumChildren,
    useQueryGetUserNFTsData,
} from '@/hooks/react-query';
import useResponsive from '@/hooks/useResponsive';
import { useSelectWeb3 } from '@/hooks/useSelectWeb3';

import MButton from '../components/MButton';
import { COLLECTION_NAMES } from '../utils/constants';

const CARD_STYLE = {
    maxWidth: 320,
    width: '100%',
    p: 1,
    background: (theme) => theme.palette.primary.light,
    borderRadius: 2,
};
export default function Breeding() {
    const isLgDown = useResponsive('down', 'lg');

    const { account } = useSelectWeb3();
    const [selectedNfts, setSelectedNfts] = useState([]);
    const [userNfts, setUserNfts] = useState();

    const { data: allUserNFTs } = useQueryGetUserNFTsData();

    const ladiesNumChildren = useQueriesLadiesNumChildren(allUserNFTs);
    const allFinished = ladiesNumChildren.every((query) => query.isSuccess);

    useEffect(() => {
        if (allFinished && allUserNFTs) {
            // all the queries have executed successfully

            let genesis = allUserNFTs?.[COLLECTION_NAMES.genesis];
            genesis = genesis?.filter((item) => item.isRented === false);
            const data = ladiesNumChildren.map((result) => result.data);

            let ladies = allUserNFTs ? allUserNFTs?.[COLLECTION_NAMES.lady] : [];
            ladies = ladies?.filter((item) => item.isRented === false);

            const ladyApes = ladies.filter((item, idx) => data[idx] === true);

            setUserNfts({
                [COLLECTION_NAMES.genesis]: genesis,
                [COLLECTION_NAMES.lady]: ladyApes,
            });
        }
    }, [allFinished, allUserNFTs]);

    const [selectNftType, setSelectNftType] = useState();
    const [selectedGenesis, setSelectedGenesis] = useState();
    const [selectedLady, setSelectedLady] = useState('');

    useEffect(() => {
        setSelectedNfts(userNfts?.[selectNftType]);
    }, [selectNftType, userNfts]);

    const {
        isLoading: isBreeding,
        isSuccess: isBreedingSuccess,
        mutate: breed,
        reset: resetBreed,
    } = useMutationBreed();
    const handleShowingNfts = (nftType) => {
        setSelectNftType(nftType);
    };

    const handleBreed = () => {
        breed({
            genesisApeId: selectedGenesis.edition,
            ladyApeId: selectedLady.edition,
        });
    };

    const handleClear = () => {
        resetBreed();
        setSelectNftType();
        setSelectedGenesis();
        setSelectedLady();
    };

    return (
        <>
            {!selectNftType && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: HEIGHT,
                        ...(isLgDown && {
                            height: 'auto',
                        }),
                        flexDirection: {
                            xs: 'column',
                            lg: 'row',
                        },
                        gap: {
                            xs: 3,
                            lg: 2,
                        },
                        justifyContent: 'space-evenly',
                        mb: { xs: 8, sm: 0 },
                    }}
                >
                    <Box sx={CARD_STYLE}>
                        <Box
                            component='img'
                            onClick={() => {
                                if (account && !isBreedingSuccess)
                                    handleShowingNfts(COLLECTION_NAMES.genesis);
                            }}
                            src={
                                !selectedGenesis
                                    ? selectGenesisBackground
                                    : selectedGenesis?.img?.medium
                            }
                            sx={{
                                cursor: 'pointer',
                                width: '100%',
                                minWidth: 220,
                            }}
                        />
                    </Box>

                    <Box sx={CARD_STYLE}>
                        <Box
                            component='img'
                            onClick={() => {
                                if (account && !isBreedingSuccess)
                                    handleShowingNfts(COLLECTION_NAMES.lady);
                            }}
                            src={
                                !selectedLady
                                    ? selectLadyBackground
                                    : selectedLady?.img?.medium
                            }
                            sx={{
                                cursor: 'pointer',
                                width: '100%',
                                minWidth: '220px',
                            }}
                        />
                    </Box>

                    <MButton
                        loading={isBreeding}
                        title={!isBreedingSuccess ? 'Breed' : 'Clear'}
                        onClick={() => {
                            if (!isBreedingSuccess) handleBreed();
                            else handleClear();
                        }}
                        sx={{
                            px: '20px !important',
                            width: '-webkit-fill-available',
                            maxWidth: '100px',
                        }}
                        disabled={!selectedGenesis || !selectedLady}
                    />

                    <Box sx={CARD_STYLE}>
                        {isBreedingSuccess ? (
                            <Box
                                component='img'
                                // onClick={(e) => handleShowingNfts(e)}
                                src='/img/incubatorWAC.gif'
                                sx={{
                                    width: '100%',
                                    cursor: 'pointer',
                                    minWidth: '220px',
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    position: 'relative',
                                    zIndex: 0,
                                    borderRadius: '10px !important',
                                }}
                            >
                                <Box
                                    component='img'
                                    src='/img/incubatorWAC.gif'
                                    sx={{ borderRadius: '8px' }}
                                />

                                <Box
                                    sx={{
                                        background: '#101010d1',
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        borderRadius: '8px',
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            )}

            {selectNftType && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            my: 2,
                            position: 'relative',
                        }}
                    >
                        <IconButton
                            onClick={() => setSelectNftType()}
                            sx={{
                                position: {
                                    xs: 'relative',
                                    md: 'absolute',
                                },
                                right: 10,
                                top: -12,
                                zIndex: 9,
                            }}
                        >
                            <Box
                                component='img'
                                src={closeBtn}
                                sx={{
                                    width: 30,
                                }}
                            />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            pb: {
                                xs: 6,
                                sm: 0,
                            },
                            gridTemplateColumns: {
                                xs: 'repeat(auto-fill, minmax(198px, 1fr))',
                                xl: 'repeat(auto-fill, minmax(230px, 1fr))',
                            },
                        }}
                    >
                        {selectedNfts?.map(token => (
                            <NftCard
                                key={`breeding__${token.name}`}
                                card={token}
                                breed
                                sx={{
                                    fontSize: '14px',
                                }}
                                onBtnClick={() => {
                                    if (selectNftType === COLLECTION_NAMES.lady) {
                                        setSelectedLady(token);
                                    } else if (
                                        token.collectionName === COLLECTION_NAMES.genesis
                                    ) {
                                        setSelectedGenesis(token);
                                    }

                                    setSelectNftType();
                                }}
                            />
                        ))}
                    </Box>
                </>
            )}
        </>
    );
}
