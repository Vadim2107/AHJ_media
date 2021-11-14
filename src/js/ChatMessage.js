export default class ChatMessage {
  constructor(name, position, el) {
    this.name = name.value;
    this.position = position;
    this.el = el;
    this.date = new Date().toLocaleDateString();
    this.time = new Date().toLocaleTimeString().slice(0, -3);
  }

  createNewMes(chat, listArray) {
    chat.innerHTML = '';
    listArray.forEach((mes, index) => {
      const newMes = document.createElement('div');
      newMes.classList.add('chat-message');
      newMes.innerHTML = ` <span class="chat-message-time">${mes.date} ${mes.time}</span>
            <div class="chat-mes-content"></div>
            <span class="chat-message-geolocation">${mes.position}</span>
            <button class="chat-message-button" type="button">
                <i class="far fa-times-circle fa-lg"></i>
            </button>`;

      chat.insertAdjacentElement('afterbegin', newMes);
      newMes.querySelector('.chat-mes-content').appendChild(mes.el);

      this.deleteMes(listArray, newMes, index);
    });
  }

  deleteMes(list, message, i) {
    const crossSign = message.querySelector('.chat-message-button');
    crossSign.onclick = () => {
      message.remove();
      list.splice(i, 1);
    };
  }
}
