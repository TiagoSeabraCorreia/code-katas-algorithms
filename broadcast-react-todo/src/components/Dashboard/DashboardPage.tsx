import { useEffect } from "react";
import { useBroadcast } from "../../providers/useBroadcast";
import { createBroadcastService } from "../../services/broadcast.service";


export function DashboardPage() {
    const broadcast = useBroadcast(createBroadcastService());

    useEffect(() => {

        return () => {
            broadcast.close(); 
        };
    }, []);

    return (
        <div>
            {broadcast.getId()}
        </div>
    );
}
