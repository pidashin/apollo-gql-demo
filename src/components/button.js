import React from 'react'
import styles from './button.module.scss'

const Button = (props) => (<button className={styles.btn} {...props} />)

export default Button