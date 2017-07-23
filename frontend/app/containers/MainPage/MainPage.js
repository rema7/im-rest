import { connect } from 'react-redux'

import { MainPage } from 'components'
import { init } from 'actions/App'

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        loading: state.app.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init:() => {
            dispatch(init())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)