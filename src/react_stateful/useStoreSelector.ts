import { useState, useEffect } from 'react';
import { useStore } from './StoreContext';

export function useStoreSelector<TState, TSelected>(selector: (state: TState) => TSelected): TSelected {
    const store = useStore<TState>();
    const [selected, setSelected] = useState(() => selector(store.getState()));

    useEffect(() => {
        const checkForUpdates = () => {
            const newSelected = selector(store.getState());
            setSelected(newSelected);
        };

        const unsubscribe = store.subscribe(checkForUpdates);
        return unsubscribe;
    }, [store, selector]);

    return selected;
}
