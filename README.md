# PRW3

# Install

```
npm install
cp .env.example .env
# complete your .env
vim .env
npm run build
```

Everything is now built in the `public/` folder.

## Serving this

Express app

```
const express = require('express')
const app = express()
app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

```