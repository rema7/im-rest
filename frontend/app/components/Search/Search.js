import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import styles from './Search.scss'

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
        this.clickHandler = this.clickHandler.bind(this)
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

    clickHandler(e) {
        e.stopPropagation()
        e.preventDefault()
    }

    render() {
        return (
            <div className={classNames(styles['search-form'])}>
                <input className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search"
                    value={this.state.search}
                    onClick={this.clickHandler}
                    onChange={this.handleSearchChange}
                    onKeyDown={this.handleInputKeyDown}
                />
            </div>
        )
    }
}

Search.propTypes = propTypes

export default Search