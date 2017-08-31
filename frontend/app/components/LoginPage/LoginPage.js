import React from 'react'
import PropTypes from 'prop-types'

import {
    LOGIN_PAGE_STATES,
} from './constants'

import classNames from 'classnames'
import styles from './LoginPage.scss'


const propTypes = {
    loading: PropTypes.bool.isRequired,
    authCode: PropTypes.string,
    authKey: PropTypes.string,
    token: PropTypes.string,

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
            page: LOGIN_PAGE_STATES.SIGNIN,
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
        if (nextProps.token) {
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
        this.setState({
            page: LOGIN_PAGE_STATES.LOGIN,
        })
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
                    <div className={classNames(styles['input-group'])}>
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                    </div>
                </form>
            </div>
        )
    }

    renderLogIn() {
        return (
            <div>
                <h3>{this.state.email}</h3>
                <form>
                    <div className={classNames(styles['input-group'])}>
                        <input
                            name="code"
                            type="text"
                            value={this.state.authCode}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
            </div>
        )
    }        

    renderProfile() {
        return (
            <div>
                <h3>Profile</h3>
                <form>
                    <div className={classNames(styles['input-group'])}>
                        <input
                            name="code"
                            type="text"
                            value={this.state.authCode}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
            </div>
        )
    }        

    renderHeader() {
        let submit = this.handleSubmit
        if (this.state.page === LOGIN_PAGE_STATES.LOGIN) {
            submit = this.handleAuth
        }
        // else if (this.state.page === LOGIN_PAGE_STATES.PROFILE) {
        //     return this.renderProfile()
        // }

        return (
            <div className={classNames(styles['login-header'])}>
                <h2 className={classNames(styles['title'])}>Milligramm</h2>
                <div className={classNames(styles['submit-button'])}>
                    <a onClick={submit}>
                        Next
                        <i className={classNames(styles['icon-next-submit'])}></i>
                    </a>
                </div>
            </div>
        )
    }

    renderPage() {
        if (this.state.page === LOGIN_PAGE_STATES.SIGNIN) {
            return this.renderSignIn()
        } 
        else if (this.state.page === LOGIN_PAGE_STATES.LOGIN) {
            return this.renderLogIn()
        }
        else if (this.state.page === LOGIN_PAGE_STATES.PROFILE) {
            return this.renderProfile()
        }

    }

    render() {

        return (
            <div className={classNames(styles['login-page-wrapper'])}>
                <div className={classNames(styles['header'])}>
                </div>
                <div className={classNames(styles['login-page'])}>
                    {this.renderHeader()}
                    <div className={classNames(styles['login-form'])}>
                        {this.renderPage()}
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = propTypes

export default LoginPage
