import { connect } from 'react-redux'

import {
    openSidebar,
} from 'actions/Sidebar'

import { ContactsPane } from 'components'

const mapStateToProps = (state) => {
    return {
        isSidebarOpen: state.sidebar.open,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openSidebar:() => {
            dispatch(openSidebar())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPane)