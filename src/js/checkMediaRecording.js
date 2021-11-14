import MediaRecording from './MediaRecording';

// проверяем дал ли пользователь разрешение на использование микрофона или камеры
// и есть ли у него нужные устройства для этого,
// если нет выводим сообщение

export default function checkMediaRecording(type, chatBtnCont, mediaBtnCont, messages, chatContainer, newMessageInput, body) {
  navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' })
    .then((stream) => {
      MediaRecording(type, chatBtnCont, mediaBtnCont, messages, chatContainer, newMessageInput, body, stream);
    })
    .catch((err) => {
      console.log(err);
      const el = document.createElement('div');
      el.classList.add('widget');
      el.innerHTML = `<h2>Что-то пошло не так</h2>
            <p class="widget-text">
                К сожалению нам не удалось сделать аудио/видео запись,
                проверьте доступ к использованию микрофона/камеры, либо смените браузер.
            </p>
            <div class="btn-container">
                <button type="button" class="btn">ОК</button>
            </div>`;

      body.insertAdjacentElement('afterbegin', el);

      el.querySelector('.btn').onclick = () => {
        el.remove();
      };
    });
}
