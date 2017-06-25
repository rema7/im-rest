import React from 'react'
import PropTypes from 'prop-types'

import {LoginPage} from 'containers'

const propTypes = {
    token: PropTypes.string,
    logout: PropTypes.func.isRequired,    
    wsConnect: PropTypes.func.isRequired,    
    send: PropTypes.func.isRequired,  
    messages: React.PropTypes.array.isRequired,  
}

class ChatPage extends React.Component {
    constructor(props) {
        super(props)

        let token = localStorage.getItem('token')
        this.state = {
            token: token,
            message: '',
        }

        this.logout = this.logout.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
    }

    componentDidMount() {
        this.nameInput.focus()
        this.props.wsConnect()
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.setState({
                token: nextProps.token,
            })
        }
    }

    logout() {
        localStorage.removeItem('token')
        this.props.logout()
        this.setState({
            token: null,
        })
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

    render() {
        return (
            <div>
                {this.state.token ? 
                    <div>
                        <h1>Chat Page</h1>
                        <button onClick={this.logout}>Logout</button>
                        <div>
                            <div>
                                {this.props.messages.map((value) => {
                                    return (
                                        <div>
                                            {value.content}
                                        </div>
                                    )
                                })}
                            </div>
                            <div>
                                <input
                                    name="message"
                                    type="text"
                                    value={this.state.message}
                                    onChange={this.handleMessageChange}
                                    onKeyPress={this.handleInputKeyPress}
                                    ref={(input) => { this.nameInput = input }} 
                                />
                                <button onClick={this.sendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <LoginPage/>
                    </div>
                }
            </div>
        )
    }
}

ChatPage.propTypes = propTypes

export default ChatPage
