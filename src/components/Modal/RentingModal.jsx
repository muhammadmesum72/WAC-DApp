


import React, { useEffect, useState } from 'react';

import { Button, ButtonGroup, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectGenesisBackground,
    selectLadyBackground,
    // yellowCan,
    YellowCoin
} from '@/assets';
import { conciseAddress } from '@/helpers/utilities';
import { /* useQueryBalance, */ useQueryIsOwner } from '@/hooks/react-query';
import { getWacPrice } from '@/hooks/react-query/helper';
import {
    // useQueryBurnRate,
    useQueryLadyBreedNumber
} from '@/hooks/react-query/queries';
import { useQueryGetUserAssetsData } from '@/hooks/react-query/queries/myWapes-query';
import {
    isUserFunction,
    numberOfBabies,
    selectRentingCard
} from '@/redux/slice/renting';
import { COLLECTION_NAMES } from '@/utils/constants';

import RentingModalCard from '../card/RentingModalCard';
import MButton from '../MButton';
import Scrollbar from '../Scrollbar';

// const FontSizePrimary = 19;
const FontSizeSecondary = 20;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 750,
    width: '95%',
    bgcolor: (theme) => theme.palette.secondary.dark,
    boxShadow: 24,
    py: {
        xs: 3,
        md: 2,
    },
    px: {
        xs: 2,
        sm: 3,
        md: 5,
    },
    maxHeight: {
        xs: '85vh',
        md: '98vh',
    },

    overflow: 'auto',
    borderRadius: '25px',
    textAlign: 'center',
};

