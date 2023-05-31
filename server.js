import * as path from 'path'
import {
    Server
} from 'socket.io'
import express from 'express'
import http from "http"

const app = express()
const server = http.createServer(app)
const ioServer = new Server(server)
const port = process.env.PORT || 8000

// Serveer client-side bestanden
app.use(express.static(path.resolve('public')))

// user const
const names = {}

// connecten event voor user (connection event)
ioServer.on('connection', (socket) => {

    console.log('a user connected');

    // disconnect event voor user
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    // user joined
    socket.on('new-user', (clientName) => {

        // client naam toevoegen aan names object, met als key de id van de socket (zo maak je unieke data voor namen)
        names[socket.client.id] = clientName

        socket.broadcast.emit('user-connected', clientName)

    })

    // broadcasting van message naar andere clients
    socket.on('message', (message) => {

        // server stuurt de message nu naar de andere sockets
        ioServer.emit('message', {
            message: message,
            name: names[socket.client.id]
        })
    })
});

// listens to port
server.listen(port, () => {
    console.log('listening on http://localhost:' + port);
});