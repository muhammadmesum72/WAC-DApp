


import React, { useEffect, useState } from 'react';

import { Box, /* InputBase, */ Typography, Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';
// import { styled } from '@mui/material/styles';

import {  wacCoin, YellowCoin } from '@/assets';
// import { useMutationMaleRenting } from '@/hooks/react-query/queries';

import { useQueriesOldPrice } from '@/hooks/react-query';
import { useMutationRenting } from '@/hooks/react-query/mutations';
import { useQueryBurnRate, useQueryLadyBreedNumber } from '@/hooks/react-query/queries';

import RentingModalCard from '../card/RentingModalCard';
import LadyBabyPrice, { BootstrapInput } from '../LadyBabyPrice';
import MButton from '../MButton';
// import Scrollbar from '../Scrollbar';
// import { useQueryMaleRenting } from '@/hooks/react-query/queries';

const NUMBER_OF_BABIES = ['1', '2', '3'];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: (theme) => theme.palette.secondary.dark,
    boxShadow: 24,
    py: 3,
    px: 3,
    height: {
        xs: '85vh',
        sm: 'auto',
    },
    overflow: 'auto',
    borderRadius: '25px',
    textAlign: 'center',
};

export default function PayRent({
    handleChange,
    handleClose,
    open,
    selectedCard,
    isGenesis,
    isChangePrice,
    isLady,
    isApprovedAllLoading,
    // setChangePriceLoading,
    // changePriceLoading,
}) {
    // const {  } = selectedCard;
    const tokenId = selectedCard?.id;
    const isStaked = selectedCard?.isStaked;
    const data = {
        tokenId: selectedCard?.id,
        collectionName: selectedCard?.collectionName,
    };
    // const isGenesis = COLLECTION_NAMES.genesis === selectedCard?.collectionName;
    // const isLady = COLLECTION_NAMES.lady === selectedCard?.collectionName;
    // const {  data } = useQueryMaleRenting(tokenId);
    const onSuccess = () => {
        handleClose();
    };

    const options = {
        onSuccess,
    };

    const {
        isLoading: isRentLoading,
        mutate: payRent,
        data: rentingData,
    } = useMutationRenting(data, options);

    const { isLoading: isOldPriceLoading, data: oldBalancePrice } =
    useQueriesOldPrice(data);

    const { isLoading: isBreedAbleLoading, data: numberOfBreeds } =
    useQueryLadyBreedNumber(data);

    const { data: burnRate } = useQueryBurnRate();

    //  If the price is A and BurnRate is b 
    // A: You receive: (1-b)A/100; Burned: bA/100

    const [maleInputValue, setMaleInputValue] = useState(oldBalancePrice);
    const [femaleInput1, setFemaleInput1] = useState(oldBalancePrice?.[0]);
    const [femaleInput2, setFemaleInput2] = useState(oldBalancePrice?.[1]);
    const [femaleInput3, setFemaleInput3] = useState(oldBalancePrice?.[2]);
    const [numberOfBabies, setNumberOfBabies] = useState();
    // const [ladiesBurnRate, setLadiesBurnRate] = useState(0);

    // let youRecevieBurned
    const getYouReceive = (price, wacBurnRate) => {
        const A = Number(price) || 0;
        const B = Number(wacBurnRate);

        const youReceive = (100 - B) * A / 100;

        return youReceive.toFixed(0);
    };

    const getBurnRate = (price, wacBurnRate) => {
        const A = Number(price) || 0;
        const B = Number(wacBurnRate);
        // wacBurnRate * total
        // const youReceive = (1 - B) * A / 100;
        const Burned = B * A / 100;

        return Burned.toFixed(0);
    };

    const sumOfAllBurnRate = () => {
        const value1 = getBurnRate(femaleInput1, burnRate);
        const value2 = getBurnRate(femaleInput2, burnRate);
        const value3 = getBurnRate(femaleInput3, burnRate);
        const totalValue = Number(value1) + Number(value2) + Number(value3);
        return totalValue.toFixed(0);
    };

    const sumOfAllYouReceive = () => {
        const value1 = getYouReceive(femaleInput1, burnRate);
        const value2 = getYouReceive(femaleInput2, burnRate);
        const value3 = getYouReceive(femaleInput3, burnRate);
        const totalValue = Number(value1) + Number(value2) + Number(value3);
        return totalValue.toFixed(0);
    };
    // useEffect(()=>{

    // },[])

    const SHOW_NUMBER_OF_INPUTS = [
        {
            num: '1',
            setFemaleInput: setFemaleInput1,
            femaleInput: femaleInput1,
        },
        {
            num: '2',
            setFemaleInput: setFemaleInput2,
            femaleInput: femaleInput2,
        },
        {
            num: '3',
            setFemaleInput: setFemaleInput3,
            femaleInput: femaleInput3,
        }
    ];

    useEffect(() => {
        if (oldBalancePrice) {
            setMaleInputValue(((oldBalancePrice ?? 0)/10**18).toFixed(0));
            setFemaleInput1(((oldBalancePrice?.[0] ?? 0)/10**18).toFixed(0));
            setFemaleInput2(((oldBalancePrice?.[1] ?? 0)/10**18).toFixed(0));
            setFemaleInput3(((oldBalancePrice?.[2] ?? 0)/10**18).toFixed(0));
        }
    }, [oldBalancePrice]);

    const [isNumber, setIsNumber] = useState(false);
    const handleFemale = async () => {
        await payRent({
            isLady,
            tokenId,
            femaleInput1,
            femaleInput2,
            femaleInput3,
            isChangePrice,
            isStaked,
        });
    };

    const handleSubmit = () => {
        setIsNumber(true);
    };
    const handleMale = async () => {
    // await refetch();
    // setChangePriceLoading(isRentLoading)

        await payRent({
            isGenesis,
            tokenId,
            price: maleInputValue,
            isChangePrice,
            isStaked,
        });
    };

    const handleUserValue = (num) => {
        setNumberOfBabies(num);
    };

    // isNumber ? handleFemale : handleSubmit
    const handleLadiesFunction = () => {
    // if (isNumber || isChangePrice) {
        if (isNumber) {
            handleFemale();
        } else {
            handleSubmit();
        }
    };

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box>
                    {/* table header for close btn */}

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
                                setIsNumber(false);
                            }}
                            title='Close'
                            sx={{
                                width: 120,
                                mr: 5,
                                fontSize: 18,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            ...style, width: {
                                xs: '90%',
                                md: isLady ? (!isNumber ? 600 : 800) : 600,
                            },
                        }}
                    >
                        {/* table Body */}

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(1, 1fr)',
                                    md: isLady ? (!isNumber ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)') : 'repeat(2, 1fr)',
                                },
                                gap: 2,
                            }}
                        >
                            <Box>
                                <RentingModalCard
                                    handleChange={handleChange}
                                    data={{
                                        rank: selectedCard?.rank,
                                        selectImg: selectedCard?.img?.medium,
                                        name: selectedCard?.name,
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    alignSelf: 'center',
                                    gridColumn: {
                                        md: !isNumber ? '2/3' : '2/4',
                                    },
                                    width: 'fit-content',
                                    mx: 'auto',
                                }}
                            >
                                {isLady && (
                                    <Box>
                                        <Box
                                            sx={{
                                                bgcolor: (theme) =>
                                                    theme.palette.primary.main,
                                                borderRadius: '14px',
                                                p: 2,
                                                mb: 3,
                                                width: '100%',

                                            }}
                                        >
                                            {!isNumber && (
                                                <Box>
                                                    {/* {isChangePrice && (
                            <> */}

                                                    <Typography
                                                        sx={{
                                                            fontSize: 24,
                                                            mb: 2,
                                                            color: '#fff',
                                                            fontWeight: 'bold',
                                                            textAlign: 'center',
                                                            // fontFamily: "Inter",
                                                        }}
                                                    >
                            Births during <br /> renting
                            time:
                                                    </Typography>

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
                                                                letterSpacing: '0.08em',
                                                                '&:hover': {
                                                                    background: 'orange',
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        {NUMBER_OF_BABIES.map(
                                                            (items, idx) =>
                                                            // if (
                                                            //   idx < numberOfBreeds
                                                            // ) {
                                                                (
                                                                    <Button
                                                                        disabled={(idx + 1) > numberOfBreeds}
                                                                        key={items}
                                                                        onClick={() =>
                                                                            handleUserValue(
                                                                                idx + 1
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            background:
                                      idx + 1 ===
                                        Number(
                                            numberOfBabies
                                        )
                                          ? 'rgb(250,134,0)'
                                          : 'primary',

                                                                            // width: '100%',
                                                                        }}
                                                                    >
                                                                        {items}
                                                                    </Button>
                                                                )
                                                            // }

                                                            // return null;

                                                        )}
                                                    </ButtonGroup>

                                                    {/* </>
                          )} */}

                                                    {/* {isChangePrice && (
                            <div>
                              <Typography
                                 sx={{
                                  fontSize: 24,
                                  mb: 2,
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  // fontFamily: "Inter",
                                }}
                              >
                                Change Price
                              </Typography>

                              <LadyBabyPrice
                                 defaultValue='0'
                                 num='1'
                                // oldPrice={oldBalancePrice}
                                 setFemaleInput={setFemaleInput1}
                                 femaleInput={femaleInput1}
                              />

                              <LadyBabyPrice
                                 defaultValue='0'
                                 num='2'
                                 setFemaleInput={setFemaleInput2}
                                 femaleInput={femaleInput2}
                              />

                              <LadyBabyPrice
                                 defaultValue='0'
                                 num='3'
                                 setFemaleInput={setFemaleInput3}
                                 femaleInput={femaleInput3}
                              />
                            </div>
                          )} */}

                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: 2,
                                                        }}
                                                    >
                                                        {
                                                            //    <BootstrapInput
                                                            //   type='number'
                                                            //   max='1'
                                                            //   onChange={(e) => setNumberOfBabies(Number(e.target.value))}
                                                            //   id='bootstrap-input'
                                                            //    //   defaultValue=''
                                                            //   sx={{
                                                            //        width: '50px',
                                                            //        height: '40px',
                                                            //    }}
                                                            // />
                                                        }

                                                        {/* {!isChangePrice && (
                              <Typography
                                 sx={{
                                  fontSize: 24,
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                }}
                              >
                                Babies
                              </Typography>
                            )} */}
                                                    </Box>
                                                </Box>
                                            )}

                                            {isNumber && (
                                                <Box
                                                    sx={{
                                                        display: 'grid', justifyContent: 'center',
                                                        gridTemplateColumns: {
                                                            xs: 'repeat(1, 1fr)', sm: 'repeat(3, max-content)',
                                                        },
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 18,
                                                                mb: 2,
                                                                color: '#fff',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                // fontFamily: "Inter",
                                                            }}
                                                        >
                              Price for each Baby:
                                                        </Typography>

                                                        {SHOW_NUMBER_OF_INPUTS.map(
                                                            (itemsInputs, idx) => {
                                                                if (idx < numberOfBabies) {
                                                                    return (
                                                                        <LadyBabyPrice
                                                                            key={`lady__baby__${idx}`}
                                                                            // defaultValue='0'
                                                                            num={itemsInputs.num}
                                                                            setFemaleInput={
                                                                                itemsInputs.setFemaleInput
                                                                            }
                                                                            femaleInput={
                                                                                itemsInputs.femaleInput
                                                                            }
                                                                        />
                                                                    );
                                                                }

                                                                return null;
                                                            }
                                                        )}
                                                    </Box>

                                                    {/* second */}

                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 18,
                                                                mb: 2,
                                                                color: '#fff',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                // fontFamily: "Inter",
                                                            }}
                                                        >
                              You Receive:
                                                        </Typography>

                                                        {burnRate && SHOW_NUMBER_OF_INPUTS.map(
                                                            (itemsInputs, idx) => {
                                                                if (idx < numberOfBabies) {

                                                                    return (
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 24, lineHeight: '40px', mt: 1,
                                                                            }}

                                                                        >{getYouReceive(itemsInputs?.femaleInput, burnRate)}</Typography>
                                                                    );
                                                                }

                                                                return null;
                                                            }
                                                        )}

                                                    </Box>

                                                    {/* no Three */}

                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 18,
                                                                mb: 2,
                                                                color: '#fff',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                // fontFamily: "Inter",
                                                            }}
                                                        >
                              Burned:
                                                        </Typography>

                                                        {burnRate && SHOW_NUMBER_OF_INPUTS.map(
                                                            (itemsInputs, idx) => {
                                                                if (idx < numberOfBabies) {
                                                                    return (
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 24, lineHeight: '40px', mt: 1,
                                                                            }}
                                                                        >{getBurnRate(itemsInputs?.femaleInput, burnRate)}</Typography>
                                                                    );
                                                                }

                                                                return null;
                                                            }
                                                        )}

                                                    </Box>

                                                </Box>
                                            )}

                                        </Box>

                                        {(numberOfBabies !== 1 && isNumber) && (
                                            <Box
                                                sx={{
                                                    bgcolor: (theme) =>
                                                        theme.palette.primary.main,
                                                    borderRadius: 2,
                                                    p: 2,
                                                    mb: 3,
                                                    display: 'grid', justifyContent: 'center',
                                                    gridTemplateColumns: {
                                                        xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)',
                                                    },
                                                    gap: 2,
                                                    width: '100%',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        gridColumn: '1/3',
                                                        display: 'flex',
                                                        gap: {
                                                            xs: 2, md: 1,
                                                        },
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: 20,
                                                            // width: '100%',
                                                        }}
                                                    >Tot:</Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: 22,
                                                            bgcolor: (theme) =>
                                                                theme.palette.primary.main,
                                                            borderRadius: 1,
                                                            width: {
                                                                xs: '100%', md: 100,
                                                            },
                                                            // mx:'auto'
                                                        }}
                                                    >
                                                        {(Number(femaleInput1) || 0) + (Number(femaleInput2) || 0) + (Number(femaleInput3) || 0)}</Typography>
                                                    <Box component='img' src={YellowCoin} />
                                                </Box>

                                                <Typography
                                                    sx={{
                                                        fontSize: 22,
                                                        bgcolor: (theme) =>
                                                            theme.palette.primary.main,
                                                        borderRadius: 1,
                                                        width: '100%',

                                                    }}
                                                >{sumOfAllYouReceive()}</Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: 22,
                                                        bgcolor: (theme) =>
                                                            theme.palette.primary.main,
                                                        borderRadius: 1,
                                                        width: '100%',
                                                    }}
                                                >{sumOfAllBurnRate()}</Typography>
                                            </Box>
                                        )}

                                        <MButton
                                            onClick={handleLadiesFunction}
                                            sx={{
                                                width: 165,
                                            }}
                                            disabled={!numberOfBabies && !isChangePrice}
                                            loading={isRentLoading || isApprovedAllLoading}
                                            title='submit'
                                        />
                                    </Box>
                                )}

                                {isGenesis && (
                                    <Box>
                                        <Box
                                            sx={{
                                                bgcolor: (theme) =>
                                                    theme.palette.primary.main,
                                                borderRadius: '14px',
                                                p: 2,
                                                mb: 3,
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: 24,
                                                        mb: 2,
                                                        color: '#fff',
                                                        fontWeight: 'bold',
                                                        textAlign: 'center',
                                                        // fontFamily: "Inter",
                                                    }}
                                                >
                          Price per Baby:
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 2,
                                                    }}
                                                >
                                                    <BootstrapInput
                                                        type='number'
                                                        max='1'
                                                        id='bootstrap-input'
                                                        defaultValue={maleInputValue}
                                                        onChange={(e) =>
                                                            setMaleInputValue(e.target.value)
                                                        }
                                                        sx={{
                                                            width: '100px',
                                                            height: '40px',
                                                        }}
                                                    />

                                                    <Typography
                                                        sx={{
                                                            fontSize: 30,
                                                        }}
                                                    >
                            WAC
                                                    </Typography>

                                                    <Box
                                                        component='img'
                                                        src={wacCoin}
                                                    />
                                                </Box>
                                            </Box>

                                        </Box>

                                        <Box
                                            sx={{
                                                bgcolor: (theme) =>
                                                    theme.palette.primary.main,
                                                borderRadius: '14px',
                                                p: 2,
                                                mb: 3,
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
                                                        // width: '100%',
                                                    }}
                                                >You Receive:</Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
                                                        // width: '100%',
                                                    }}
                                                >{getYouReceive(maleInputValue, burnRate)} </Typography>
                                            </Box>

                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
                                                        // width: '100%',
                                                    }}
                                                >
                          Burned:
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
                                                        // width: '100%',
                                                    }}
                                                >{getBurnRate(maleInputValue, burnRate)} </Typography>
                                            </Box>
                                        </Box>

                                        <MButton
                                            onClick={handleMale}
                                            disabled={!maleInputValue}
                                            sx={{
                                                width: 165,
                                            }}
                                            loading={isRentLoading || isApprovedAllLoading}
                                            title='submit'
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
