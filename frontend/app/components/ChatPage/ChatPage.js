import React from 'react'
import PropTypes from 'prop-types'

import SplitPane from 'react-split-pane'
import Sidebar from 'react-sidebar'

import {
    ContactsPane,
    ConnectionStatus,
    Dialog,
} from 'components'

import {
    SIDEBAR_DIALOG,
} from './constants'

import {
    SIDEBAR_MENU_ITEM_CONTACTS,
    SIDEBAR_MENU_ITEM_SETTINGS,
} from './translations'

import classNames from 'classnames'
import styles from './ChatPage.scss'


const propTypes = {
    account: PropTypes.shape({
        email: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }),
    currentChat: PropTypes.shape({
        chatId: PropTypes.number.isRequired,
        title: PropTypes.string,
        members: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        })).isRequired,
        messages: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string.isRequired,
            state: PropTypes.string,
        })),
    }),
    connectionStatus: PropTypes.string.isRequired,
    
    connect: PropTypes.func.isRequired,
    fetchAccount: PropTypes.func.isRequired,
    fetchChats: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    updateMessages: PropTypes.func.isRequired,
    markMessagesAsRead: PropTypes.func.isRequired,
}

class ChatPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            sidebarOpen: true,
            currentChat: null,
            dialogOpen: null,
        }
        this.dialogOnClose = this.dialogOnClose.bind(this)
        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
        this.leftFocus = this.leftFocus.bind(this)
        this.logout = this.logout.bind(this)
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
        this.onSidebarItemClick = this.onSidebarItemClick.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        this.props.fetchAccount()
        this.props.fetchChats()
        this.props.connect()
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentChat) {
            this.setState({ currentChat: nextProps.currentChat })

            if (nextProps.currentChat.messages.find((m) => m.state === 'new')) {
                this.props.markMessagesAsRead(nextProps.currentChat.chatId)
            }
        }
    }

    logout() {
        this.props.logout()
    }
    
    handleMessageChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
        })
    }

    handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.sendMessage()
        }
    }

    sendMessage() {
        this.props.send({
            chatId: this.props.currentChat.chatId,
            content: this.state.message,
        })
        this.setState({
            message: '',
        })
        this.setInputFocus()
    }

    setInputFocus() {
        if (this.state.currentChat) {
            this.nameInput.focus()
        }
    }

    leftFocus() {
        this.setInputFocus()
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open})
    }

    renderChatTitle() {
        const { title, members } = this.props.currentChat
        return title || `${members[0].firstName} ${members[0].lastName}`
    }
    
    renderConnectionStatus() {
        if (this.props.connectionStatus !== 'connected') {
            return (
                <ConnectionStatus
                    status={this.props.connectionStatus}
                />
            )
        }
    }

    renderChat() {
        return (
            <div className={classNames(styles['chat-window'])}>
                <div className={classNames(styles['top-bar'])}>
                    <div className={classNames(styles['chat-info'])}>
                        <div className={classNames(styles['title'])}>
                            {this.renderChatTitle()}
                        </div>
                    </div>
                </div>
                <div className={classNames(styles['messages'])}>
                    {this.state.currentChat.messages.map((value, index) => {
                        return (
                            <div key={index}>
                                {value.content} ({value.state})
                            </div>
                        )
                    })}
                </div>
                <div className={classNames(styles['bottom-bar'])}>
                    <div className="input-group">
                        <input autoFocus className={classNames('form-control', styles['form-control'])}
                            name="message"
                            type="text"
                            placeholder="Write a message..."
                            value={this.state.message}
                            onChange={this.handleMessageChange}
                            onKeyPress={this.handleInputKeyPress}
                            ref={(input) => { this.nameInput = input }} 
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={this.sendMessage}>Send</button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    onSidebarItemClick(dialog) {
        this.setState({
            dialogOpen: dialog,
        })
    }

    renderSidebar() {
        if (!this.props.account) {
            return null
        }

        return (
            <div className={classNames(styles['sidebar'])}>
                <div className={classNames(styles['header'])}>
                    <div>
                        {this.props.account.firstName} {this.props.account.lastName}
                    </div>
                    <div>{this.props.account.email}</div>
                </div>
                <div className={classNames(styles['menu'])}>
                    <div className={classNames(styles['menu-item'])}
                        onClick={() => this.onSidebarItemClick(SIDEBAR_DIALOG.CONTACTS)}
                    >
                        <i className="fa fa-address-book" aria-hidden="true"/> {SIDEBAR_MENU_ITEM_CONTACTS}
                    </div>
                    <div className={classNames(styles['menu-item'])}
                        onClick={() => this.onSidebarItemClick(SIDEBAR_DIALOG.SETTINGS)}
                    >
                        <i className="fa fa-cog" aria-hidden="true"/> {SIDEBAR_MENU_ITEM_SETTINGS}
                    </div>
                </div>
                <button onClick={this.logout} className="btn btn-sm btn-primary">Logout</button>
            </div>
        )
    }

    dialogOnClose() {
        this.setState({
            dialogOpen:null,
        })
    }

    renderDialog() {
        return this.state.dialogOpen ? (
            <Dialog
                isOpened={true}
                onClose={this.dialogOnClose}
            >
                <h1>Dialog {this.state.dialogOpen}</h1>
            </Dialog>
        ) : null
    }

    render() {
        const stls = {overlay: {zIndex: 2}, sidebar: {zIndex: 3, background: '#fff', width: '274px'}}
        return (
            <div className={classNames(styles['chat-page'])} onClick={this.leftFocus}>
                {this.renderDialog()}
                <Sidebar
                    sidebar={this.renderSidebar()}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={stls}
                >
                    <div className={classNames(styles['notification-bar'])}>
                        {this.renderConnectionStatus()}
                    </div>
                    <div className={classNames(styles['page-wrapper'])}>
                        <SplitPane split="vertical" minSize={250} maxSize={800} defaultSize={368} className="primary">
                            <ContactsPane
                                leftFocus={this.leftFocus}
                                onSidebarOpen={this.onSetSidebarOpen}
                            /> 
                            <div className={classNames(styles['chat-wrapper'])}>
                                {this.props.currentChat ? this.renderChat() : <div/>} 
                            </div>
                        </SplitPane>
                    </div>
                </Sidebar>
            </div>
        )
    }
}

ChatPage.propTypes = propTypes

export default ChatPage
