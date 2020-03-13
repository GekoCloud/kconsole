import React from 'react'
import { get } from 'lodash'
import Header from './Header'
import Steps from './Steps'
// import style from './index.scss'

export default class PipelineStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStage: get(props.jsonData, '[0]', {}),
      activeIndex: [0],
    }
  }

  handleChange = activeIndex => {
    const [line, colum] = activeIndex
    let currentStage = {}
    if (colum === undefined) {
      currentStage = get(this.props.jsonData, `[${line}]`, {})
    } else {
      currentStage = get(this.props.jsonData, `[${line}][${colum}]`, {})
    }
    this.setState({ currentStage, activeIndex })
  }

  renderHeader = () => {
    const { jsonData } = this.props

    return (
      <Header
        activeIndex={this.state.activeIndex}
        data={jsonData}
        onChangeStage={this.handleChange}
      />
    )
  }

  renderSteps = () => {
    const { currentStage } = this.state

    return <Steps stage={currentStage} params={this.props.params} />
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderSteps()}
      </div>
    )
  }
}
