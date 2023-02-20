import Farm from '@/sections/Farm';
import Renting from '@/sections/Renting';

import Breeding from '../../sections/Breeding';
import Explorer from '../../sections/Explore';
import MyWapes from '../../sections/MyWapes';

export const TAB_OPTIONS = [
   {
      id: 1,
      value: 'My Wapes',
      component: <MyWapes />,
   },
   {
      id: 2,
      value: 'Wape Date', // Renting
      component: <Renting />,
   },
   {
      id: 3,
      value: 'Breeding',
      component: <Breeding />,
   },
   {
      id: 4,
      value: 'Explorer',
      component: <Explorer />,
   },
   {
      id: 5,
      value: 'Farm',
      component: <Farm />,
   },

   {
      id: 6,
      value: 'Legends of Weirdonite',
      component: <MyWapes />,
      linkUrl: '/',
   },
   {
      id: 7,
      value: 'Raffle', // Weirdification
      component: 'Raffle',
   }
];
