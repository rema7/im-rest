import { connect } from 'react-redux'

import { MainPage } from 'components'

const mapStateToProps = (state) => {
    return {
        session: state.login.session,
    }
}


export default connect(mapStateToProps)(MainPage)