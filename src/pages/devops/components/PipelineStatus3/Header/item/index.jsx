import React from 'react'
import classnames from 'classnames'
import { isArray, get } from 'lodash'
import renderConnectDot from '../ConnectDot'
import style from './index.scss'

export default class Header extends React.Component {
  handleChangeActiveMultiStage = e => {
    const { index } = e.currentTarget.dataset
    this.props.onChange([this.props.index, index])
  }

  handleActiveStageChange = () => {
    this.props.onChangeStage([this.props.index])
  }

  getStageStatus = node => {
    const { steps = [] } = node
    const hasError = steps.find(step => {
      const isFailed = step.state === 'FINISHED' && step.result !== 'SUCCESS'
      return isFailed ? step : null
    })
    if (hasError && node.result === 'FAILURE') {
      return 'error'
    }
    // has no difference between aborted status and queue status
    // need run detail status to judge
    const isAbort =
      (this.context.result === 'ABORTED' ||
        this.context.result === 'FAILURE') &&
      !node.result
    if (isAbort) {
      return 'abort'
    }
    const isQueue = !isAbort && (!node.state || node.state === 'QUEUED')
    if (isQueue) {
      return 'queued'
    }
    const isPaused = get(node, 'state', '') === 'PAUSED'
    if (isPaused) {
      return 'paused'
    }
    const isSkipped = get(node, 'state', '') === 'SKIPPED'
    if (isSkipped) {
      return 'skipped'
    }
    if (get(node, 'state', '') !== 'FINISHED') {
      return 'running'
    }
    return 'success'
  }

  render() {
    const { stage, activeIndex = [], index } = this.props
    const [line, colum] = activeIndex
    if (isArray(stage)) {
      return (
        <>
          {renderConnectDot('green')}
          <div className={classnames(style.multiStage, {})}>
            {stage.map((_stage, _index) => (
              <div
                className={classnames(
                  style[this.getStageStatus(_stage)],
                  style.stage,
                  {
                    [style.active]: colum === _index,
                  }
                )}
                key={_stage.id}
                data-index={_index}
                onClick={this.handleChangeActiveMultiStage}
              >
                {colum === _index ? (
                  _stage.displayName
                ) : (
                  <span className={style['dot-deep']} />
                )}
              </div>
            ))}
          </div>
        </>
      )
    }

    const status = this.getStageStatus(stage)

    return (
      <>
        {renderConnectDot('green')}
        <div
          className={classnames(style[status], style.stage, {
            [style.active]: line === index,
          })}
          onClick={this.handleActiveStageChange}
        >
          {stage.displayName}
        </div>
      </>
    )
  }
}
