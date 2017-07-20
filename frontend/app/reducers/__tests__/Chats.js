import * as actions from 'actions/Chats'
import { chats } from 'reducers/Chats'

describe('Chats reducer', () => {
    it('should return the initial state', () => {
        expect(chats(void 0, {})).toEqual({
            errorMessage: null,
            loading: false,
            chats: [],
            contacts: [],
            currentChat: null,
        })
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
        const newState = chats(void 0, action)
        expect(newState.errorMessage).toBeNull()
        expect(newState.chats).toEqual([
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
            },
        ])
        expect(newState.loading).toBeFalsy()
    })
})
