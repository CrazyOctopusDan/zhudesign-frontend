import React from 'react'
import styles from './Error.style.module.less'

const Error404 = ({ desc }) => {
  return (
    <div className={styles.notFoundBox}>
      <p>{desc}</p>
    </div>
  )
}

Error404.defaultProps = {
  desc: '未知领域，请返回主页'
}

export default Error404
