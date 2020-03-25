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

import { Modal, Notify } from 'components/Base'
import ProjectCreateModal from 'components/Modals/ProjectCreate'
import EditModal from 'components/Modals/DevOpsEdit'

export default {
  'workspace.devops.create': {
    on({ store, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.create(data, { workspace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}!` })
            success && success()
          })
        },
        type: 'devops',
        formTemplate: {},
        modal: ProjectCreateModal,
        store,
        ...props,
      })
    },
  },
  'workspace.devops.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          store.update(detail.project_id, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        modal: EditModal,
        detail,
        store,
        ...props,
      })
    },
  },
}
