import { createSelector } from 'reselect'

const getConnected = (state) => state.client.connected
const getConnecting = (state) => state.client.connecting
const getErrorMessage = (state) => state.client.errorMessage

export const connectionStatus = createSelector(
  [getConnected, getConnecting, getErrorMessage],
    (connected, connecting, errorMessage) => {
        if (connected) return 'connected'
        if (connecting) return 'connecting'
        if (!connected || errorMessage) return 'disconnected'
    }
)