import * as path from 'path'

export class MockViewEngine {
  public viewEngine(app, viewsPath) {
    app.engine('mock', function (filePath, options, callback) {
      let rendered = `${filePath}: ${JSON.stringify(options)}`
      return callback(null, rendered)
    })
    app.set('view engine', 'mock')
    app.set('views', path.join(__dirname, viewsPath))
  }
}
