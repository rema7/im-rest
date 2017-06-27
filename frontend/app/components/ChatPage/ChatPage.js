import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    session: PropTypes.string,
    messages: React.PropTypes.array.isRequired,  

    logout: PropTypes.func.isRequired, 
    wsConnect: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    ws: React.PropTypes.shape({
        errorMessage: PropTypes.string,
        connecting: PropTypes.bool.isRequired,
        connected: PropTypes.bool.isRequired,
    }),
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
    }

    componentDidMount() {
        if (this.state.token) {
            this.nameInput.focus()
        }
        this.props.wsConnect()
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

    render() {
        return (
            <div>
                <h1>Chat Page ws:{this.props.ws.connecting ? 'Connecting' : this.props.ws.connected ? 'Connected': 'Not connected'}</h1>
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
        )
    }
}

ChatPage.propTypes = propTypes

export default ChatPage
