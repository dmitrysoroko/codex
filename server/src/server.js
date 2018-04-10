import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import Octokit from '@octokit/rest'
import mcache from 'memory-cache'

const octokit = new Octokit()

const app = express()
const upload = multer()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

octokit.authenticate({
  type: 'basic',
  username: '',
  password: ''
})

let requestCount = 0

function waitForCondition() {
  return new Promise((resolve, reject) => {
    const start_time = Date.now()
    function checkFlag() {
      if (requestCount < 3) {
        resolve()
      } else if (Date.now() > start_time + 5000) {
        reject(new Error('timeout'))
      } else {
        setTimeout(checkFlag, 500)
      }
    }
    checkFlag()
  })
}

async function githubRequest (method, config) {
  let key = `${method}_${JSON.stringify(config)}`
  let cached = mcache.get(key)

  if (cached) {
    return cached
  } else {
    try {
      await waitForCondition()
      requestCount++
      let response = await method(config)
      let {data} = response
      while (octokit.hasNextPage(response) && config.page > 1) {
        response = await octokit.getNextPage(response)
        data = data.concat(response.data)
      }
      requestCount--
      mcache.put(key, data, 6000 * 1000);
      return data
    } catch(error) {
      return Promise.reject(error)
    }
  }
}

app.get('/getRepos', (req, res) => {
  const config = {
    org: 'facebook',
    per_page: 100
  }

  githubRequest(octokit.repos.getForOrg, config)
    .then(result => {
      res.type('json')
      res.send(result)
    })
    .catch(err => console.log(err))
})

app.get('/getCommits/:repo', (req, res) => {
  const config = {
    owner: 'facebook',
    repo: req.params.repo,
    page: 1,
    per_page: 100
  }

  githubRequest(octokit.repos.getCommits, config)
    .then(result => {
      res.type('json')
      res.send(result)
    })
    .catch(err => console.log(err))
})


export default app
