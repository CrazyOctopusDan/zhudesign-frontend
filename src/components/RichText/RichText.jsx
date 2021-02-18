import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.less'

const RichText = ({ value, onChange, kind }) => {
  const [isInit, setInit] = useState(false)
  const textRef = useRef()

  const _onChange = (evt) => {
    const _reg1 = /<div>/g
    const _reg2 = /<\/div>/g
    // let _val = evt.target.innerHTML
    let _val = evt.target.innerHTML.replace(_reg1, '<br>').replace(_reg2, '')

    onChange(kind, _val)
  }

  useEffect(() => {
    if (!isInit && value) {
      textRef.current.innerHTML = value
      setInit(true)
    }
  }, [value, isInit])

  return (
    <div
      ref={textRef}
      className={styles.richText} 
      contentEditable 
      // dangerouslySetInnerHTML={{__html: value}} 
      onInput={_onChange}
    />
  )
}

export default RichText
