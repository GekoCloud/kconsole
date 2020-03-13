import React from 'react'
import PropTypes from 'prop-types'

import CodeEditor from 'components/Base/CodeEditor'
import PipelineStore from 'stores/devops/pipelines'
import { ReactComponent as JenkinsIcon } from 'src/assets/git.svg'

import Sider from './sider'
import Example from './example'
import styles from './index.scss'

export default class JenkinsEdit extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.store = new PipelineStore()
    this.state = { value: props.defaultValue, taskName: '' }
  }

  componentDidMount() {
    this.getEditorInstance()
  }

  showExample = task => {
    this.setState({ taskName: task })
  }

  hideExample = () => {
    this.setState({ taskName: '' })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.state.value) {
      this.setState({ value: nextProps.defaultValue })
    }
  }

  handleChange = value => {
    this.newValue = value
  }

  getEditorInstance = editor => {
    this.editor = editor
  }

  checkScriptCompile = async () => {
    this.setState({ checkLoading: true })
    const res = await this.store
      .checkScriptCompile(this.newValue)
      .finally(() => {
        this.setState({ checkLoading: false })
      })
    if (res.status === 'fail') {
      this.setState({ error: res })
      return res
    }
    this.setState({ error: null })
    return false
  }

  showError = () => {
    this.editor.operation(() => {
      const dom = document.createElement('DIV')
      dom.innerHTML = '123'
      this.editor.addLineWidget(10 - 1, dom, {
        coverGutter: false,
        noHScroll: true,
      })
    })
  }

  handleOk = async () => {
    this.showError(hasError)

    if (!this.newValue) {
      this.newValue = this.state.value
    }
    this.newValue = this.newValue.replace(/\t/g, '    ')
    const hasError = await this.checkScriptCompile()
    if (hasError) {
      this.showError(hasError)
      return
    }
    this.props.onOk(this.newValue)
  }

  renderFooter = () => {
    if (this.state.error) {
      return (
        <div className={styles.checkResult}>
          <p>{t('Jenkinsfile syntax error, message')}:</p>
          <p>
            <span>
              {t('Lines of code')}: {this.state.error.line},
            </span>
            {this.state.error.message}
          </p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.codeEditorContainer} onClick={this.hideExample}>
          <div className={styles.header}>
            <JenkinsIcon size={20} />
            <span>Jenkinsfile</span>
          </div>
          <CodeEditor
            className={styles.codeEditor}
            name="script"
            mode="groovy"
            value={this.state.value}
            onChange={this.handleChange}
            getEditorInstance={this.getEditorInstance}
          />
        </div>
        <Sider onTaskClick={this.showExample} />
        <Example
          taskName={this.state.taskName}
          onCollapsClick={this.hideExample}
        />
      </div>
    )
  }
}
