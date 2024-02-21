const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const locationButton = document.getElementById('location-button');
const messages = document.getElementById('messages');

socket.addEventListener('open', () => {
  console.log('Соединение установлено');
});

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'message') {
    addMessage(data.message);
  } else if (data.type === 'location') {
    // Не выводим сообщение об геолокации, отправленное эхо-сервером
  }
});


socket.addEventListener('close', () => {
  console.log('Соединение закрыто');
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value;

  if (message.trim() === '') {
    return;
  }

  socket.send(JSON.stringify({ type: 'message', message }));
  addMessage(message);

  messageInput.value = '';
});

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Геолокация не поддерживается вашим браузером');
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const location = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    socket.send(JSON.stringify({ type: 'location', location }));
    addLocationMessage(location);
  });
});

function addMessage(message) {
  const li = document.createElement('li');
  li.textContent = message;
  messages.appendChild(li);
}

function addLocationMessage(location) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = location;
  a.textContent = 'Ссылка на вашу геолокацию';
  li.appendChild(a);
  messages.appendChild(li);
}
