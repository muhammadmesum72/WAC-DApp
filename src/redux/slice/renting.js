import { createSlice } from '@reduxjs/toolkit';

import { COLLECTION_NAMES } from '@/utils/constants';

const initialState = {
   isSelectRentingCard: 'page',
   isSelectRentingCard1: {},
   isSelectRentingCard2: null,
   isUser: false,
   numOfBabies: 1,
   rentedArray:false,
};

export const rentingSlice = createSlice({
   name: 'renting',
   initialState,
   reducers: {
      selectRentingCard: (state, action) => {
         state.isSelectRentingCard = action.payload;
      },
      rentingModalCardClicked: (state, action) => {
         state.isSelectRentingCard1 = action.payload;
      },
      rentingModalCardSelected: (state, action) => {
         state.isSelectRentingCard2 = action.payload;
      },
      isUserFunction: (state, action) => {
         state.isUser = action.payload;
      },
      numberOfBabies: (state, action) => {
         state.numOfBabies = action.payload;
      },
      rentedSelectArray: (state, action) => {
         state.rentedArray = action.payload;
      },
   },
});

export const {
   selectRentingCard,
   rentingModalCardClicked,
   rentingModalCardSelected,
   isUserFunction,
   numberOfBabies,
   rentedSelectArray,
} = rentingSlice.actions;
export default rentingSlice.reducer;
