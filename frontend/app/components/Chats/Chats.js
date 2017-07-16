import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    chats: PropTypes.array.isRequired,
}

class Chats extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>Chats</div>
        )
    }
}

Chats.propTypes = propTypes

export default Chats