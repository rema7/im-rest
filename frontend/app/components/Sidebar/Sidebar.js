import React from 'react'
import { SidebarTopbar } from 'components'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import styles from './Sidebar.scss'

const propTypes = {
    leftFocus: PropTypes.func.isRequired,
}

class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={classNames(styles['top-bar'])}>
                <SidebarTopbar
                    leftFocus={this.props.leftFocus}
                />
            </div>
        )
    }
}

Sidebar.propTypes = propTypes

export default Sidebar