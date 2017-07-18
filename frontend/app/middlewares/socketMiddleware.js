import * as actions from 'actions/Client'

const socketMiddleware = (() => {
    let socket = null
    let sessionKey = null
    let url = null

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
        store.dispatch(actions.connectionError('Connection error'))
    }

    const createMessage = (action) => {
        const { chatId, message } = action.message
        return JSON.stringify({
            token: sessionKey,
            message: {
                chat_id: chatId,
                content: message,
            },
        })
    }

    return (store) => (next) => (action) => {
        switch(action.type) {
            case actions.CLIENT_CONNECT:
                if (socket) {
                    socket.close()
                }

                store.dispatch(actions.connecting())

                sessionKey = action.sessionKey
                url = action.url
                socket = new WebSocket(url)
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
                socket.send(createMessage(action))
                break

            default:
                return next(action)
        }
    }
})()

export default socketMiddleware