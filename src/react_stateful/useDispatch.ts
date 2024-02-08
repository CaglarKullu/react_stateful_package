import { useContext } from 'react';
import { StoreContext } from './StoreContext';
import { Store } from './Store';

export function useDispatch<TState>() {
    const store = useContext(StoreContext) as Store<TState>;
    if (!store) {
        throw new Error('useDispatch must be used within a StoreProvider');
    }

    // Simplified dispatch function that assumes action payloads are always provided
    const dispatch = <TPayload>(actionName: string, payload: TPayload) => {
        store.dispatch(actionName, payload);
    };

    return dispatch;
}
