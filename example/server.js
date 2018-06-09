'use strict'

const path = require('path')
const fastify = require('fastify')()

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '/public')
})

fastify.register(require('../'), {
  root: path.join(__dirname, 'less'),
  prefix: '/css',
  cache: false
})

fastify.listen(3000, err => {
  if (err) throw err
})
