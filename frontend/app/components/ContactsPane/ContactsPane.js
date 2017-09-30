import React from 'react'
import PropTypes from 'prop-types'

import {
    Search,
} from 'components'
import { ChatList } from 'containers'
import classNames from 'classnames'
import styles from './ContactsPane.scss'

const propTypes = {
    leftFocus: PropTypes.func.isRequired,
    openSidebar: PropTypes.func.isRequired,
}

class ContactsPane extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={classNames(styles['contacts-pane'])}>
                <div className={classNames(styles['topbar'])}>
                    <div
                        className={classNames(styles['menu-button'])}
                        onClick={this.props.openSidebar}
                    >
                        <div/>
                        <div/>
                        <div/>
                    </div>
                    <Search
                        leftFocus={this.props.leftFocus}
                    />
                </div>
                <div className={classNames(styles['contacts'])}>
                    <ChatList />
                </div>
            </div>
        )
    }
}

ContactsPane.propTypes = propTypes

export default ContactsPane