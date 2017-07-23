import React from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'

import { Loader } from 'components'
import { LoginPage, ChatPage } from 'containers'
import { accidentMessages, getCurrentLanguage, localeDataHash } from 'helpers/locale'

const propTypes = {
    session: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    
    init: PropTypes.func.isRequired,
}

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.language = getCurrentLanguage()
    }
    
    componentWillMount() {
        addLocaleData(localeDataHash[this.language])
        this.props.init()
    }

    renderPage() {
        if (this.props.loading)
            return <Loader />
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
                {this.renderPage()}
            </IntlProvider>
        )
    }
}

MainPage.propTypes = propTypes

export default MainPage
