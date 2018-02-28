const http = require('http')
const fs = require('fs')
const ejs = require('ejs')
const url = require('url')

const index_page = fs.readFileSync('./index.ejs', 'utf8')
const other_page = fs.readFileSync('./other.ejs', 'utf8')

const style_css = fs.readFileSync('./style.css', 'utf8')

let server = http.createServer(getFromClient)

server.listen(3000)
console.log('Server Start!')

function getFromClient(request, response){
  // URLのルーティング
  const url_parts = url.parse(request.url, true)
  switch (url_parts.pathname) {
    case '/':
      let message = "これはIndexページです。"
      const query = url_parts.query
      if(query.msg != undefined){
        message += "あなたは、「" + query.msg + "」と送りました"
      }
      const content = ejs.render(index_page, {
        title: "Index",
        content: message,
      })
      response.writeHead(200, {'Content-Type' : 'text/html'})
      response.write(content)
      response.end()
      break

    case '/style.css':
      response.writeHead(200, {'Content-Type': 'text/css'})
      response.write(style_css)
      response.end()
      break

    case '/other':
      const other_content = ejs.render(other_page, {
        title: "Other",
        content: "これは新しく用意したページです",
      })
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(other_content)
      response.end()
      break

    default:
      response.writeHead(200, {'Content-Type':  'text/html'})
      response.end('no page...')
      break
  }
}
