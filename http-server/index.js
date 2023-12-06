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

const http = require('http')
const fs = require('fs')
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
let homeContent = ''
let projectContent = ''
// let registrationcontent = ''

fs.readFile('home.html', (err, home) => {
  if (err) {
    throw err
  }
  homeContent = home
})

fs.readFile('project.html', (err, project) => {
  if (err) {
    throw err
  }
  projectContent = project
})
// fs.readFile('registration.html', (err, registration) => {
//   if (err) {
//     throw err
//   }
//   registrationcontent = registration
// })

http
  .createServer((request, response) => {
    const url = request.url
    response.writeHeader(200, { 'Content-Type': 'text/html' })
    switch (url) {
      case '/registration':
        // response.write(projectContent)
        response.end()
        break
      case '/project':
        response.write(projectContent)
        response.end()
        break
      default:
        response.write(homeContent)
        response.end()
        break
    }
  })
  .listen(3000)
