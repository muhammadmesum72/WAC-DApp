



import React, { useEffect, useState } from 'react';

import { Box, Link, Typography } from '@mui/material';

// import TRAITS_RARITY from '@/assets/metadata/traits_rarity';
import { conciseAddress } from '@/helpers/utilities';
// import { useQueryLore, useQueryName } from '@/hooks/react-query';
import {
    useQueryGetInfo,
    // useQueryLadyBreedNumber
} from '@/hooks/react-query/queries';
// import useResponsive from '@/hooks/useResponsive';
import { COLLECTION_NAMES } from '@/utils/constants';

import ContentTable from '../ContentTable';

// const getRarity = (trait, type) => {
//   const result = TRAITS_RARITY.find(
//      (o) => o.trait === trait && o.type === type
//   );

//   return result?.rarity ?? '';
// };

const ObjectData = {
    Background: 'Ocher',
    Body: 'Grey',
    'Body accessory': 'Plants shirt',
    Mouth: 'Smile',
    Eyes: 'High',
    'Head accessory': 'Weird hat',
    'Face accessory': 'none',
    Sex: 'Male',
    'Trait Count': '7',
};

function ModalContent({ selectedCard, isExplore, owner }) {

    const {
        attributes,
        //  date,
        //  description,
        collectionName,
        id: tokenId,
        // id,
        //  rank,
        // name,
        // img,
        // isEgg,
    } = selectedCard ||
   {
       //
   };

    // const isLCD = useResponsive('up', 'xl');
    // const [isOwnerAddress, setIsOwnerAddress] = useState(owner);
    const [isObject, setIsObject] = useState({
        //
    });

    // const { isLoading: isBreedAbleLoading, data: numberOfBreeds } =
    //  useQueryLadyBreedNumber({
    //    tokenId,
    //    collectionName,
    //  });
    const { data: wacInfoData } = useQueryGetInfo({
        tokenId,
        collectionName,
    });

    // Convert array into Object
    useEffect(() => {
        if (!attributes) {
            setIsObject(ObjectData);
        } else if (attributes) {
            const formattedAttributes = Object.fromEntries(
                attributes?.map((item) => [item.trait_type, item.value])
            );
            setIsObject(formattedAttributes);
        }
    }, [attributes, collectionName, selectedCard]);

    // useEffect(() => {
    //    async function setAddress() {
    //       await setIsOwnerAddress(conciseAddress(owner, 10, 10));
    //    }

    //    setAddress();
    // }, [owner]);

    // const { data: lore } = useQueryLore({
    //    tokenId,
    //    collectionName,
    // });
    // const { data: name } = useQueryName({
    //    tokenId,
    //    collectionName,
    // });

    let lore;
    let name;
    let numberOfBreeds;
    let birthDate;

    if (collectionName === COLLECTION_NAMES.lady) {
        name = wacInfoData?.[4]?.toString();
        lore = wacInfoData?.[5]?.toString();

        numberOfBreeds =
         collectionName === COLLECTION_NAMES.lady && wacInfoData?.[3];

        numberOfBreeds = numberOfBreeds?.toString();
    }

    if (collectionName === COLLECTION_NAMES.genesis) {
        name = wacInfoData?.[3]?.toString();
        lore = wacInfoData?.[4]?.toString();
    }

    if (collectionName === COLLECTION_NAMES.baby) {
        birthDate = wacInfoData?.[3];
        name = wacInfoData?.[6];
        lore = wacInfoData?.[7];

        if (birthDate) {
            birthDate = birthDate?.toString();
            birthDate = new Date(Number(birthDate) * 1000);
            birthDate = birthDate.toLocaleDateString();
        }
        // birthDate = birthDate.toLocaleString();
    }
    // : wacInfoData?.[4]
    // : wacInfoData?.[3]

    // let lore = collectionName === COLLECTION_NAMES.lady ? wacInfoData?.[5] : wacInfoData?.[4];
    // let name = collectionName === COLLECTION_NAMES.lady ? wacInfoData?.[4] : wacInfoData?.[3];
    // let numberOfBreeds = collectionName === COLLECTION_NAMES.lady && wacInfoData?.[3];
    // numberOfBreeds = numberOfBreeds?.toString()
    // const  isOwnerAddress = '98732984798379837'
    const isOwnerAddress = conciseAddress(wacInfoData?.[0], 10, 10);

    const FONT_SIZE = 17;

    return (
        <Box
            sx={{
                height: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gridTemplateRows: isExplore
                    ? 'repeat(3, min-content) 1fr'
                    : 'min-content 1fr min-content',
                rowGap: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    borderRadius: '8px',
                    alignItems: 'center',
                    bgcolor: (theme) => theme.palette.primary.main,
                    p: 1,
                    '& p': {
                        fontSize: FONT_SIZE,
                    },
                }}
            >
                <Typography>Name:</Typography>

                <Typography
                    sx={{
                        ml: 2,
                    }}
                >
                    {' '}

                    {name || 'This Ape has no name'}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    borderRadius: '8px',
                    bgcolor: (theme) => theme.palette.primary.main,
                    p: 1,
                    overflow: 'auto',
                    '& p': {
                        fontSize: FONT_SIZE,
                    },
                }}
            >
                <Typography>Lore: </Typography>

                <Typography
                    sx={{
                        ml: 2,
                    }}
                >
                    {lore || 'This Ape has no lore'}
                </Typography>
            </Box>

            {isExplore && (
                <Box
                    sx={{
                        // display: 'flex',
                        borderRadius: '8px',
                        // alignItems: 'center',
                        // justifyContent: 'space-between',
                        bgcolor: (theme) => theme.palette.primary.main,
                        px: 1,
                        py: 0.5,
                        '& p': {
                            fontSize: FONT_SIZE,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            // borderRadius: '8px',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                            // justifyContent: 'space-between',
                            // bgcolor: (theme) => theme.palette.primary.main,
                            // p: 1,
                            '& p': {
                                fontSize: FONT_SIZE,
                            },
                        }}
                    >
                        <Typography>Owner:</Typography>

                        <Link
                            href={`https://cronoscan.com/address/${wacInfoData?.[0]}`}
                            target='_blank'
                            sx={{
                                textDecoration: 'none',
                                fontSize: FONT_SIZE,
                                color: '#fff',
                                ml: 2,
                                wordBreak: 'break-word',
                                '&:hover': {
                                    color: '#fff',
                                },
                            }}
                        >
                            {isOwnerAddress}
                        </Link>
                    </Box>
                </Box>
            )}

            {collectionName === COLLECTION_NAMES.lady && (
                <Box
                    sx={{
                        display: 'flex',
                        borderRadius: '8px',
                        justifyContent: 'space-between',
                        bgcolor: (theme) => theme.palette.primary.main,
                        p: 1,
                        overflow: 'auto',
                        '& p': {
                            fontSize: FONT_SIZE,
                        },
                    }}
                >
                    <Typography>Remaining babies: </Typography>

                    <Typography
                        sx={{
                            ml: 2,
                        }}
                    >
                        {numberOfBreeds}
                    </Typography>
                </Box>
            )}

            {collectionName === COLLECTION_NAMES.baby && (
                <Box
                    sx={{
                        display: 'flex',
                        borderRadius: '8px',
                        justifyContent: 'space-between',
                        bgcolor: (theme) => theme.palette.primary.main,
                        p: 1,
                        overflow: 'auto',
                        '& p': {
                            fontSize: FONT_SIZE,
                        },
                    }}
                >
                    <Typography>Birth Date </Typography>

                    <Typography
                        sx={{
                            ml: 2,
                        }}
                    >
                        {birthDate}
                    </Typography>
                </Box>
            )}

            {attributes && (
                <ContentTable
                    isObject={isObject}
                    attributes={attributes}
                    collectionName={collectionName}
                    owner={owner}
                    tokenId={tokenId}
                    isExplore={isExplore}
                    metatraits={selectedCard?.metatraits}
                />
            )}
        </Box>
    );
}

export default ModalContent;
