import React from 'react'
import classNames from 'classnames'
import style from './index.scss'

export default function renderConnectDot(type) {
  return (
    <span className={classNames(style.connect, style[type])}>
      <span />
      <span />
      <span />
    </span>
  )
}
