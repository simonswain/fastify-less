'use strict'

const fs = require('fs')
const Path = require('path')
const less = require('less')
const fp = require('fastify-plugin')

function fastifyLess (fastify, opts, next) {
  if (opts.prefix === undefined) {
    opts.prefix = '/css'
  }

  let cache = {}
  let len = opts.prefix.length + 1

  fastify.get(opts.prefix + '/*', (request, reply) => {
    const path = request.raw.url.substr(len)
    const f = Path.join(opts.root, Path.basename(path, '.css') + '.less')

    if (opts.cache && cache[f]) {
      return reply.header('content-type', 'text/css').send(cache[f])
    }

    fs.readFile(
      f,
      {encoding: 'utf8'},
      (err, res) => {
        if (err) {
          return reply.code(404)
            .header('content-type', 'text/plain')
            .send('not found')
        }
        less.render(res, {
          paths: [opts.root]
        }, (err, res) => {
          if (err) {
            return reply.code(500)
              .header('content-type', 'text/plain')
              .send(err.message)
          }

          if (opts.cache && !cache[f]) {
            cache[f] = res.css
          }

          reply.header('content-type', 'text/css').send(res.css)
        })
      })
  })
  next()
}

module.exports = fp(fastifyLess, {
  fastify: '>= 1.2.0',
  name: 'fastify-staticless'
})
