const http = require('http')
const argv = require('yargs')
  .option('port', {
    alias: 'p',
    default: '8080',
  })
  .option('status-code', {
    default: 500
  })
  .option('response-type', {
    choices: ['nothing', 'invalid-json', 'random-json'],
    default: 'nothing',
  })
  .argv

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomOpt = (a, b) => randomInt(0,1) ? a() : b()

const ascii_upper_min = 65
const ascii_upper_max = 90
const ascii_lower_min = 97
const ascii_lower_max = 122
const randomChar = () =>
  String.fromCharCode(
    randomOpt(
      () => randomInt(ascii_lower_min, ascii_lower_max),
      () => randomInt(ascii_upper_min, ascii_upper_max)
    )
  )

const generateRandomJSON = () => {
  let output = '{'
  for (let i = 0; i < 10; i++) {
    output += `"`
    for (let j = 0; j < 5; j++) output += randomChar()
    output += `":"`
    for (let j = 0; j < 5; j++) output += randomChar()
    output += `",`
  }
  return output.slice(0, -1) + '}'
}

const server = http.createServer((req, res) => {
  let content = ''
  switch (argv['response-type']) {
    case 'invalid-json':
      content = '{'
      break
    case 'random-json':
      content = generateRandomJSON()
      break
  }

  console.log(`➡ ${req.method} ${req.url}`)
  console.log(`⬅ ${argv['status-code']} ${content}`)
  console.log('')

  res.writeHead(argv['status-code'])
  res.end(content)
})

server.listen(argv.port)
console.log(`listening on port ${argv.port}`)
