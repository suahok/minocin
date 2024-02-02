import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import dotenv from 'dotenv'

function readEnvironment(filename: string) {
  return readFileSync(resolve(__dirname, filename))
}

export function getClientEnvironment(NODE_ENV: string = '') {
  const ENV_PREFIX = 'VUE_'
  const common = readEnvironment('.env')
  const mutation = readEnvironment(`.env${NODE_ENV}`)
  const commonConfig = dotenv.parse(common)
  const mutationConfig = dotenv.parse(mutation)
  const envConfig = Object.assign({}, commonConfig, mutationConfig)
  for (const key in envConfig) {
    process.env[key] = envConfig[key]
  }

  const raw = Object.keys(process.env)
    .filter(key => key.startsWith(ENV_PREFIX))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
      {
        NODE_ENV: NODE_ENV?.replace('.', '')
      }
    )

  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {})
  }

  return { raw, stringified }
}
