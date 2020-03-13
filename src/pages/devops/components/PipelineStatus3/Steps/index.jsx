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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'

import Step from './Item'

import styles from './index.scss'

@observer
export default class StepsCard extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    title: PropTypes.string,
    stage: PropTypes.any,
  }

  static defaultProps = {
    stage: {},
  }

  renderHeader = () => <div className={styles.header} />

  renderContent() {
    const { stage } = this.props

    return (
      <div className={styles.body}>
        {isEmpty(stage.steps) ? (
          <div className={styles.empty}>{t('RESOURCE_NOT_FOUND')}</div>
        ) : (
          stage.steps.map(step => this.renderItem(step, stage))
        )}
      </div>
    )
  }

  renderItem(step, stage) {
    const { params } = this.props
    return <Step key={step.id} step={step} params={params} nodeid={stage.id} />
  }

  render() {
    const { className } = this.props

    return (
      <div className={classnames(className, styles.content)}>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    )
  }
}
