import React from 'react'
import PropTypes from 'prop-types'
import Portal from 'react-portal'
import classNames from 'classnames'

import styles from './Dialog.scss'

const propTypes = {
    children: PropTypes.node.isRequired,
    isOpened: PropTypes.bool.isRequired,
}

class Dialog extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const classNameBase = classNames(styles.base, {
            [styles.isOpened]: this.props.isOpened,
        })

        const dialog = (
            <div className={classNameBase}>
                <div className={styles.wrapper}>
                    <div className={styles.body}>
                        <main className={styles.content}>
                            {this.props.children}
                        </main>
                    </div>
                </div>
                <div className={styles.overlay} />
            </div>
        )
        return <Portal closeOnEsc closeOnOutsideClick isOpened>{dialog}</Portal>
    }
}

Dialog.propTypes = propTypes

export default Dialog