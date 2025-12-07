
type MessageHandler = (data: any) => void;

export function createBroadcastService(): BroadcastService{
    const bc = new BroadcastChannel('todo-kata');
    const windowId = crypto.randomUUID();
    localStorage.setItem('W', windowId);
    const clientId = windowId;

    const handlers = new Set<MessageHandler>();

    bc.onmessage = (event) => {
        for (const h of handlers) {
            h(event.data);
        }
    }

    return {
        getId: (): string | null=> {return clientId},
        sendMessage: (message: string) => {
            bc.postMessage({
                from: clientId,
                payload:{
                    message: message
                
                }
            })
        },
        onMessage: (handler) => {
            handlers.add(handler);
            return () => handlers.delete(handler);
        },
        close:() => {
            handlers.clear();
            bc.close();
        }
    }
}

export interface Client {
    id: string | null;
}

export interface BroadcastService{
    getId:() => string | null;
    sendMessage: (message: string) => void;
    onMessage: (handler: (msg: any) => void) => () => void;
    close: () => void;
}