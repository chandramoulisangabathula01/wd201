// const http = require('http')
// const fs = require('fs')
// fs.writeFile(
//   'sample.txt',
//   'hello World. Welcome to Node.js File System module.',
//   (err) => {
//     if (err) throw err
//     console.log('File created!')
//   }
// )

// appendFile()

// fs.appendFile("sample.txt", " This is my updated content", (err) => {
//     if (err) throw err;
//     console.log("File updated!");
//   });

// rename()

// fs.rename("sample.txt", "test.txt", (err) => {
//     if (err) throw err;
//     console.log("File name updated!");
//   });

// unlink()

// fs.unlink('test.txt', (err) => {
//   if (err) throw err
//   console.log('File test.txt deleted successfully!');
// })

// reads the textfile with the stream
// const server = http.createServer((req, res) => {
//   const stream = fs.createReadStream('test.txt');
//   stream.pipe(res);
// })
// server.listen(3000);

// const readline = require('require')

// const lineDetail = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// lineDetail.question('please provide your name -', (name) =>{
//   console.log(`Hi ${name}!`)
//   lineDetail.close()
// })
// const args = require('minimist')(process.argv.slice(2));
// console.log(args)

// const args = require('minimist')(process.argv.slice(2), {
//   alias: {
//     n: 'name',
//     a: 'age'
//   }
// })

// const { listenerCount } = require('process')

// fs.readFile('home.html', (err, home) => {
// //   console.log(home.toString())
//   if (err) {
//     throw err
//   }
//   http
//     .createServer((request, response) => {
//       response.writeHeader(200, { 'content-type': 'text/html' })
//       response.write(home)
//       response.end()
//     })
//     .listen(3000)
// })

//

const http = require('http')
const fs = require('fs')
const minimist = require('minimist')

let homeContent = ''
let projectContent = ''
let registrationContent = ''

// Read home.html content
fs.readFile('home.html', (err, home) => {
  if (err) {
    throw err
  }
  homeContent = home
})

// Read project.html content
fs.readFile('project.html', (err, project) => {
  if (err) {
    throw err
  }
  projectContent = project
})

// Read registration.html content
fs.readFile('registration.html', (err, registration) => {
  if (err) {
    throw err
  }
  registrationContent = registration
})

const argv = minimist(process.argv.slice(2))
const port = argv.port || 5000 // Default to port 5000 if not specified

const server = http.createServer((request, response) => {
  const url = request.url
  response.writeHead(200, { 'Content-Type': 'text/html' })

  switch (url) {
    case '/registration':
      response.write(registrationContent)
      break
    case '/project':
      response.write(projectContent)
      break
    default:
      response.write(homeContent)
      break
  }

  response.end()
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
