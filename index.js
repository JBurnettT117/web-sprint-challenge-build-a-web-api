require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = require("./api/server")

const PORT = process.env.PORT || 9000

server.use(express.json())
server.use(cors())

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})


