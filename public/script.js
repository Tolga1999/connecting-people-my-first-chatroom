// maak variable voor io
let client = io();

let form = document.querySelector('form')
let input = document.querySelector('input')

let messages = document.getElementById('messages')

form.addEventListener('submit', (event) => {

    // prevent default submit van pagina (pagina refreshed niet meer)
    event.preventDefault()

    // verstuurd formulier data naar io server
    if (input.value) {
        client.emit('message', input.value)

        // input veld weer leeg gooien nadat de waarde emit is naar de io server is gestuurd
        input.value = ''
    }
})

// toevoegen van emit aan de pagina
client.on('message', (data) => {
    let item = document.createElement('li');
    item.textContent = data.clientName + " " + data.message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

// prompt, vraagt naam van user (value later te gebruiken)
const clientName = prompt("Wat is jouw naam?")

// toevoegen van joined wanneer user connected is
let joined = document.createElement('li');
joined.textContent = "You joined"
messages.appendChild(joined)

client.emit('new-user', clientName)

client.on('user-connected', (clientName) => {
    let itemConnected = document.createElement('li');
    itemConnected.textContent = clientName + ' connected';
    messages.appendChild(itemConnected);
    window.scrollTo(0, document.body.scrollHeight);
})