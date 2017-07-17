import React from 'react'
import PropTypes from 'prop-types'

import { Search } from 'components'

const propTypes = {
    leftFocus: PropTypes.func.isRequired,
}

class SidebarTopbar extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Search
                leftFocus={this.props.leftFocus}
            />
        )
    }
}

SidebarTopbar.propTypes = propTypes

export default SidebarTopbar