import React from 'react'
import styles from './styles.module.less'

const RichText = ({ value, onChange, kind }) => {
  const _onChange = (evt) => {
    const _reg1 = /<div>/g
    const _reg2 = /<\/div>/g
    let _val = evt.target.innerHTML.replace(_reg1, '<br>').replace(_reg2, '')

    onChange(_val, kind)
  }

  return (
    <div 
      className={styles.richText} 
      contentEditable 
      dangerouslySetInnerHTML={{__html: value}} 
      onInput={_onChange}
    />
  )
}

export default RichText
