import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    code: PropTypes.number,
    token: PropTypes.string,
    jwt: PropTypes.string,

    login: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
}


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            code: 0,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAuth = this.handleAuth.bind(this)
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
        this.props.auth({
            token : 'b39c8e2009a74fc7997bc78d5191a510',
            code : '4877',
        })
    }

    render() {

        return (
            <div>
                <div>
                    Code: {this.props.code}
                </div>
                <div>
                    Token: {this.props.token}
                </div>
                <div>
                    JWT: {this.props.jwt}
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

Login.propTypes = propTypes

export default Login
