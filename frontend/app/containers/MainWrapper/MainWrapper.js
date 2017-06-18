import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { Todo } from 'containers'
import { fetchSettings } from 'actions/Settings'

import styles from './MainWrapper.scss'


const propTypes = {
    fetchSettings: React.PropTypes.func.isRequired,
    defaultTotal: React.PropTypes.number,
}

export class MainWrapper extends React.Component {
    componentDidMount() {
        this.props.fetchSettings()
        this.state = {

        }
    }

    render() {
        return (
            <div className={classNames(styles.body)}>
                <div className={classNames('container-fluid')}>
                    <Todo/>
                </div>
            </div>
        )
    }
}

MainWrapper.propTypes = propTypes
MainWrapper.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        maxTextLength: state.settings.values.defaultTotal,
    }
}

const mapDispatchToProps = { fetchSettings }

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper)