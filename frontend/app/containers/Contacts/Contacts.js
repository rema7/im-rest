import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    contacts: PropTypes.array.isRequired,
}

class Contacts extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>Contacts</div>
        )
    }
}

Contacts.propTypes = propTypes

export default Contacts