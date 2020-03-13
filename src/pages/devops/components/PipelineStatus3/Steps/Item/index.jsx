/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import classnames from 'classnames'
import { Icon, Loading } from '@pitrix/lego-ui'
import { observer } from 'mobx-react'

import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import { formatUsedTime } from 'utils'
import LogStore from 'stores/devops/log'

import styles from './index.scss'

@observer
export default class Step extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLog: false,
    }
    this.LogContent = React.createRef()
    this.store = new LogStore()
  }

  componentDidMount() {
    this.refreshTimer = setInterval(this.handleRefresh, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
  }

  handleRefresh = () => {
    const { step } = this.props
    const { hasMore } = this.store.stepLogData

    if (this.state.showLog && (hasMore || step.state !== 'FINISHED')) {
      this.getLog()
    }
  }

  toggleShowLog = () => {
    const { showLog } = this.state
    if (!showLog) {
      this.getLog()
    } else {
      clearTimeout(this.refreshTimer)
    }
    this.setState({ showLog: !showLog })
  }

  getLog = async () => {
    const { step, params, nodeid } = this.props

    await this.store.getStepLog({ ...params, nodeid, stepid: step.id })

    this.handleScrollToBottom()
  }

  handleScrollToBottom = () => {
    const LogContent = this.LogContent.current
    if (LogContent) {
      LogContent.scrollTop = LogContent.scrollHeight
    }
  }

  showLog = () => {
    this.setState({ showLog: true })
  }

  stopPropagation = e => {
    e && e.stopPropagation()
  }

  renderLog = () => {
    const { log, isLoading } = this.store.stepLogData
    if (!this.state.showLog) {
      return null
    }

    if (isLoading) {
      return (
        <div className={styles.logContent} onClick={this.stopPropagation}>
          <Loading />
        </div>
      )
    }

    return (
      <div className={styles.logContent} onClick={this.stopPropagation}>
        <pre ref={this.LogContent}>{log || t('Log is loading...')}</pre>
      </div>
    )
  }

  render() {
    const { step = {}, loading } = this.props
    const { displayName, durationInMillis } = step

    if (loading) {
      return null
    }

    return (
      <ul
        className={classnames(styles.item, {
          [styles.active]: this.state.showLog,
        })}
        onClick={this.toggleShowLog}
      >
        <li>
          <div className={styles.value}>{displayName}</div>
          <div className={styles.label}>{t('Name')}</div>
        </li>
        <li>
          <div className={styles.value}>
            <Status {...getPipelineStatus(step)} hasLabel={false} />
          </div>
          <div className={styles.label}>{t('Status')}</div>
        </li>
        <li>
          <div className={styles.value}>{formatUsedTime(durationInMillis)}</div>
          <div className={styles.label}>{t('Use time')}</div>
        </li>
        <Icon className={styles.icon} name="chevron-down" />
        {this.renderLog()}
      </ul>
    )
  }
}
