import React, { useState, useEffect } from 'react'
import styles from './styles.module.less'

import { getIntro } from '../../services'

const PageHeader = ({ history, needShortTips = false }) => {
  const [summary, setSummary] = useState('')

  useEffect(() => {
    async function getSum() {
      try {
        const { data } = await getIntro()
  
        setSummary(data?.summary || '')
      } catch (error) {
        console.error('在header上面获取信息出错：', error)
      }
    }

    getSum()
  }, [])

  return (
    <div className={styles.pageHeader}>
      <h1 onClick={() => history.push('/')}>ZHUYICHEN DESIGN</h1>

      <div className="link" onClick={() => history.push('/aboutMe')}>ABOUT ME</div>

      {needShortTips && (
        <div className="short-tips" dangerouslySetInnerHTML={{__html: summary}} />
      )}
    </div>
  )
}

export default PageHeader
