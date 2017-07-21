import React from 'react'
import PropTypes from 'prop-types'
import {
    getToken,
    getSession,
    setToken,
    setSession,
} from 'helpers/auth'

const propTypes = {
    loading: PropTypes.bool.isRequired,
    code: PropTypes.number,
    authKey: PropTypes.string,
    token: PropTypes.string,
    session: PropTypes.string,

    login: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    authorised: PropTypes.func.isRequired,
}


class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props)

        let token = getToken()
        let session = getSession()
        this.state = {
            email: '',
            code: 0,
            token: token,
            session: session,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAuth = this.handleAuth.bind(this)
    }

    componentWillMount() {
        if (this.state.token) {
            if (this.state.session) {
                this.props.authorised(this.state.session)
            } else {
                this.props.auth({
                    token: this.state.token,
                })
            }
        }
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

            setToken(nextProps.token)
        }
        if (nextProps.session) {
            this.setState({
                session: nextProps.session,
            })

            setSession(nextProps.session)
        }

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
                                onChange={this.handleChange}
                            />
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
                                onChange={this.handleChange}
                            />
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
