import React from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'

import {LoginPage, ChatPage} from 'containers'
import { accidentMessages, getCurrentLanguage, localeDataHash } from 'helpers/locale'

import classNames from 'classnames'
import styles from './MainPage.scss'

const propTypes = {
    session: PropTypes.string,
}

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.language = getCurrentLanguage()
    }
    
    componentWillMount() {
        addLocaleData(localeDataHash[this.language])
    }

    renderPage() {
        if (this.props.session === null)
            return <LoginPage/>
        else
            return <ChatPage/>
    }

    render() {
        // const messages = Object.assign({}, accidentMessages[this.language], this.props.locale.messages)
        const messages = Object.assign({}, accidentMessages[this.language])
        return (
            <IntlProvider locale={this.language} messages={messages}>
                <div className={classNames(styles['main-page'])}>
                  {this.renderPage()}
                </div>
            </IntlProvider>
        )
    }
}

MainPage.propTypes = propTypes

export default MainPage
