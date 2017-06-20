import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    jwt: PropTypes.string,
    register: PropTypes.func,
    login: PropTypes.func,
}


class Auth extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            code: null,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
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
        
    }

    render() {

        return (
            <div className="container">
                <h3>Complete</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Code:
                    <input
                        name="code"
                        type="number"
                        value={this.state.code}
                        onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

Auth.propTypes = propTypes

export default Auth
