import { useSelector } from 'react-redux';

// import { COLLECTION_NAMES } from '@/utils/constants';

export const useSelectMyWapes = (/* isRenting */) => useSelector((state) => state.tabSlice);

