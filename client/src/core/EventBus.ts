import type { EngineEventMap } from "./EngineEvents";

export class EventBus {
    private listeners = new Map<
        keyof EngineEventMap, 
        Array<(data: any) => void>
    >()

    // Subscribe to an event
    public on<K extends keyof EngineEventMap>(
        event: K,
        callback: (data: EngineEventMap[K]) => void,
    ) {
        const existing = this.listeners.get(event);
        if(existing) 
            this.listeners.set(event, [...existing, callback]);
        else
            this.listeners.set(event, [callback]);
    }

    // Unsubscribe from an event
    public off<K extends keyof EngineEventMap>(
        event: K, 
        callback: (data: EngineEventMap[K]) => void,
    ) {
        const existing = this.listeners.get(event);
        if(!existing) return;

        const updated = existing.filter(cb => cb !== callback);
        this.listeners.set(event, updated);
    }

    // Publish/Emit an event
    public emit<K extends keyof EngineEventMap>(
        event: K, 
        data: EngineEventMap[K],
    ) {
        const existing = this.listeners.get(event);
        if(!existing) return;

        existing.forEach(callback => callback(data));
    }
}