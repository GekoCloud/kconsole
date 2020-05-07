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

const init = () => {
  let theme = localStorage.getItem('ks-theme')
  if (!theme) {
    theme = 'light'
    localStorage.setItem('ks-theme', theme)
  }

  const $theme = document.querySelector('#ks-theme')
  if ($theme) {
    $theme.href = `/assets/themes/${theme}.css`
  } else {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<link id="ks-theme" href="/assets/themes/${theme}.css?v=" rel="stylesheet" media="all">`
    )
  }
}

const switchTheme = () => {
  const theme = localStorage.getItem('ks-theme')
  localStorage.setItem('ks-theme', theme === 'dark' ? 'light' : 'dark')
  init()
}

export default { init, switchTheme }
