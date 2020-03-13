import React from 'react'
import { Icon } from '@pitrix/lego-ui'
import { PIPELINE_TASK_ICON, PIPELINE_TASK_DESC } from 'utils/constants'
import STEPS from './pipelineSteps'
import styles from './index.scss'

export default class Sider extends React.Component {
  constructor() {
    super()
    this.tasks = Object.keys(STEPS)
  }

  static defaultProps = {
    onTaskClick: () => {},
  }

  handleTaskClick = task => () => this.props.onTaskClick(task)

  render() {
    return (
      <div className={styles.stepsContainer}>
        {this.tasks.map(task => (
          <div
            className={styles.task}
            key={task}
            onClick={this.handleTaskClick(task)}
          >
            <div className={styles.taskIcon}>
              <Icon name={PIPELINE_TASK_ICON[task] || 'cdn'} size={24} />
            </div>
            <div className={styles.taskInfo}>
              <div className={styles.taskName}>{t(task)}</div>
              <div className={styles.desc}>
                {t(PIPELINE_TASK_DESC[task]) || '-'}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
