import React from 'react'
import Item from './item'
import style from './index.scss'

export default class Header extends React.Component {
  render() {
    const { data, activeIndex } = this.props
    return (
      <div className={style.header}>
        {data.map((stage, index) => (
          <Item
            key={stage.id}
            stage={stage}
            index={index}
            activeIndex={activeIndex}
            onChangeStage={this.props.onChangeStage}
          />
        ))}
      </div>
    )
  }
}
