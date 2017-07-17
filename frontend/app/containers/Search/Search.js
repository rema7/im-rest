import { connect } from 'react-redux'

// import { Search } from 'components'

// import {
//     fetchSearchResult,
// } from 'actions/Search'


// const mapStateToProps = (state) => {
//     return {
//         searchResult: state.searchResult,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onSearchInputChange: (term) => {
//             return dispatch(fetchAutompleteResult(term))
//         },
//         onSubmit: (term) => {
//             dispatch(changeTerm(term))
//             return dispatch(fetchSearchResult())
//         },
//         joinClan(clan, invite) {
//             dispatch(joinClan(clan, invite, 'clan_search'))
//         },
//         onReloadClick: () => {
//             return dispatch(fetchSearchResult())
//         },
//         onBattleTypeChange: (selectedBattleType) => {
//             dispatch(changeBattleType(selectedBattleType))
//             return dispatch(fetchSearchResult())
//         },
//         onPageChanged: (page) => {
//             dispatch(changePage(page))
//             return dispatch(fetchSearchResult())
//         },
//         clearState: () => {
//             dispatch(batchActions([
//                 clearAutocompleteState(),
//                 clearSearchState(),
//             ]))
//         },
//         onAutocompleteItemClick: (item, accountId) => {
//             dispatch(appendTermToHistory(item, accountId))
//         },
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Search)
