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
client.on('message', (message) => {
    let item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})