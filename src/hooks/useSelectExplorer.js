import { useSelector } from 'react-redux';

export const useSelectExplorer = () => useSelector((state) => state.explorerSlice);
