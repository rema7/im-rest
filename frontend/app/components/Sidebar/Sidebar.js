import React from 'react'
import PropTypes from 'prop-types'

import { Contacts, Chats } from 'components'

const propTypes = {
    leftFocus: PropTypes.func.isRequired,
}

class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <span>Sidebar</span>
                <Contacts />
                <Chats />
            </div>
        )
    }
}

Sidebar.propTypes = propTypes

export default Sidebar