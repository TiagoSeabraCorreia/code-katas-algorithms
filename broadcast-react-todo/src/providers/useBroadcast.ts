import type { createBroadcastService } from "../services/broadcast.service";

export function useBroadcast(service: ReturnType<typeof createBroadcastService>){
    return service;
}