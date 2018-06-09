# fastify-less

Plugin for serving less

# Install

`npm install --save fastify-less`

## Usage

Place your less files in a folder. Add the plugin to serve them up.

```bash
.
├── less
│   └── style.less
├── public
│   └── index.html
└── server.js
```

```js
const fastify = require('fastify')()
const path = require('path')
fastify.register(require('fastify-static'), {
  prefix: '/css',
  root: Path.join(__dirname, 'public/less'),
  cache: false
})
```

```html
<link rel="stylesheet" type="text/css" href="/css/style.css"></link>
```

## Options

#### `root` (required)

Absolute path to the directory containt less files. The filename requested will be appended to this path. Requests for a file ending in `.css` will seek a matching `.less` file.

#### `prefix`

Default: `'/css'`

The mountpoint the files are served from.

#### `cache` 

Default: `false`

In-memory cache the rendered less. Omit in development so files can be reloaded when changed.


## License

Licensed under [MIT](./LICENSE)
