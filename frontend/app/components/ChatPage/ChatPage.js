import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    jwt: PropTypes.string.isRequired,
}


class ChatPage extends React.Component {
    constructor(props) {
        super(props)
    }

    // componentWillReceiveProps(nextProps) {
    // }

    componentWillMount() {
    }
    
    
    render() {
        return (
            <div>
                <h1>Chat Page</h1>
                <button onClick={()=>{localStorage.removeItem('jwt')}}>Logout</button>
            </div>
        )
    }
}

ChatPage.propTypes = propTypes

export default ChatPage
