import http from 'http'
import app from './server'

const server = http.createServer(app)
let currentApp = app

const port = 6000
server.listen(port, () => {
	console.log(`API start at port ${port}`)
})

if (NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./server', () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
