import Timer from './Timer';
import getPositions from './Positions';

export default function MediaRecording(name, chatBtnContainer, mediaContainer, messages, chatContainer, newMessageInput, body, stream) {
  mediaContainer.classList.remove('hidden');
  chatBtnContainer.classList.add('hidden');

  const videoBox = document.createElement('div');
  videoBox.classList.add('video-box');

  (async () => {
    try {
      // создаем новый элемент аудио или видео
      const media = document.createElement(name);
      media.controls = true;

      let sec = 0;

      const timeCont = mediaContainer.querySelector('.timer');

      // запускаем таймер записи
      const timerId = setInterval(() => {
        sec++;
        const time = Timer(sec);
        timeCont.textContent = time;
      }, 1000);

      if (name === 'video') {
        media.muted = 'muted';
        videoBox.appendChild(media);

        chatBtnContainer.closest('.chat-form').insertAdjacentElement('afterbegin', videoBox);

        media.srcObject = stream;
        media.play();
      }

      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.addEventListener('dataavailable', (evt) => {
        console.log('data available');
        chunks.push(evt.data);
      });
      recorder.addEventListener('stop', () => {
        console.log('recording stopped');
        media.srcObject = null;
        const blob = new Blob(chunks);
        media.src = URL.createObjectURL(blob);
      });

      recorder.start();

      mediaContainer.querySelector('.button-stop').onclick = () => {
        clearInterval(timerId);
        timeCont.textContent = '';
        stream.getTracks().forEach((track) => track.stop());

        chatBtnContainer.classList.remove('hidden');
        mediaContainer.classList.add('hidden');
        getPositions(messages, chatContainer, newMessageInput, body, media);
        videoBox.remove();
      };

      mediaContainer.querySelector('.button-delete').onclick = () => {
        clearInterval(timerId);
        timeCont.textContent = '';
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());

        chatBtnContainer.classList.remove('hidden');
        mediaContainer.classList.add('hidden');
        videoBox.remove();
      };
    } catch (e) {
      console.error(e);
    }
  })();
}
