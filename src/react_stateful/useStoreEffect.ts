import { useEffect } from 'react';
import { useStore } from './StoreContext';

export function useStoreEffect<TState, TSelected>(
    effect: (selected: TSelected) => void | (() => void),
    selector: (state: TState) => TSelected,
    deps?: React.DependencyList
) {
    const store = useStore<TState>();
    const selected = selector(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newSelected = selector(store.getState());
            effect(newSelected);
        });

        // Run effect on mount and when selected state changes
        effect(selected);

        return () => {
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store, selected, ...(deps || [])]);
}
