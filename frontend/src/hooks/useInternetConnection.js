import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useInternetConnection = (onReconnect, hasMore = true) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && !isConnected && hasMore) {
                onReconnect();
            }
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, [isConnected, onReconnect]);

    return isConnected;
};

export default useInternetConnection;
