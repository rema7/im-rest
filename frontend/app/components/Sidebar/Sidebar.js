import React from 'react'
import PropTypes from 'prop-types'

import { Contacts } from 'components'

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
            </div>
        )
    }
}

Sidebar.propTypes = propTypes

export default Sidebar