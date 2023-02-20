import { createSlice } from '@reduxjs/toolkit';

import { COLLECTION_NAMES } from '@/utils/constants';

const initialState = {
    currentExplorerButton: COLLECTION_NAMES.genesis,
    dimensionalSwitchType: '2d',
    idRankType: 'id',
    enteredNumber: null,
    isSearch: null,
};

export const explorerSlice = createSlice({
    name: 'explorer',
    initialState,
    reducers: {
        resetExplorer: () => initialState,
        changeExplorerButton: (state, action) => {
            state.currentExplorerButton = action.payload;
        },
        changeDimensionalSwitchType: (state, action) => {
            state.dimensionalSwitchType = action.payload;
        },
        changeIdRankType: (state, action) => {
            state.idRankType = action.payload;
        },
        changeEnteredNumber: (state, action) => {
            state.enteredNumber = action.payload;
        },
        hidSearch: (state, action) => {
            state.isSearch = action.payload;
        },
    },
});

export const {
    resetExplorer,
    changeExplorerButton,
    changeDimensionalSwitchType,
    changeIdRankType,
    hidSearch,
    changeEnteredNumber,
} = explorerSlice.actions;
export default explorerSlice.reducer;
