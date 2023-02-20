
// Layout

import { COLLECTION_NAMES } from './utils/constants';

export const HEIGHT = {
   xs: '75vh',
   sm: '75vh',
};

export const infuraId = import.meta.env.VITE_INFURA_PROJECT_ID;
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const NETWORK = {
   NAME: 'Cronos',
   SYMBOL: 'CRO',
   // CHAIN_ID: 25,
   /*
   NAME: 'Cronos',
   SYMBOL: 'tCRO',
   */
   CHAIN_ID: 25,

};

let showMyWapes;
let showFarm;
let showExplorer;
let showBreeding;
let showWapeDate;
let showLoW;
let showWeirdification;
let stakeGWAC;
let stakeLWAC;
let stakeBWAC;
let approveFarm;
let harvestFarm;

if (NETWORK.CHAIN_ID === 25) {
   showMyWapes = true;
   showFarm = false;
   showExplorer = true;
   showBreeding = true;
   showWapeDate = true;
   showLoW = false;
   showWeirdification = false;
   stakeGWAC = true;
   stakeLWAC = false;/* */
   stakeBWAC = false;/* */
   approveFarm = false;
   harvestFarm = false;
} else if (NETWORK.CHAIN_ID === 338) {
   showMyWapes = true;
   showFarm = false;
   showExplorer = true;
   showBreeding = true;
   showWapeDate = true;
   showLoW = false;
   showWeirdification = false;
   stakeGWAC = true;
   stakeLWAC = false;
   stakeBWAC = false;
   approveFarm = false;
   harvestFarm = false;
}

export const BUTTON_DISABLE = {
   'My Wapes': {
      show: showMyWapes,
      [COLLECTION_NAMES.genesis]: {
         stake: stakeGWAC,
      },

      [COLLECTION_NAMES.lady]: {
         stake: stakeLWAC,
      },
      [COLLECTION_NAMES.baby]: {
         stake: stakeBWAC,
      },
   },
   Farm: {
      show: showFarm,
      approve: approveFarm,
      harvest: harvestFarm,
   },
   Explorer: {
      show: showExplorer,
   },
   Breeding: {
      show: showBreeding,
   },
   'Wape Date': {
      show: showWapeDate,
   },
   'Legends of Weirdonite': {
      show: showLoW,
   },
   Weirdification: {
      show: showWeirdification,
   },
};

export const BABY_SERVER = 'https://server.weirdapesclub.com:8585';
