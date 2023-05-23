import * as path from 'path'
import {
    Server
} from 'socket.io'
import express from 'express'
import http from "http"

const app = express()
const server = http.createServer(app)
const ioServer = new Server(server)

// Serveer client-side bestanden
app.use(express.static(path.resolve('public')))

// alle users
const clientNames = {}

// connecten event voor user (connection event)
ioServer.on('connection', (client) => {

    console.log('a user connected');

    // disconnect event voor user
    client.on('disconnect', () => {
        console.log('user disconnected')
    })

    // user joined
    client.on('new-user', (clientName) => {
        // elke unieke user krijgt een naam
        clientNames[ioServer.id] = clientName
        // user connected, wordt geemit naar clients
        ioServer.emit('user-connected', clientName)

    })

    // broadcasting van message naar andere clients
    client.on('message', (message) => {
        // console log van message vanuit client side js
        console.log('message ' + message)

        // server stuurt de message nu naar de andere clients
        ioServer.emit('message', {
            message: message,
            clientName: clientName[ioServer.id]
        })
    })
});

// listens to port
server.listen(8000, () => {
    console.log('listening on http://localhost:8000');
});