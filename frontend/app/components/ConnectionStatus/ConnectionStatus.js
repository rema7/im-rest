import React from 'react'
import PropTypes from 'prop-types'

import {
    SERVER_STATE_CONNECTED,
    SERVER_STATE_CONNECTING,
    SERVER_STATE_DISCONNECTED,
} from './translations'

const propTypes = {
    connectionStatus: PropTypes.string.isRequired,

    connect: PropTypes.func.isRequired,
    connecting: PropTypes.func.isRequired,
}

class ConnectionStatus extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            reconnect: false,
        }
    }

    componentDidMount() {
        this.props.connect()
    }

    reconnect() {
        if (this.state.reconnect && this.props.connectionStatus === 'disconnected') {
            this.props.connecting()
            setTimeout(() => {
                this.props.connect()
            }, 2000)
        }
    }
    
    componentWillReceiveProps() {
        this.reconnect()
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value,
        }, this.reconnect)
    }

    renderConnectionState() {
        let message = SERVER_STATE_DISCONNECTED
        const { connectionStatus } = this.props
        if (connectionStatus === 'connecting') {
            message = SERVER_STATE_CONNECTING
        } else if (connectionStatus === 'connected') {
            message = SERVER_STATE_CONNECTED
        }
        return (
            <div className="checkbox">
                <span>Server status: {message}</span>
                <label>
                    <input type="checkbox" 
                           value={this.state.reconnect} 
                           name="reconnect"
                           onChange={::this.handleInputChange}
                    />
                           Reconnect
                    </label>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderConnectionState()}
            </div>
        )
    }
}

ConnectionStatus.propTypes = propTypes

export default ConnectionStatus
