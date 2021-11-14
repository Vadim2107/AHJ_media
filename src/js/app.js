import getPositions from './Positions';
import checkMediaRecording from './checkMediaRecording';

const body = document.querySelector('body');
const chatContainer = document.querySelector('.chat-content');
const newMessageForm = document.querySelector('.chat-form');
const newMessageInput = newMessageForm.querySelector('.chat-form-input');

const chatBtnCont = document.querySelector('.chat-form-button');
const audioBtn = chatBtnCont.querySelector('.button-audio');
const videoBtn = chatBtnCont.querySelector('.button-video');
const mediaBtnCont = document.querySelector('.buttons-active');

// храним все сообщения в виде объектов
const messages = [];

newMessageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (newMessageInput.value) {
    const elem = document.createElement('p');
    elem.classList.add('chat-message-text');
    elem.textContent = newMessageInput.value;

    getPositions(messages, chatContainer, newMessageInput, body, elem);
  }
});

audioBtn.addEventListener('click', () => {
  checkMediaRecording('audio', chatBtnCont, mediaBtnCont, messages, chatContainer, newMessageInput, body);
});

videoBtn.addEventListener('click', () => {
  checkMediaRecording('video', chatBtnCont, mediaBtnCont, messages, chatContainer, newMessageInput, body);
});