export default function RentingModal({
    handleClose,
    open,
    handleProceed,
    isLoadingProceed,
}) {
    const dispatch = useDispatch();
    // const { isLoading: isLoadingBalance, data: balance } = useQueryBalance();
    const { data: getBalanceDetails } = useQueryGetUserAssetsData();

    let tokenBalance = getBalanceDetails?.userNFTsDetails?.[0];

    tokenBalance = Math.floor(tokenBalance / 10 ** 18);

    const selectedCard = useSelector(
        (state) => state.rentingSlice.isSelectRentingCard1
    );

    const selectedRenting = useSelector(
        (state) => state.rentingSlice.isSelectRentingCard2
    );

    const data = {
        tokenId: selectedCard?.id,
        collectionName: selectedCard?.collectionName,
    };

    const { data: numberOfBreeds } = useQueryLadyBreedNumber({
        tokenId: selectedRenting?.id,
        collectionName: selectedRenting?.collectionName,
    });

    const { /* isLoading: isOwnerLoading, */ data: owner } = useQueryIsOwner(data);

    const [isRent, setIsRent] = useState(false);

    const [isOwnerAddress, setIsOwnerAddress] = useState(owner);

    useEffect(() => {
        async function setAddress() {
            await setIsOwnerAddress(conciseAddress(owner));
        }

        setAddress();
    }, [owner]);

    const handleOnRent = () => {
        setIsRent(false);
        // ;
    };

    const handleChange = () => {
        handleClose();
        setIsRent(false);
        dispatch(selectRentingCard('modal'));
    };

    const {
        isUser: isMine,
        numOfBabies,
        //  isSelectRentingCard,
    } = useSelector((state) => state.rentingSlice);

    const isGenesis = selectedCard.collectionName === COLLECTION_NAMES.genesis;
    const isLady = selectedCard.collectionName === COLLECTION_NAMES.lady;
    let price = 0;

    if (isGenesis) price = selectedCard?.price;
    else if (isLady) price = selectedCard?.babyPrices;

    price = isLady ? price?.filter((newPrice) => newPrice !== '0') : price;

    const breadAbleBabies = isGenesis
        ? selectedRenting?.babyPrices?.filter((newPrice) => newPrice !== '0')
        : selectedRenting?.price;

    const getPriceSum = () => {
        let wacPrice = 0;

        if (isGenesis) {
            wacPrice = getWacPrice(
                numOfBabies,
                selectedCard?.price,
                selectedRenting?.babyPrices
            );
        } else if (isLady) {
            wacPrice = getWacPrice(numOfBabies, price, breadAbleBabies, isLady);
        }

        return wacPrice;
    };

    // const disableBabyButton = (second) => { third }

    return (
        <Box>
            <Modal
                open={open}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            height: 70,
                            alignItems: 'center',
                        }}
                    >
                        <MButton
                            onClick={() => {
                                handleClose();
                                dispatch(selectRentingCard('page'));
                            }}
                            title='Close'
                            sx={{
                                width: 120,
                                mr: 5,
                                fontSize: 18,
                            }}
                        />
                    </Box>

                    <Box sx={style}>
                        <Scrollbar>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(1,1fr)',
                                        sm: 'repeat(2, 1fr)',
                                    },
                                    columnGap: 4,
                                    rowGap: {
                                        xs: 4,
                                        sm: 0,
                                    },
                                }}
                            >
                                {!isRent && (
                                    <Box
                                        sx={{
                                            gridColumn: {
                                                xs: '1/2',
                                                sm: '1/ 3',
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 26,
                                                pb: 1,
                                            }}
                                        >
                                            {selectedRenting !== null
                                                ? 'Select the number of Babies'
                                                : 'Select a Wape for breeding'}
                                        </Typography>

                                        {selectedRenting !== null && !isRent && (
                                            <Box
                                                sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns: {
                                                        xs: 'repeat(1,1fr)',
                                                        sm: 'repeat(3, 1fr)',
                                                    },
                                                    columnGap: 2,
                                                    rowGap: {
                                                        xs: 2,
                                                        md: 0,
                                                    },
                                                    px: {
                                                        xs: 0,
                                                        md: 3.2,
                                                    },
                                                    mb: 2,
                                                }}
                                            >
                                                <ButtonGroup
                                                    variant='contained'
                                                    aria-label='outlined primary button group'
                                                    sx={{
                                                        maxWidth: 270,
                                                        width: '100%',
                                                        justifySelf: 'center',
                                                        background:
                                             'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',

                                                        '& button': {
                                                            // background: 'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                                                            color: '#fff',
                                                            fontSize: 24,

                                                            lineHeight: '34px',
                                                            letterSpacing: '0.08em',
                                                            '&:hover': {
                                                                background: 'orange',
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {[1, 2, 3].map((value, idx) => (
                                                        <Button
                                                            key={value}
                                                            disabled={
                                                                isLady
                                                                    ? price?.length <= idx
                                                                    : breadAbleBabies?.length <=
                                                        idx ||
                                                     (isMine &&
                                                        numberOfBreeds <
                                                           idx + 1)
                                                            }
                                                            onClick={() =>
                                                                dispatch(numberOfBabies(value))
                                                            }
                                                            sx={{
                                                                background:
                                                   numOfBabies === value
                                                       ? 'rgb(250,134,0)'
                                                       : 'primary',

                                                                width: '100%',
                                                            }}
                                                        >
                                                            {value}
                                                        </Button>
                                                    ))}
                                                </ButtonGroup>

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: 1,
                                                        alignItems: 'center',
                                                        background: (theme) =>
                                                            theme.palette.primary.main,
                                                        borderRadius: '12px',
                                                        boxShadow:
                                             'inset 0px 8px 4px rgba(255, 255, 255, 0.35)',
                                                        width: 'max-content',
                                                        px: {
                                                            xs: 2,
                                                            md: 1,
                                                        },
                                                        mx: 'auto',
                                                        py: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: FontSizeSecondary + 2,
                                                        }}
                                                    >
                                          Cost:
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: FontSizeSecondary + 2,
                                                        }}
                                                    >
                                                        {getPriceSum().toFixed(0)}
                                                    </Typography>

                                                    <Box
                                                        component='img'
                                                        src={YellowCoin}
                                                    />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: 1,
                                                        alignItems: 'center',
                                                        background: (theme) =>
                                                            theme.palette.primary.main,
                                                        borderRadius: '12px',
                                                        boxShadow:
                                             'inset 0px 8px 4px rgba(255, 255, 255, 0.35)',
                                                        width: 'max-content',
                                                        px: {
                                                            xs: 2,
                                                            md: 1,
                                                        },
                                                        mx: 'auto',
                                                        py: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: FontSizeSecondary,
                                                        }}
                                                    >
                                          Balance:
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: FontSizeSecondary,
                                                        }}
                                                    >
                                                        {tokenBalance}
                                                    </Typography>

                                                    <Box
                                                        component='img'
                                                        src={YellowCoin}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                )}

                                <Box
                                    sx={{
                                        pt: selectedRenting !== null ? 0 : 7.5,
                                    }}
                                >
                                    <RentingModalCard
                                        data={{
                                            rank: selectedCard?.rank,
                                            name: selectedCard?.name,
                                            selectImg: selectedCard?.img?.small,
                                        }}
                                        isRenting
                                    />

                                    {/* start */}

                                    <Box>
                                        {/* {!isMine && (
                                 <Typography
                                    sx={{
                                       mr: 1.5,
                                       fontSize: FontSizePrimary,
                                       mt: 1,
                                    }}
                                 >
                                    Price for each Baby
                                 </Typography>
                              )} */}

                                        {isLady ? (
                                            price?.map((price, idx) => (
                                                <Box
                                                    key={price}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: 2,
                                                        alignItems: 'center',
                                                        mt: 0.6,
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: FontSizeSecondary,

                                                            // minWidth:
                                                            //  price?.length !== 2 && 120,
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        {/* {price?.length !== 2 && ( */}

                                                        <Typography
                                                            component='span'
                                                            sx={{
                                                                mr: 1.5,
                                                                fontSize: FontSizeSecondary,
                                                            }}
                                                        >
                                             #{idx + 1}
                                                        </Typography>

                                                        {/* )} */}

                                                        {Number(price).toFixed(0)}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: FontSizeSecondary,
                                                        }}
                                                    >
                                          WAC
                                                    </Typography>

                                                    <Box
                                                        component='img'
                                                        src={YellowCoin}
                                                    />
                                                </Box>
                                            ))
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    gap: 2,
                                                    alignItems: 'center',
                                                    mt: 0.6,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: FontSizeSecondary,
                                                        // minWidth: 120,
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {Number(selectedCard?.price).toFixed(0)}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: FontSizeSecondary,
                                                    }}
                                                >
                                       WAC
                                                </Typography>

                                                <Box
                                                    component='img'
                                                    src={YellowCoin}
                                                />
                                            </Box>
                                        )}
                                    </Box>

                                    {/* end */}
                                </Box>

                                {isRent && (
                                    <Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                rowGap: 5,
                                                alignItems: 'center',
                                                height: '100%',
                                                justifyContent: 'space-between',
                                                pt: {
                                                    xs: 5,
                                                    sm: 0,
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    width: '100%',

                                                    background: (theme) =>
                                                        theme.palette.primary.main,
                                                    borderRadius: '12px',
                                                }}
                                            >
                                                {' '}

                                    Owner: <br />

                                                <Link
                                                    href={`https://cronoscan.com/address/${owner}`}
                                                    target='_blank'
                                                    sx={{
                                                        textDecoration: 'none',
                                                        fontSize: 16,
                                                        color: '#fff',
                                                        wordBreak: 'break-word',
                                                        '&:hover': {
                                                            color: '#fff',
                                                        },
                                                    }}
                                                >
                                                    {isOwnerAddress}
                                                </Link>
                                            </Typography>

                                            <Box
                                                sx={{
                                                    background: (theme) =>
                                                        theme.palette.primary.main,
                                                    borderRadius: '12px',
                                                    p: 1.5,
                                                    width: '100%',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
                                                    }}
                                                >
                                       Price for each baby:
                                                </Typography>

                                                {selectedCard?.collectionName ===
                                       COLLECTION_NAMES.lady &&
                                       price?.map((price, idx) => (
                                           <Box
                                               key={price}
                                               sx={{
                                                   display: 'flex',
                                                   justifyContent: 'center',
                                                   gap: 2,
                                                   alignItems: 'center',
                                                   mt: 1,
                                               }}
                                           >
                                               <Typography
                                                   sx={{
                                                       fontSize: 30,
                                                       minWidth: 120,
                                                       textAlign: 'center',
                                                   }}
                                               >
                                                   <Typography
                                                       component='span'
                                                       sx={{
                                                           mr: 1.5,
                                                           fontSize: 30,
                                                       }}
                                                   >
                                                   #{idx + 1}
                                                   </Typography>

                                                   {Number(price).toFixed(0)}
                                               </Typography>

                                               <Typography
                                                   sx={{
                                                       fontSize: 30,
                                                   }}
                                               >
                                                WAC
                                               </Typography>

                                               <Box
                                                   component='img'
                                                   src={YellowCoin}
                                               />
                                           </Box>
                                       ))}

                                                {selectedCard?.collectionName ===
                                       COLLECTION_NAMES.genesis && (
                                                    <Box
                                                        key={price}
                                                        sx={{
                                                            display: 'flex',
                                                            // justifyContent:
                                                            //  selectedCard.collectionName ===
                                                            //    COLLECTION_NAMES.lady
                                                            //    ? 'space-between'
                                                            //    : 'space-evenly',
                                                            gap: 2,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            mt: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: 30,
                                                            }}
                                                        >
                                                            {Number(price).toFixed(0)}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontSize: 30,
                                                            }}
                                                        >
                                             WAC
                                                        </Typography>

                                                        <Box
                                                            component='img'
                                                            src={YellowCoin}
                                                        />
                                                    </Box>
                                                )}

                                                {/* {selectedCard.collectionName ===
                                    COLLECTION_NAMES.lady && (
                                    <Box>
                                       <Box
                                          sx={{
                                             display: 'flex',
                                             justifyContent: 'space-between',
                                             alignItems: 'center',
                                             mt: 1,
                                          }}
                                       >
                                          <Typography
                                             sx={{
                                                fontSize: 30,
                                             }}
                                          >
                                             <Typography
                                                component='span'
                                                sx={{
                                                   mr: 1.5,
                                                   fontSize: 30,
                                                }}
                                             >
                                                #2
                                             </Typography>
                                             400
                                          </Typography>

                                          <Typography
                                             sx={{
                                                fontSize: 30,
                                             }}
                                          >
                                             WAC
                                          </Typography>

                                          <Box
                                             component='img'
                                             src={YellowCoin}
                                          />
                                       </Box>

                                       <Box
                                          sx={{
                                             display: 'flex',
                                             justifyContent: 'space-between',
                                             alignItems: 'center',
                                             mt: 1,
                                          }}
                                       >
                                          <Typography
                                             sx={{
                                                fontSize: 30,
                                             }}
                                          >
                                             <Typography
                                                component='span'
                                                sx={{
                                                   mr: 1.5,
                                                   fontSize: 30,
                                                }}
                                             >
                                                #3
                                             </Typography>
                                             400
                                          </Typography>

                                          <Typography
                                             sx={{
                                                fontSize: 30,
                                             }}
                                          >
                                             WAC
                                          </Typography>

                                          <Box
                                             component='img'
                                             src={YellowCoin}
                                          />
                                       </Box>
                                    </Box>
                                 )} */}
                                            </Box>

                                            <MButton
                                                title='Rent'
                                                onClick={handleOnRent}
                                                sx={{
                                                    width: 'fit-content',
                                                    height: 'fit-content',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                )}

                                {!isRent && (
                                    <Box
                                        sx={{
                                            cursor: 'pointer',
                                            // pt: selectedRenting === null ? 0 : 7.5,
                                        }}
                                    >
                                        {selectedRenting === null && (
                                            <>
                                                <ButtonGroup
                                                    variant='contained'
                                                    aria-label='outlined primary button group'
                                                    sx={{
                                                        background:
                                             'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                                                        mb: 2,
                                                        '& button': {
                                                            // background: 'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                                                            color: '#fff',
                                                            fontSize: 18,
                                                            minWidth: 'max-content',
                                                            letterSpacing: '0.08em',
                                                            '&:hover': {
                                                                background: 'orange',
                                                            },
                                                        },
                                                        '& .MuiButtonGroup-grouped': {
                                                            minWidth: 'max-content',
                                                        },
                                                        // width:'100%'
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            dispatch(isUserFunction(true))
                                                        }
                                                        sx={{
                                                            background: isMine
                                                                ? 'rgb(250,134,0)'
                                                                : 'primary',
                                                        }}
                                                    >
                                          My Wapes
                                                    </Button>

                                                    <Button
                                                        onClick={() =>
                                                            dispatch(isUserFunction(false))
                                                        }
                                                        sx={{
                                                            background: !isMine
                                                                ? 'rgb(250,134,0)'
                                                                : 'primary',
                                                        }}
                                                    >
                                          Borrow a Wape
                                                    </Button>
                                                </ButtonGroup>

                                                <RentingModalCard
                                                    handleChange={handleChange}
                                                    data={{
                                                        rank: '?',
                                                        selectImg:
                                             selectedCard.collectionName ===
                                             COLLECTION_NAMES.genesis
                                                 ? selectLadyBackground
                                                 : selectGenesisBackground,
                                                        name: '?',
                                                    }}
                                                />
                                            </>
                                        )}

                                        {selectedRenting !== null && (
                                            <Box>
                                                <RentingModalCard
                                                    data={{
                                                        rank: selectedRenting?.rank,
                                                        name: selectedRenting?.name,
                                                        selectImg:
                                             selectedRenting?.img?.small,
                                                    }}
                                                />

                                                {/* {!isMine && (
                                       <Typography
                                          sx={{
                                             fontSize: FontSizePrimary,
                                             mt: 1,
                                          }}
                                       >
                                          Price for each Baby
                                       </Typography>
                                    )} */}

                                                {selectedRenting?.collectionName ===
                                    COLLECTION_NAMES.lady ? (
                                                        breadAbleBabies?.map((price, idx) => (
                                                            <Box
                                                                key={price}
                                                                sx={{
                                                                    display: 'flex',
                                                                    // justifyContent: 'space-evenly',
                                                                    justifyContent: 'center',
                                                                    gap: 2,
                                                                    alignItems: 'center',
                                                                    mt: 0.6,
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: FontSizeSecondary,
                                                                        // minWidth:
                                                                        //  breadAbleBabies?.length !==
                                                                        //  1 && 120,
                                                                        textAlign: 'center',
                                                                    }}
                                                                >
                                                                    {breadAbleBabies?.length !==
                                                   1 && (
                                                                        <Typography
                                                                            component='span'
                                                                            sx={{
                                                                                mr: 1.5,
                                                                                fontSize:
                                                            FontSizeSecondary,
                                                                            }}
                                                                        >
                                                      #{idx + 1}
                                                                        </Typography>
                                                                    )}

                                                                    {Number(price).toFixed(0)}
                                                                </Typography>

                                                                <Typography
                                                                    sx={{
                                                                        fontSize: FontSizeSecondary,
                                                                    }}
                                                                >
                                                WAC
                                                                </Typography>

                                                                <Box
                                                                    component='img'
                                                                    src={YellowCoin}
                                                                />
                                                            </Box>
                                                        ))
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                gap: 2,
                                                                alignItems: 'center',
                                                                mt: 0.6,
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: FontSizeSecondary,
                                                                    // minWidth: 120,
                                                                    textAlign: 'left',
                                                                }}
                                                            >
                                                                {!isMine &&
                                                Number(
                                                    selectedRenting?.price
                                                ).toFixed(0)}
                                                            </Typography>

                                                            <Typography
                                                                sx={{
                                                                    fontSize: FontSizeSecondary,
                                                                }}
                                                            >
                                                                {!isMine && 'WAC'}
                                                            </Typography>

                                                            {!isMine && (
                                                                <Box
                                                                    component='img'
                                                                    src={YellowCoin}
                                                                />
                                                            )}
                                                        </Box>
                                                    )}
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Box>

                            {selectedRenting !== null && (
                                <MButton
                                    loading={isLoadingProceed}
                                    title='PROCEED'
                                    onClick={() =>
                                        handleProceed(
                                            selectedCard,
                                            selectedRenting,
                                            numOfBabies,
                                            isMine
                                        )
                                    }
                                    sx={{
                                        gridColumn: '1/4',
                                        mt: 1.5,
                                    }}
                                />
                            )}
                        </Scrollbar>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
