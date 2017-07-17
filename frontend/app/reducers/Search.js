// import * as actions from 'actions/Search'
// import * as applicationsActions from 'actions/Applications'
// import { searchResult } from 'reducers/Search'

// const inititalState = {
//     battleTypeSelected: undefined,
//     error: null,
//     isFetchedBefore: false,
//     isFetching: false,
//     items: [],
//     meta: null,
//     page: 1,
//     term: '',
// }

// describe('searchResult reducer', () => {
//     it('should return the initial state', () => {
//         expect(searchResult(void 0, {})).toEqual(inititalState)
//     })

//     it('should set battle type', () => {
//         const action = {
//             type: actions.SEARCH_CHANGE_BATTLE_TYPE,
//             battleType: 'battleType',
//         }
//         expect(searchResult({}, action)).toEqual({
//             battleTypeSelected: 'battleType',
//         })
//     })

//     it('should set page', () => {
//         const action = {
//             type: actions.SEARCH_CHANGE_PAGE,
//             page: 101,
//         }
//         expect(searchResult({}, action)).toEqual({
//             page: 101,
//         })
//     })

//     it('should set isFetching in true', () => {
//         const action = {
//             type: actions.SEARCH_START_FETCHING,
//         }
//         expect(searchResult({}, action)).toEqual({
//             isFetchedBefore: true,
//             isFetching: true,
//         })
//     })

//     it('should update state by search result', () => {
//         const action = {
//             type: actions.SEARCH_UPDATE_RESULT,
//             data: {
//                 clans: ['foo'],
//                 _meta_: {meta: 'meat'},
//             },
//         }
//         expect(searchResult({}, action)).toEqual({
//             isFetching: false,
//             items: ['foo'],
//             meta: {meta: 'meat'},
//             error: null,
//         })
//     })

//     it('should set has_application on clan', () => {
//         const action = applicationsActions.updateClanActiveApplications(12, 13)
//         expect(searchResult({
//             items: [{ id: 12 }],
//         }, action)).toEqual({
//             items: [{ id: 12, has_application: true }],
//         })
//     })

//     it('should update state by search error', () => {
//         const action = {
//             type: actions.SEARCH_UPDATE_ERROR,
//             error: 'error',
//         }
//         expect(searchResult({}, action)).toEqual({
//             isFetching: false,
//             items: [],
//             meta: null,
//             error: 'error',
//         })
//     })

//     it('should reset component state if SEARCH_CLEAR_STATE action received', () => {
//         const firstAction = {
//             type: actions.SEARCH_START_FETCHING,
//         }
//         expect(searchResult({}, firstAction)).not.toEqual(inititalState)

//         const secondAction = {
//             type: actions.SEARCH_CLEAR_STATE,
//         }
//         expect(searchResult({}, secondAction)).toEqual(inititalState)
//     })

//     it('should update term', () => {
//         const action = {
//             type: actions.SEARCH_CHANGE_TERM,
//             term: 'foo',
//         }
//         expect(searchResult({}, action)).toEqual({
//             term: 'foo',
//             page: 1,
//             items: [],
//         })
//     })
// })
