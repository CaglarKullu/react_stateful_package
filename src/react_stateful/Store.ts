class Store<TState> {
    private state: TState;
    private listeners: Function[] = [];
    private namespaces: Map<string, Store<any>> = new Map();

    constructor(initialState: TState) {
        this.state = initialState;
    }

    getState(): TState {
        return this.state;
    }

    subscribe(listener: Function): () => void {
        this.listeners.push(listener);
        return () => this.listeners = this.listeners.filter(l => l !== listener);
    }

    setState(newState: TState): void {
        this.state = newState;
        this.notify();
    }

    private notify(): void {
        this.listeners.forEach(listener => listener(this.state));
    }

    addNamespace<TNamespaceState>(name: string, initialState: TNamespaceState): Store<TNamespaceState> {
        if (this.namespaces.has(name)) {
            throw new Error(`Namespace "${name}" already exists.`);
        }
        const newNamespaceStore = new Store<TNamespaceState>(initialState);
        this.namespaces.set(name, newNamespaceStore);
        return newNamespaceStore;
    }

    getNamespace<TNamespaceState>(name: string): Store<TNamespaceState> | undefined {
        return this.namespaces.get(name);
    }
}

export default Store;

