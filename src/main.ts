import * as core from '@actions/core'

import {NodeSSH} from 'node-ssh'

async function run(): Promise<void> {
  try {
    const host: string = core.getInput('host')
    const username: string = core.getInput('username')
    const key: string = core.getInput('key')
    const port: string = core.getInput('port')
    const script: string = core.getInput('script')

    core.debug(`host: ${host}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`username: ${username}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`port: ${port}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`script: ${script}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    let ssh = new NodeSSH()

    core.debug('connecting')
    ssh = await ssh.connect({
      host,
      username,
      privateKey: key
    })
    core.debug('connected')

    const result = await ssh.exec(script, [], {})
    core.debug(`result: ${result}`)

    ssh.dispose()
    // await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
