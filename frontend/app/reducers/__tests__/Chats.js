import * as actions from 'actions/Chats'
import { chats } from 'reducers/Chats'

const initialState = {
    errorMessage: null,
    loading: false,
    chats: [],
    currentChat: null,
}

let state = initialState

describe('Chats reducer', () => {
    it('should return the initial state', () => {
        expect(chats(void 0, {})).toEqual(state)
    })

    it('should update "chats" on "responseOk" action', () => {
        const action = {
            type: actions.CHATS_RESPONSE_OK,
            data: {
                chats: [
                    {
                        chat_id: 1,
                        messages: [],
                        members: [
                            {
                                id: 1,
                                first_name: 'First_Name_1',
                                last_name: 'Last_Name_1',
                            },
                        ],
                    },
                    {
                        chat_id: 2,
                        messages: [],
                        members: [
                            {
                                id: 2,
                                first_name: 'First_Name_2',
                                last_name: 'Last_Name_2',
                            },
                            {
                                id: 3,
                                first_name: 'First_Name_3',
                                last_name: 'Last_Name_3',
                            },
                        ],
                    },
                ],
            },
        }
        state = chats(state, action)
        expect(state.errorMessage).toBeNull()
        expect(state.chats).toEqual([
            {
                chatId: 1,
                members: [
                    {
                        firstName: 'First_Name_1',
                        id: 1,
                        lastName: 'Last_Name_1',
                    },
                ], 
                messages: [],
                newMessages: 0,
            }, {
                chatId: 2,
                members: [
                    {
                        firstName: 'First_Name_2',
                        id: 2,
                        lastName: 'Last_Name_2',
                    }, {
                        firstName: 'First_Name_3',
                        id: 3, 
                        lastName: 'Last_Name_3',
                    },
                ], 
                messages: [],
                newMessages: 0,
            },
        ])
        expect(state.loading).toBeFalsy()
    })

    it('should update chats messages on "receivedNewMessages" action', () => {
        const action = {
            type: actions.CHATS_RECEIVED_NEW_MESSAGES,
            messages: [
                {
                    chatId: 1,
                    sender: 1,
                    type: 'CHAT_MESSAGE',
                    content: 'Text1',
                },
                {
                    chatId: 1,
                    sender: 1,
                    type: 'CHAT_MESSAGE',
                    content: 'Text1.1',
                },
                {
                    chatId: 2,
                    sender: 2,
                    type: 'CHAT_MESSAGE',
                    content: 'Text2',
                },
            ],
        }

        state = chats(state, action)
        const chat1 = state.chats[0]
        const chat2 = state.chats[1]

        expect(chat1.messages.length).toEqual(2)
        expect(chat1.newMessages).toEqual(2)
        expect(chat2.newMessages).toEqual(1)
        expect(chat1.messages.map((value) => value.content)).toEqual(['Text1', 'Text1.1'])
        expect(chat2.messages.map((value) => value.content)).toEqual(['Text2'])
    })
    
    it('should update drop new messages flag on "newMessagesRead" action', () => {
        const action = {
            type: actions.CHATS_NEW_MESSAGES_READ,
            chatId: 1,
        }

        state = chats(state, action)
        const chat = state.chats[0]

        expect(chat.messages.length).toEqual(2)
        expect(chat.newMessages).toEqual(0)
        expect(chat.messages.map((value) => value.content)).toEqual(['Text1', 'Text1.1'])
    })
})
