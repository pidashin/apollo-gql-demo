import React from 'react'
import styles from './page-container.module.scss'
import Footer from './footer'

const PageContainer = ({ children }) => {
  return (
    <>
      <div className={styles.bar} />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  )
}

export default PageContainer
