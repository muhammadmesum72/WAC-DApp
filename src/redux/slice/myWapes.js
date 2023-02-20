import { createSlice } from '@reduxjs/toolkit';

import { COLLECTION_NAMES } from '@/utils/constants';
import { truncate } from 'lodash';

const initialState = {
  currentTab: COLLECTION_NAMES.all,
  currentCollection: COLLECTION_NAMES.all,
  dimensionalSwitchType: '2d',
  rentingCurrentTab: COLLECTION_NAMES.genesis,
  dashboardTab: 'My Wapes',
  multipleStaking: false,
  multipleStakingArray: [],
  multipleUnstaking: false
  //multipleUnstakingArray: []//mingo
};

export const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.currentTab = action.payload;
      state.currentCollection = `${state.currentTab}${state.dimensionalSwitchType === '3d' ? ' 3D' : ''}`;
    },
    changeDimension: (state, action) => {
      state.dimensionalSwitchType = action.payload;
      state.currentCollection = `${state.currentTab}${state.dimensionalSwitchType === '3d' ? ' 3D' : ''}`;
    },
    changeDashboardTab: (state, action) => {
      state.dashboardTab = action.payload;
    },
    rentingTab: (state, action) => {
      state.rentingCurrentTab = action.payload;
    },
    multipleStaked: (state, action) => {
      state.multipleStaking = action.payload;
    },
    multipleUnStaked: (state, action) => {
      state.multipleUnstaking = action.payload;
    },
    multipleStakedArray: (state, action) => {
      state.multipleStakingArray = action.payload;
    },
  },
});

export const {
  changeTab,
  changeDimension,
  rentingTab,
  changeDashboardTab,
  multipleStaked,
  multipleStakedArray,
  multipleUnStaked
} = tabSlice.actions;

export default tabSlice.reducer;
