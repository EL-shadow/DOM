/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */
function _onMouseClick(e) {
    e.preventDefault();
    openPopupFromLink(e.target);
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) {
    var title = link.dataset.title;
    var message = link.dataset.message;
    var onOk = function(){window.location=link.href;};
    message = message.replace("%s",link.href);
    createPopup(title,message,onOk);
}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
 */
function createPopup(title, message, onOk) {
    var popup = document.createElement("div");
    popup.classList.add("overlay");
    popup.innerHTML='' +
        '<div class="popup-wrap_table">' +
            '<div class="popup-wrap_cell">' +
                '<div class="popup">' +
                    '<div class="close-button">&times;</div>' +
                    '<strong>' + title + '</strong>' +
                    '<p>'+ message +'</p>' +
                    '<p class="buttons">' +
                        '<span class="button">Да</span>' +
                        '<span class="button">Нет</span>' +
                    '</p>'+
                '</div>'+
            '</div>'+
        '</div>';
    popup.getElementsByClassName("close-button")[0].addEventListener("click",function(){
        popup.remove();
    },false);
    popup.getElementsByClassName("button")[0].addEventListener("click",onOk,false);
    popup.getElementsByClassName("button")[1].addEventListener("click",function(){
        popup.remove();
    },false);
    document.body.appendChild(popup);
}

document.addEventListener("click",function(e){
    if (e.target.tagName=="A" && e.target.dataset.title!==window.undefined && e.target.dataset.message!==window.undefined){
        _onMouseClick(e);
    }
},false);