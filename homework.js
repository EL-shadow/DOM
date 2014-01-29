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
    var wrap1 = document.createElement("div");
    wrap1.classList.add("popup-wrap_table");
    popup.appendChild(wrap1);
    var wrap2 = document.createElement("div");
    wrap2.classList.add("popup-wrap_cell");
    wrap1.appendChild(wrap2);
    var content = document.createElement("div");
    content.classList.add("popup");
    wrap2.appendChild(content);
    var button = document.createElement("div");
    button.classList.add("close-button");
    button.innerHTML="&times;";
    button.addEventListener("click",function(){
        popup.remove();
    },false);
    content.appendChild(button);
    var titleElem = document.createElement("strong");
    titleElem.innerHTML=title;
    content.appendChild(titleElem);
    var messageEelem = document.createElement("p");
    messageEelem.innerHTML=message;
    content.appendChild(messageEelem);

    var buttons = document.createElement("p");
    buttons.classList.add("buttons");
    buttons.appendChild(document.createElement("span"));
    buttons.appendChild(document.createElement("span"));
    buttons.children[0].className="button";
    buttons.children[0].innerHTML="Да";
    buttons.children[0].addEventListener("click",function(){onOk();},false);
    buttons.children[1].className="button";
    buttons.children[1].innerHTML="Нет";
    buttons.children[1].addEventListener("click",function(){
        popup.remove();
    },false);
    content.appendChild(buttons);
    document.body.appendChild(popup);
}

var links = document.getElementsByClassName("popup-link");
for (var i=0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
        _onMouseClick(e);
    },false);
}