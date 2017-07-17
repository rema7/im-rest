import React from 'react'
import PropTypes from 'prop-types'

import { ConnectionStatus, Sidebar } from 'components'

import classNames from 'classnames'
import styles from './ChatPage.scss'


const propTypes = {
    session: PropTypes.string,
    messages: React.PropTypes.array.isRequired,  

    logout: PropTypes.func.isRequired, 
    connect: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    connecting: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    ws: React.PropTypes.shape({
        errorMessage: PropTypes.string,
        connecting: PropTypes.bool.isRequired,
        connected: PropTypes.bool.isRequired,
    }),

    connectionStatus: PropTypes.string.isRequired,
}

class ChatPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
        }
        this.logout = this.logout.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
        this.leftFocus = this.leftFocus.bind(this)
    }

    componentDidMount() {
        this.nameInput.focus()
    }
    
    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('session')
        this.props.disconnect()
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
        this.props.send(this.state.message)
        this.setState({
            message: '',
        })
        this.nameInput.focus()
    }

    leftFocus() {
        this.nameInput.focus()
    }

    render() {
        return (
            <div className={classNames(styles['chat-page'])}>
                    <Sidebar
                        leftFocus={this.leftFocus}
                    />
                <div className={classNames(styles['chat-wrapper'])}>
                    <div className={classNames(styles['top-bar'])}>
                        <ConnectionStatus
                            connectionStatus={this.props.connectionStatus}
                            connect={this.props.connect}
                            connecting={this.props.connecting}
                        />
                        <button onClick={this.logout} className="btn btn-sm btn-primary">Logout</button>
                    </div>
                    <div className={classNames(styles['messages'])}>
                        {this.props.messages.map((value) => {
                            return (
                                <div>
                                    {value.content}
                                </div>
                            )
                        })}
                    </div>
                    <div className={classNames(styles['bottom-bar'])}>
                        <div className="input-group">
                            <input className="form-control"
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
            </div>
        )
    }
}

ChatPage.propTypes = propTypes

export default ChatPage
