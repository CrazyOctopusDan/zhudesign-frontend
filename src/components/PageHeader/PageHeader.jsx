import React from 'react'
import styles from './styles.module.less'

const PageHeader = ({ history, needShortTips = false }) => {
  return (
    <div className={styles.pageHeader}>
      <h1 onClick={() => history.push('/')}>ZHUYICHEN DESIGN</h1>

      <div className="link" onClick={() => history.push('/aboutMe')}>ABOUT ME</div>

      {needShortTips && (
        <div className="short-tips">
          <p className="sec">ZHUYICHEN DESIGN 是全球顶尖的设计师 拥有多项大型项目的设计经验</p>
          <p>CONTACT ME:</p>
          <p>+86-16657120812</p>
        </div>
      )}
    </div>
  )
}

export default PageHeader
