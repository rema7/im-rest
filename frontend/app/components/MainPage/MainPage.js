import React from 'react'
import PropTypes from 'prop-types'

import {LoginPage, ChatPage} from 'containers'

const propTypes = {
    session: PropTypes.string,
}

class MainPage extends React.Component {
    constructor(props) {
        super(props)
    }
    
    renderPage() {
        if (this.props.session === null)
            return <LoginPage/>
        else
            return <ChatPage/>
    }

    render() {
        return (
            <div>
               <h1>app</h1>
               {this.renderPage()}
            </div>
        )
    }
}

MainPage.propTypes = propTypes

export default MainPage
