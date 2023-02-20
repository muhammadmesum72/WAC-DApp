

import React, { useEffect, useState } from 'react';

import {
    Table,
    Box,
    TableRow,
    TableCell,
    // tableCellClasses,
    // Link
} from '@mui/material';
import { styled } from '@mui/material/styles';

import traitCount from '@/assets/metadata/trait_count.json';
import ladyApesTraitsMetaData from '@/assets/metadata/Traits_Ladies.json';
// import { useQueryLadyBreedNumber } from '@/hooks/react-query/queries';
import { COLLECTION_NAMES } from '@/utils/constants';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: 'none',
    padding: '0px 8px',
    fontSize: '19px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
    },
}));

export default function ContentTable({
    isObject,
    attributes,
    collectionName,
    // owner,
    tokenId,
    // isExplore,
    metatraits,
}) {
    const [traitDetails, setTraitDetails] = useState('');
    // const { isLoading: isBreedAbleLoading, data: numberOfBreeds } =
    //  useQueryLadyBreedNumber({
    //      tokenId,
    //      collectionName,
    //  });

    useEffect(() => {
        let traitValues = attributes?.map(trait => {
            const { trait_type, value } = trait;

            // const occurrence =
            //    COLLECTION_NAMES.lady === collectionName
            //       ? ladyApesTraitsMetaData?.[trait_type]?.[value]
            //       : Math.floor(trait.occurrence * 100);

            let occurrence;

            switch (collectionName) {
            case COLLECTION_NAMES.lady: {
                occurrence = ladyApesTraitsMetaData?.[trait_type]?.[value];

                break;
            }

            case COLLECTION_NAMES.genesis: {
                //occurrence = Math.floor(trait?.occurrence || 0 * 100);
                const val = trait?.occurrence ?? 0;
                occurrence = (100*val).toFixed(2);
                break;
            }

            case COLLECTION_NAMES.baby: {
                occurrence = trait?.rarity?.toFixed(2);

                break;
            }

            // No default
            default:
                occurrence = 0;
            }

            return occurrence || '?';
        });

        if (COLLECTION_NAMES.lady === collectionName) {
            let traitProbability =
            ladyApesTraitsMetaData?.['Trait Probability'][tokenId];

            traitProbability = traitProbability
                ? (Number(traitProbability) * 100).toFixed(2)
                : '?';

            traitValues.push(traitProbability);
        } else if (COLLECTION_NAMES.baby === collectionName) {
            const newTraits = [];
            newTraits[0] = traitValues[1];
            newTraits[1] = traitValues[2];
            newTraits[2] = traitValues[6];
            newTraits[3] = traitValues[5];
            newTraits[4] = traitValues[3];
            newTraits[5] = traitValues[4];
            newTraits[6] = traitValues[7];
            newTraits[7] = traitValues[0];
            traitValues = [...newTraits];
        }

        setTraitDetails(traitValues);
    }, [attributes, collectionName, tokenId]);

    return (
        <Box
            sx={{
                height: '100%',
                py: 1,
                bgcolor: (theme) => theme.palette.primary.main,
                borderRadius: '8px',
                px: 1,
                overflow: 'auto',
                display: 'flex',

                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Table>
                <TableRow>
                    <StyledTableCell> Background:</StyledTableCell>

                    <StyledTableCell align='center'>
                        {' '}

                        {isObject?.Background}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {traitDetails[0] !== '?'
                            ? `${traitDetails[0]}%`
                            : traitDetails[0]}{' '}
                    </StyledTableCell>
                </TableRow>

                <TableRow>
                    <StyledTableCell> Body: </StyledTableCell>

                    <StyledTableCell align='center'>
                        {' '}

                        {isObject?.Body}{' '}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {' '}

                        {traitDetails[1] !== '?'
                            ? `${traitDetails[1]}%`
                            : traitDetails[1]}{' '}
                    </StyledTableCell>
                </TableRow>

                <TableRow>
                    <StyledTableCell> Body accessory: </StyledTableCell>

                    <StyledTableCell align='center'>
                        {' '}

                        {isObject['Body accessory']}{' '}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {traitDetails[2] !== '?'
                            ? `${traitDetails[2]}%`
                            : traitDetails[2]}{' '}
                    </StyledTableCell>
                </TableRow>

                <TableRow>
                    <StyledTableCell> Mouth: </StyledTableCell>

                    <StyledTableCell align='center'>
                        {isObject.Mouth}{' '}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {' '}

                        {traitDetails[3] !== '?'
                            ? `${traitDetails[3]}%`
                            : traitDetails[3]}
                    </StyledTableCell>
                </TableRow>

                <TableRow>
                    <StyledTableCell>Eyes:</StyledTableCell>

                    <StyledTableCell align='center'>
                        {' '}

                        {isObject?.Eyes}{' '}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {traitDetails[4] !== '?'
                            ? `${traitDetails[4]}%`
                            : traitDetails[4]}
                    </StyledTableCell>
                </TableRow>

                <TableRow>
                    <StyledTableCell> Head accessory: </StyledTableCell>

                    <StyledTableCell align='center'>
                        {' '}
                        {isObject['Head accessory']}{' '}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {' '}

                        {traitDetails[5] !== '?'
                            ? `${traitDetails[5]}%`
                            : traitDetails[5]}{' '}
                    </StyledTableCell>
                </TableRow>

                <TableRow>
                    <StyledTableCell> Face accessory:</StyledTableCell>

                    <StyledTableCell align='center'>
                        {' '}

                        {isObject['Face accessory']}{' '}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {' '}

                        {traitDetails[6] !== '?'
                            ? `${traitDetails[6]}%`
                            : traitDetails[6]}{' '}
                    </StyledTableCell>
                </TableRow>

                <TableRow>
                    <StyledTableCell> Sex: </StyledTableCell>

                    <StyledTableCell align='center'>
                        {isObject?.Sex}{' '}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {' '}

                        {traitDetails[7] !== '?'
                            ? `${traitDetails[7]}%`
                            : traitDetails[7]}{' '}
                    </StyledTableCell>
                </TableRow>

                {COLLECTION_NAMES.baby === collectionName && (
                    <TableRow>
                        <StyledTableCell>Mutations Count:</StyledTableCell>

                        <StyledTableCell align='center'>
                            {metatraits?.[0]?.value}{' '}
                        </StyledTableCell>

                        <StyledTableCell
                            align='right'
                            sx={{
                                color: 'yellow',
                            }}
                        >
                            {' '}

                            {metatraits?.[0]?.rarity?.toFixed(2)} %
                        </StyledTableCell>
                    </TableRow>
                )}

                <TableRow>
                    <StyledTableCell> Traits Count: </StyledTableCell>

                    <StyledTableCell align='center'>
                        {COLLECTION_NAMES.lady === collectionName &&
                     traitCount?.[tokenId]}

                        {COLLECTION_NAMES.genesis === collectionName &&
                     isObject['Trait Count']}

                        {COLLECTION_NAMES.baby === collectionName &&
                     metatraits?.[1]?.value}{' '}
                    </StyledTableCell>

                    <StyledTableCell
                        align='right'
                        sx={{
                            color: 'yellow',
                        }}
                    >
                        {' '}

                        {/* {traitDetails[8] === undefined
                     ? '?'
                     : `${traitDetails[8]}%`}{' '} */}

                        {COLLECTION_NAMES.baby !== collectionName &&
                     (traitDetails[8] === undefined
                         ? '?'
                         : `${traitDetails[8]}`)}

                        {COLLECTION_NAMES.baby === collectionName &&
                     metatraits?.[1]?.rarity?.toFixed(2)}{' '}
                  %
                    </StyledTableCell>
                </TableRow>

                {/* {collectionName === COLLECTION_NAMES.lady && isExplore && (
               <TableRow sx={{ display:'none' }}>
                  <StyledTableCell>Remaining babies:</StyledTableCell>

                  <StyledTableCell align='center'>
                     <Link
                        href={`https://cronoscan.com/address/${owner}`}
                        target='_blank'
                        sx={{
                           textDecoration: 'none',
                           // fontSize: FONT_SIZE,
                           color: '#fff',

                           ml: 2,
                           wordBreak: 'break-word',
                           '&:hover': {
                              color: '#fff',
                           },
                        }}
                     >
                        {isBreedAbleLoading && 'Loading...'}

                        {numberOfBreeds}
                     </Link>
                  </StyledTableCell>

                  <StyledTableCell
                     align='right'
                     sx={{
                        color: 'yellow',
                     }}
                  >
                     ?
                  </StyledTableCell>
               </TableRow>
            )} */}
            </Table>
        </Box>
    );
}
