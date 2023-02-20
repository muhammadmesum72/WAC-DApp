
import { useState } from 'react';

import { useSelector } from 'react-redux';

export const useSelectTab = () => useSelector((state) => state.tabSlice);
// ----------------------------------------------------------------------

export default function useTabs(defaultValues) {
    const [currentTab, setCurrentTab] = useState(defaultValues || '');

    return {
        currentTab,
        onChangeTab: (event, newValue) => {
            setCurrentTab(newValue);
        },
        setCurrentTab,
    };
}

