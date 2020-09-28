import React from 'react'
import Link from 'next/link'
import styles from './menu-item.module.scss'

const MenuItem = ({ children, href }) => (
  <Link href={href}>
    <div className={styles.menuItem}>{children}</div>
  </Link>
)

export default MenuItem
