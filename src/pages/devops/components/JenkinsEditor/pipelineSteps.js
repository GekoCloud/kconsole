const json = {
  jenkinsfile_structure: {
    title: '流水线结构',
    desc: '在声明式流水线语法中, pipeline 块定义了整个流水线中完成的所有的工作',
    example: `pipeline {
		agent any
		stages {
			stage('Build') { 
				steps {
						// 
				}
			}
			stage('Test') { 
				steps {
						// 
				}
			}
			stage('Deploy') { 
				steps {
						// 
				}
			}
		}
	}`,
  },
  agent: {
    title: 'agent',
    desc:
      'agent 部分指定了整个流水线或特定的部分, 将会在Jenkins环境中执行的位置，这取决于 agent 区域的位置。该部分必须在 pipeline 块的顶层被定义, 但是 stage 级别的使用是可选的。',
    example: `agent {
			node {
				label 'nodejs'
			}
		}`,
    params: [
      {
        name: 'any',
        type: 'string',
        desc: '在任何可用的代理上执行流水线或阶段。例如: agent any',
      },
      {
        name: 'node',
        type: 'string',
        desc: `<pre>agent { label 'labelName' } </pre>`,
      },
      {
        name: 'kubernetes',
        type: 'string',
        desc: `<pre>agent {
					kubernetes {
						//cloud 'kubernetes'
						label 'mypod'
						yaml """
			apiVersion: v1
			kind: Pod
			spec:
				containers:
				- name: maven
					image: maven:3.3.9-jdk-8-alpine
					command: ['cat']
					tty: true
			"""
					}
				}</pre>`,
      },
    ],
  },
  stage: {
    title: '阶段',
    desc:
      "stage 块定义了在整个流水线的执行任务的概念性地不同的的子集(比如 'Build', 'Test' 和 'Deploy' 阶段), 它被许多插件用于可视化 或Jenkins流水线目前的 状态/进展",
    example: `stages {
      stage('pull source code') {
        // some steps
      }
      stage('build') {
        // some steps
      }
    }`,
  },
  steps: {
    title: '步骤',
    desc: 'steps 部分在给定的 stage 指令中执行的定义了一系列的一个或多个steps',
    exampleDesc: 'steps 部分必须包含一个或多个步骤',
    example: `pipeline {
			agent any
			stages {
					stage('Example') {
							steps { 
									echo 'Hello World'
							}
					}
			}
	}`,
  },
  git: {
    title: 'Gitplugin',
    desc: 'Gitstep.Itperformsaclonefromthespecifiedrepository.',
    exampleDesc: 'NotethatthisstepisshorthandforthegenericSCMstep: ',
    example:
      "git(url: 'https://github.com/kubesphere/devops-java-sample.git', credentialsId: 'git-credential', branch: 'master', changelog: true, poll: false)",
    params: [
      {
        name: 'url',
        required: true,
        type: 'string',
        desc: 'Gitrepoadress',
      },
      {
        name: 'credentialsId',
        type: 'string',
        desc: '',
      },
      {
        name: 'branch',
        type: 'string',
        desc: '',
      },
      {
        name: 'changelog',
        type: 'bool',
        desc: '',
      },
      {
        name: 'poll',
        type: 'bool',
        desc: '',
      },
    ],
  },
  checkout: {
    title: 'checkout',
    desc: '',
    example: `checkout(scm: [$class: 'SubversionSCM', locations: [[cancelProcessOnExternalsFail: true,  credentialsId: 'minghaoye', depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: 'urlurl']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']], poll: false)`,
    params: [
      {
        name: 'credentialsId',
        type: 'string',
        desc: '',
      },
      {
        name: 'remote',
        required: true,
        type: 'string',
        desc: '',
      },
    ],
  },
  mail: {
    title: 'mail',
    desc: '此步骤可以定义邮件的发送',
    example: `mail(to: 'example@gamil.com', cc: 'example1@gmail.com', subject: 'This is mail subject', body: 'mail content')`,
    params: [
      {
        name: 'to',
        desc: '',
      },
      {
        name: 'cc',
        desc: '',
      },
      {
        name: 'subject',
        desc: '',
      },
      {
        name: 'body',
        desc: '',
      },
    ],
  },
  withCredentials: {
    title: 'withCredentials',
    desc: '',
    example: `withCredentials([usernamePassword(credentialsId : 'credentialId' ,passwordVariable : 'password' ,usernameVariable : 'user' ,)]) {
			echo 'test'
		}`,
    params: [
      {
        name: 'credentialsId',
      },
      {
        name: 'passwordVariable',
      },
      {
        name: 'usernameVariable',
      },
    ],
  },
  timeout: {
    title: 'timeout',
    desc: '',
    example: `timeout(unit: 'MINUTES', activity: true, time: 30) {
			echo 'test'
		}`,
    params: [
      {
        name: 'unit',
      },
      {
        name: 'activity',
        type: 'bool',
      },
      {
        name: 'time',
        type: 'number',
      },
    ],
  },
  archiveArtifacts: {
    title: 'archiveArtifacts',
    desc: '输出制品以供下载',
    example: ` archiveArtifacts 'target/*.tar'`,
    params: [{ name: 'archiveArtifacts' }],
  },
  sh: {
    title: 'shell',
    desc: '',
    example: `sh 'java -version'`,
  },
  container: {
    title: 'container',
    desc: '',
    example: `        container('node') {
			echo 'test'
		}`,
  },
  waitForQualityGate: {
    title: 'waitForQualityGate',
    desc: '',
    example: `waitForQualityGate 'true'`,
    params: [
      {
        name: 'waitForQualityGate',
      },
    ],
  },
  kubernetesDeploy: {
    title: 'kubernetesDeploy',
    desc:
      '在 kubernetes 集群中进行部署，在持续集成/持续部署的环境当中， 只有那些需要定期更新的资源才应该放到部署步骤当中，所以此步骤大多数时间都在处理部署这类资源.',
    example: `        kubernetesDeploy(enableConfigSubstitution: true, kubeconfigId: 'kube-credential', configs: '/')`,
  },
}

export default json
