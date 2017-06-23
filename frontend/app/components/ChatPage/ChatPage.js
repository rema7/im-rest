import React from 'react'
import PropTypes from 'prop-types'

import {LoginPage} from 'containers'

const propTypes = {
    token: PropTypes.string,
    logout: PropTypes.func.isRequired,    
}


class ChatPage extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        let token = localStorage.getItem('token')
        this.state = {
            token: token,
        }
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
    
    render() {
        return (
            <div>
                {this.state.token ? 
                    <div>
                        <h1>Chat Page</h1>
                        <button onClick={this.logout}>Logout</button>
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
