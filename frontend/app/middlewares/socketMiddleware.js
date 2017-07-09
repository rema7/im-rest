import * as actions from 'actions/Client'

const socketMiddleware = (() => {
    let socket = null
    let sessionKey = null

    /* eslint-disable no-unused-vars */
    const onOpen = (ws, store, sessionKey) => (evt) => {
        store.dispatch(actions.connected())
    }

    const onClose = (ws, store) => (evt) => {
        store.dispatch(actions.disconnected())
    }

    const onMessage = (ws, store) => (evt) => {
        const msg = JSON.parse(evt.data)
        switch(msg.type) {
            case 'CHAT_MESSAGE':
                store.dispatch(actions.messageReceived(msg))
                break
            default:
                /* eslint-disable no-console */
                console.log(`Received unknown message type: ${msg.type}`)
                break
        }
    }

    const onError = (ws, store) => (err) => {
        console.log(`Error ${JSON.stringify(err)}`)
        store.dispatch(actions.connectionError('Connection error'))
    }

    return (store) => (next) => (action) => {
        switch(action.type) {
            case actions.CLIENT_CONNECT:
                if (socket) {
                    socket.close()
                }

                store.dispatch(actions.connecting())

                sessionKey = action.sessionKey
                socket = new WebSocket(action.url)
                socket.onmessage = onMessage(socket, store)
                socket.onclose = onClose(socket, store)
                socket.onopen = onOpen(socket, store, action.sessionKey)
                socket.onerror = onError(socket, store)

                break
            case actions.CLIENT_DISCONNECT:
                if(socket) {
                    socket.close()
                }
                socket = null

                store.dispatch(actions.disconnected())
                break

            case actions.CLIENT_SEND_MESSAGE:
                socket.send(JSON.stringify({
                    token: sessionKey,
                    message: {
                        content: action.message,
                    },
                }))
                break

            default:
                return next(action)
        }
    }
})()

export default socketMiddleware