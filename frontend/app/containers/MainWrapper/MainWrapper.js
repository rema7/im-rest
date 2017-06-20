import React from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import classNames from 'classnames'

import { Auth } from 'components'
import { Login } from 'containers'

import styles from './MainWrapper.scss'


const propTypes = {
}

export class MainWrapper extends React.Component {
    componentDidMount() {
        this.state = {

        }
    }

    render() {
        return (
            <div className={classNames(styles.body)}>
                <div className={classNames('container-fluid')}>
                    <Login/>
                    <Auth/>
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