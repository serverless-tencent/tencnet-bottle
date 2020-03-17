const ensureIterable = require('type/iterable/ensure')
const path = require('path')
const { Component } = require('@serverless/core')

const DEFAULTS = {
  handler: 'index.main_handler',
  runtime: 'Python3.6',
  exclude: ['.git/**', '.gitignore', '.DS_Store']
}

class TencentBottle extends Component {
  async default(inputs = {}) {
    inputs.include = []

    const cachePath = path.join(__dirname, 'component')
    inputs.include = ensureIterable(inputs.include, { default: [] })
    inputs.include.push(cachePath)

    inputs.handelr = DEFAULTS.handler
    inputs.runtime = DEFAULTS.runtime

    const Framework = await this.load('@serverless/tencent-framework')

    const framworkOutpus = await Framework({
      ...inputs,
      ...{
        framework: 'bottle'
      }
    })

    this.state = framworkOutpus
    await this.save()
    return framworkOutpus
  }

  async remove(inputs = {}) {
    const Framework = await this.load('@serverless/tencent-framework')
    await Framework.remove({
      ...inputs,
      ...{
        framework: 'bottle'
      }
    })
    this.state = {}
    await this.save()
    return {}
  }
}

module.exports = TencentBottle
