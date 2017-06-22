import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { ChatPage, LoginPage } from 'containers'

import styles from './MainWrapper.scss'


const propTypes = {
    authenticated: PropTypes.bool.isRequired,
}

export class MainWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jwt: null,
        }
    }

    componentWillMount() {
        let jwt = localStorage.getItem('jwt')
        if (jwt) {
            this.setState({
                jwt: jwt,
            })
        }
    }

    render() {
        return (
            <div className={classNames(styles.body)}>
                <div className={classNames('container-fluid')}>
                    {this.props.authenticated ? <ChatPage/> : <LoginPage/> }
                </div>
            </div>
        )
    }
}

MainWrapper.propTypes = propTypes
MainWrapper.contextTypes = {
    router: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.login.authenticated,
    }
}


// const mapDispatchToProps = { fetchSettings }

export default connect(mapStateToProps)(MainWrapper)
// export default MainWrapper