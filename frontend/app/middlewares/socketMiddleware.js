import * as actions from 'actions/Client'

const socketMiddleware = (() => {
    let socket = null
    let isReconnect = true

    /* eslint-disable no-unused-vars */
    const onOpen = (ws, store) => (evt) => {
        store.dispatch(actions.connected())
    }

    const onClose = (ws, store) => (evt) => {
        store.dispatch(actions.disconnect())
    }

    const onMessage = (ws, store) => (evt) => {
        const msg = JSON.parse(evt.data)
        store.dispatch(actions.messageReceived(msg))
    }

    const onError = (ws, store) => (err) => {
        store.dispatch(actions.catchError(err))
    }

    const onReconnect = (store) => {
        setTimeout(() => {
            store.dispatch(actions.wsConnect())
        }, 2000)
    }

    const createMessage = (action) => {
        const { chatId, content } = action.message
        return JSON.stringify({
            type: 'CHAT_MESSAGE',
            payload: {
                chat_id: chatId,
                content: content,
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

                socket = new WebSocket(action.url+`?token=${action.token}`)
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
            case actions.CLIENT_SWITCH_RECONNECT: 
                isReconnect = !isReconnect
                break
            case actions.CLIENT_SEND_MESSAGE: 
                socket.send(createMessage(action))
                break
            case actions.CLIENT_DISCONNECTED:
                if (isReconnect) {
                    store.dispatch(actions.connecting())
                    onReconnect(store)
                }
                return next(action)
            default:
                return next(action)
        }
    }
})()

export default socketMiddleware