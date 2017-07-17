import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    leftFocus: PropTypes.func.isRequired,
}

class Search extends React.PureComponent {
    constructor(props) {
        super(props)
        
        this.state = {
            search : '',
        }

        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleSearchChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
        })
    }

    handleInputKeyDown(e) {
        if (e.key === 'Escape') {
            this.setState({
                search: '',
            })
            this.props.leftFocus()
        }
    }

    handleBlur() {
        this.props.leftFocus()
    }

    render() {
        return (
            <div>
                <input className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search"
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleBlur}
                />
            </div>
        )
    }
}

Search.propTypes = propTypes

export default Search