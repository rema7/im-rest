import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './LoginPage.scss'

const propTypes = {
    loading: PropTypes.bool.isRequired,
    authCode: PropTypes.string,
    authKey: PropTypes.string,

    login: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
}


class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            authCode: '',
            authKey: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAuth = this.handleAuth.bind(this)
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authCode) {
            this.setState({
                authCode: nextProps.authCode,
            })
        }
        if (nextProps.authKey) {
            this.setState({
                authKey: nextProps.authKey,
            })
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
            key : this.state.authKey,
            code : this.state.authCode,
        })
    }

    renderSignIn() {
        return (
            <div>
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
        )
    }

    renderLogIn() {
        return (
            <div>
                <h3>Complete</h3>
                <form>
                    <label>
                        Code:
                        <input
                            name="code"
                            type="text"
                            value={this.state.authCode}
                            onChange={this.handleChange}
                        />
                    </label>
                </form>
                <button onClick={this.handleAuth}>Auth</button>
            </div>
        )
    }        

    render() {

        return (
            <div className={classNames(styles['login-page-wrapper'])}>
                <div className={classNames(styles['header'])}>
                </div>
                <div className={classNames(styles['login-page'])}>
                    <div className={classNames(styles['login-header'])}>
                    </div>
                    <div className={classNames(styles['login-form'])}>
                        {this.renderSignIn()}
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = propTypes

export default LoginPage
