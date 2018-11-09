const http = require('http')
const argv = require('yargs')
  .option('port', {
    alias: 'p',
    default: '8080',
  })
  .argv

const server = http.createServer((req, res) => {
  res.writeHead(500)
  res.end()
})

server.listen(argv.port)
console.log(`listening on port ${argv.port}`)
