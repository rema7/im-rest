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
            reconnectFlag: false,
            connecting: false,
            connectionStatus: 'disconnected',
        }
    }

    componentDidMount() {
        this.props.connect()
    }

    reconnect() {
        if (this.state.reconnectFlag && this.state.connectionStatus === 'disconnected') {
            this.setState({
                connectionStatus: 'connecting',
            })
            this.props.connecting()
            setTimeout(() => {
                this.props.connect()
            }, 2000)
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.connectionStatus) {
            if (nextProps.connectionStatus === 'disconnected') {
                this.setState({
                    connectionStatus: nextProps.connectionStatus,
                }, this.reconnect)
            } else {
                this.setState({
                    connectionStatus: nextProps.connectionStatus,
                })
            }
        }
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
                        value={this.state.reconnectFlag} 
                        name="reconnectFlag"
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
