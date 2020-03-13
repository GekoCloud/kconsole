import React from 'react'
import { Icon } from '@pitrix/lego-ui'
import classNames from 'classnames'
import { get, isEmpty } from 'lodash'
import { PIPELINE_TASK_ICON, PIPELINE_TASK_DESC } from 'utils/constants'

import { ReactComponent as CollapsIcon } from 'src/assets/git.svg'
import STEPS from './pipelineSteps'
import styles from './example.scss'

export default class Example extends React.Component {
  static defaultProps = {
    onTaskClick: () => {},
    onCollapsClick: () => {},
  }

  get stepDesc() {
    const { taskName } = this.props
    return STEPS[taskName] || {}
  }

  renderParams = () => {
    const params = get(this.stepDesc, 'params', [])
    if (!isEmpty(params)) {
      return (
        <>
          <p className={styles.itemTitle}>{t('Params')}:</p>
          <table>
            <thead>
              <tr>
                <th>字段</th>
                <th>类型</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              {params.map(param => (
                <tr key={param.name}>
                  <td>{param.name}</td>
                  <td>{param.type || 'string'}</td>
                  <td>
                    {param.desc ? (
                      <span dangerouslySetInnerHTML={{ __html: param.desc }} />
                    ) : (
                      t(param.name)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )
    }
  }

  render() {
    const { taskName, onCollapsClick } = this.props
    return (
      <div
        className={classNames(
          styles.exampleContainer,
          { [styles.show]: taskName },
          { [styles.hide]: !taskName }
        )}
      >
        <div className={styles.header}>
          <div className={styles.taskIcon}>
            <Icon name={PIPELINE_TASK_ICON[taskName] || 'cdn'} size={24} />
          </div>
          <div className={styles.taskInfo}>
            <div className={styles.taskName}>{t(taskName)}</div>
            <div className={styles.desc}>
              {t(PIPELINE_TASK_DESC[taskName]) || '-'}
            </div>
          </div>
          <div className={styles.collapsIcon} onClick={onCollapsClick}>
            <CollapsIcon />
          </div>
        </div>
        <div className={styles.title}>
          <div className={styles.header}>
            <div className={styles.taskIcon}>
              <Icon name={'cdn'} size={24} />
            </div>
            <div className={styles.taskInfo}>
              <div className={styles.taskName}>任务详情</div>
              <div className={styles.desc}>{'-'}</div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.name}>{this.stepDesc.title || taskName}</p>
          <p className={styles.desc}>{this.stepDesc.desc}</p>
          <p className={styles.itemTitle}>{t('Example')}:</p>
          <p>{this.stepDesc.exampleDesc}</p>
          <pre>{this.stepDesc.example}</pre>
          {this.renderParams()}
        </div>
      </div>
    )
  }
}
