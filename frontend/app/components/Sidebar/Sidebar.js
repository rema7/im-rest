import React from 'react'
import PropTypes from 'prop-types'

import {
    SidebarTopbar,
    Contacts,
} from 'components'
import { ChatList } from 'containers'
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
            <div className={classNames(styles['sidebar'])}>
                <div className={classNames(styles['topbar'])}>
                    <SidebarTopbar
                        leftFocus={this.props.leftFocus}
                    />
                </div>
                <div className={classNames(styles['contacts'])}>
                    <Contacts contacts={[]}/>
                    <ChatList />
                </div>
            </div>
        )
    }
}

Sidebar.propTypes = propTypes

export default Sidebar