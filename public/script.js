// maak variable voor io
let client = io();

// selecteren van form, input en messages
let form = document.querySelector('form')
let input = document.querySelector('input')
let messages = document.getElementById('messages')

// user connected server afhandeling
client.on('user-connected', (clientName) => {
    let itemConnected = document.createElement('li');
    itemConnected.textContent = clientName + ' connected';
    messages.appendChild(itemConnected);
    window.scrollTo(0, document.body.scrollHeight);
})

// toevoegen van message aan de pagina
client.on('message', (data) => {
    console.log(data)
    let item = document.createElement('li');
    item.textContent = data.name + " " + data.message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

// prompt, vraagt naam van user (value later te gebruiken)
const clientName = prompt("Wat is jouw naam?")
client.emit('new-user', clientName)

// toevoegen van joined wanneer user connected is
let joined = document.createElement('li');
joined.textContent = "You joined"
messages.appendChild(joined)

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