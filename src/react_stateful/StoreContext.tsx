// File: /src/store/StoreContext.tsx

import React, { createContext, useContext } from 'react';
import Store from './Store';

interface StoreProviderProps<TState> {
    store: Store<TState>;
    children: React.ReactNode;
}

const StoreContext = createContext<Store<any> | null>(null);

export const StoreProvider = <TState, >({ store, children }: StoreProviderProps<TState>) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export function useStore<TState>(): Store<TState> {
    const context = useContext(StoreContext);
    if (context === null) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context as Store<TState>;
}

export function useNamespace<TState>(namespace: string): Store<TState> {
    const globalStore = useStore<any>();
    const namespaceStore = globalStore.getNamespace<TState>(namespace);
    if (!namespaceStore) {
        throw new Error(`Namespace "${namespace}" not found.`);
    }
    return namespaceStore;
}
