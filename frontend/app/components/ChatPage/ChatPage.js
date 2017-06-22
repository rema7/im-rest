import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    jwt: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,    
}


class ChatPage extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    componentWillMount() {
    }
    
    logout() {
        localStorage.removeItem('jwt')
        this.props.logout()
    }
    
    render() {
        return (
            <div>
                <h1>Chat Page</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

ChatPage.propTypes = propTypes

export default ChatPage
