import React from 'react'
import PropTypes from 'prop-types'

import SplitPane from 'react-split-pane'
import Sidebar from 'react-sidebar'

import { ContactsPane, ConnectionStatus } from 'components'

import classNames from 'classnames'
import styles from './ChatPage.scss'


const propTypes = {
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
        })),
    }),
    newMessages:PropTypes.array,
    connectionStatus: PropTypes.string.isRequired,
    
    connect: PropTypes.func.isRequired,
    fetchChats: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    updateMessages: PropTypes.func.isRequired,
}

class ChatPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            sidebarOpen: false,
        }
        this.logout = this.logout.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
        this.leftFocus = this.leftFocus.bind(this)
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    }

    componentDidMount() {
        this.props.fetchChats()
        this.props.connect()
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentChat) {
            this.setInputFocus()            
        }
        if (nextProps.newMessages && nextProps.newMessages !== this.state.newMessages) {
            const messages = nextProps.newMessages
            this.setState({
                newMessages: messages,
            })
            this.props.updateMessages(messages)
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
        if (this.props.currentChat) {
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
                    {this.props.currentChat.messages.map((value, index) => {
                        return (
                            <div key={index}>
                                {value.content}
                            </div>
                        )
                    })}
                </div>
                <div className={classNames(styles['bottom-bar'])}>
                    <div className="input-group">
                        <input className={classNames('form-control', styles['form-control'])}
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

    render() {
        var sidebarContent = <button onClick={this.logout} className="btn btn-sm btn-primary">Logout</button>

        const stls = {overlay: {zIndex: 2}, sidebar: {zIndex: 3, background: '#fff', width: '250px'}}
        return (
            <div className={classNames(styles['chat-page'])} onClick={this.leftFocus}>
                <Sidebar
                    sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={stls}
                >
                    <div className={classNames(styles['notification-bar'])}>
                        {this.renderConnectionStatus()}
                    </div>
                    <div className={classNames(styles['page-wrapper'])}>
                        <SplitPane split="vertical" minSize={250} maxSize={500} defaultSize={300} className="primary">
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
