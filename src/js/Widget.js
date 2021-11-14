import ChatMessage from './ChatMessage';

export default class Widget {
  constructor() {
    this.value = null;
  }

  createFormWidget(container, mesInput, chat, mesArray, elem) {
    const el = document.createElement('form');
    el.classList.add('widget');
    el.innerHTML = `<h2>Что-то пошло не так</h2>
            <p class="widget-text">
                К сожалению нам не удалось определить ваше местоположение, 
                дайте разрешение на использование геолокации,
                либо введите координаты вручную.
            </p>
            <p class="widget-text">
                Широта и долгота через запятую
            </p>
            <input class="widget-input" type="text" placeholder="Например: 51.50851, -0.12572" required>
            <div class="btn-container">
                <button type="reset" class="btn btn-reset">Отмена</button>
                <button type="submit" class="btn btn-submit">ОК</button>
            </div>`;

    container.insertAdjacentElement('afterbegin', el);

    this.interactForm(el, mesInput, chat, mesArray, elem);
  }

  interactForm(form, mesInput, chatContainer, listArray, elem) {
    const input = form.querySelector('.widget-input');
    const reset = form.querySelector('.btn-reset');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (input.value) {
        this.value = this.checkValidity(input.value);

        if (this.value) {
          this.value = this.value[0].split(',');

          const latitude = this.value[0].trim();
          const longitude = this.value[1].trim();

          const newMes = new ChatMessage(mesInput.value, `${latitude}, ${longitude}`, elem);
          listArray.push(newMes);
          newMes.createNewMes(chatContainer, listArray);
          mesInput.closest('.chat-form').reset();

          form.reset();
          form.remove();
        } else {
          this.showError(form, input, 'Координаты введены не верно');
        }
      }
    });

    reset.addEventListener('click', () => {
      mesInput.value = '';
      form.reset();
      form.remove();
    });
  }

  checkValidity(string) {
    return string.match(/(-*\d+\.\d+),\s*(-*\d+\.\d+)/gm);
  }

  showError(formWidget, inputTarget, text) {
    inputTarget.focus();

    const err = document.createElement('div');
    err.classList.add('popover-top');
    err.innerHTML = `<div class="popover-body">${text}</div>`;

    formWidget.appendChild(err);

    inputTarget.addEventListener('input', () => {
      err.remove();
    });
  }
}
