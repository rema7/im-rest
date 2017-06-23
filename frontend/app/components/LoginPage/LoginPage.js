import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    code: PropTypes.number,
    authKey: PropTypes.string,
    token: PropTypes.string,

    login: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
}


class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            code: 0,
            token: 'no jwt',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAuth = this.handleAuth.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.code) {
            this.setState({
                code: nextProps.code,
            })
        }
        if (nextProps.token) {
            this.setState({
                token: nextProps.token,
            })

            localStorage.setItem('token', nextProps.token)
        }
    }

    componentWillMount() {
    }
    
    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
        })
    }

    handleSubmit() {
        this.props.login(this.state.email)
    }

    handleAuth() {
        this.props.sendCode({
            authKey : this.props.authKey,
            code : this.props.code,
        })
    }

    render() {

        return (
            <div>
                <div>
                    Code: {this.props.code}
                </div>
                <div>
                    Token: {this.props.authKey}
                </div>
                <div>
                    JWT: {this.state.token}
                </div>
                <div className="container">
                    <h3>Login</h3>
                    <form >
                        <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange} />
                        </label>
                    </form>
                    <button onClick={this.handleSubmit}>Login</button>
                </div>
                <div className="container">
                    <h3>Complete</h3>
                    <form>
                        <label>
                        Code:
                        <input
                            name="code"
                            type="number"
                            value={this.state.code}
                            onChange={this.handleChange} />
                        </label>
                    </form>
                    <button onClick={this.handleAuth}>Auth</button>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = propTypes

export default LoginPage
