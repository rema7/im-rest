import React from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import classNames from 'classnames'

import { LoginPage } from 'containers'
import { ChatPage } from 'components'

import styles from './MainWrapper.scss'


const propTypes = {
}

export class MainWrapper extends React.Component {
    constructor(props) {
        super(props)
        let jwt = localStorage.getItem('jwt')

        this.state = {
            jwt: jwt,
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <div className={classNames(styles.body)}>
                <div className={classNames('container-fluid')}>
                    {this.state.jwt ? <ChatPage jwt={this.state.jwt}/> : <LoginPage/> }
                </div>
            </div>
        )
    }
}

MainWrapper.propTypes = propTypes
MainWrapper.contextTypes = {
    router: PropTypes.object.isRequired,
}

// const mapStateToProps = (state) => {
//     return {
//         maxTextLength: state.settings.values.defaultTotal,
//     }
// }

// const mapDispatchToProps = { fetchSettings }

// export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper)
export default MainWrapper