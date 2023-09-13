
require('dotenv').config()

let PORT = process.env.PORT
let DB_URL = process.env.DB_URL

module.exports = {
  DB_URL,
  PORT
}