# PRW3

# Requirements

- node.js
- npm
- alot of time

# Install

```
npm install
cp .env.example .env
# complete your .env
vim .env
npm run build
```

Everything is now built in the `build/` folder.

## Serving this

Express app

```
const express = require('express')
const app = express()
app.use(express.static('build'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


# Description

This is a react-redux ui, built for the cpnv datalab.

This project allows people to see where, and how much of their tax money goes to the state.


```

# Redux store

Since redux allows to compose reducers, you can see a complete representation of the store in [store.md](store.md)