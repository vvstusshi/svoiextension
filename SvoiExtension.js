// ==UserScript==
// @name         SvoiExtension
// @namespace    http://tampermonkey.net/
// @version      0.18.9
// @description  Внешняя интеграция для amoCRM.
// @author       vvs_tusshi
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    const vivod_text = `Для моментального вывода денег скачайте наше приложение:

"Таксопарк Свои"

Android: https://clck.ru/39Px9N

IOS: - https://clck.ru/33qSgC

❗Если ссылка не открывается скачайте его в программе где устанавливаете игры и приложения❗`
    var menu_button = document.createElement('button');
    var width = window.innerWidth;
    var height = window.innerHeight;
    var is_cancel = 0;
    menu_button.id = 'svoi_fast_answers_menu';
    menu_button.innerHTML = 'Быстрые ответы';
    menu_button.addEventListener("click", wrapper);
    menu_button.addEventListener("mouseenter", change_color_menu);
    menu_button.addEventListener("mouseleave", change_color_menu);
    if(width >= 1300 && width <= 1366 && height >= 750 && height <= 768)
    {
        menu_button.style = "top: 91.3vh; left:52vw; cursor: pointer; text-align: center; border: 1px solid #547abb85; color: #3168c7; position: absolute; z-index:99999; display: inline-block; padding: 6px 9px; font-size: 14px; border-radius: 3px; background-color: #fff; transition: 0.05s cubic-bezier(0.55, 0.09, 0.68, 0.53); visibility: hidden;"
    }
    else if(width >= 1300 && width <= 1366 && height >= 750 && height <= 776)
    {
        menu_button.style = "top: 91.5vh; left:52vw; cursor: pointer; text-align: center; border: 1px solid #547abb85; color: #3168c7; position: absolute; z-index:99999; display: inline-block; padding: 6px 9px; font-size: 14px; border-radius: 3px; background-color: #fff; transition: 0.05s cubic-bezier(0.55, 0.09, 0.68, 0.53); visibility: hidden;"
    }
    else if(width >= 1850 && width <= 1900 && height >= 500 && height < 601)
    {
        menu_button.style = "top: 88.5vh; left:38vw; cursor: pointer; text-align: center; border: 1px solid #547abb85; color: #3168c7; position: absolute; z-index:99999; display: inline-block; padding: 6px 9px; font-size: 14px; border-radius: 3px; background-color: #fff; transition: 0.05s cubic-bezier(0.55, 0.09, 0.68, 0.53); visibility: hidden;"
    }
    else if(width >= 1900 && width <= 1921 && height >= 966 && height <= 1081)
    {
        menu_button.style = "top: 93.2vh; left:37.5vw; cursor: pointer; text-align: center; border: 1px solid #547abb85; color: #3168c7; position: absolute; z-index:99999; display: inline-block; padding: 6px 9px; font-size: 14px; border-radius: 3px; background-color: #fff; transition: 0.05s cubic-bezier(0.55, 0.09, 0.68, 0.53); visibility: hidden;"
    }
    var category_1 = document.createElement('button');
    category_1.id = 'category_1';
    category_1.innerHTML = 'Вывод';
    category_1.addEventListener("click", vivod);
    category_1.addEventListener("mouseenter", change_color_category_1);
    category_1.addEventListener("mouseleave", change_color_category_1);
    category_1.style = "top: 78.6%; left:23.5%; cursor: pointer; text-align: center; border: 1px solid #547abb85; color: #3168c7; position: absolute; z-index:99999; display: inline-block; padding: 6px 9px; font-size: 14px; border-radius: 3px; background-color: #fff; transition: 0.05s cubic-bezier(0.55, 0.09, 0.68, 0.53); visibility: hidden;"
    var category_2 = document.createElement('button');
    category_2.id = 'category_2';
    category_2.innerHTML = 'Комиссия';
    category_2.style = "top: 78.6%; left:27%; cursor: pointer; text-align: center; border: 1px solid #547abb85; color: #3168c7; position: absolute; z-index:99999; display: inline-block; padding: 6px 9px; font-size: 14px; border-radius: 3px; background-color: #fff; transition: 0.05s cubic-bezier(0.55, 0.09, 0.68, 0.53); visibility: hidden;"
    var category_1_1 = document.createElement('button');
    category_1_1.id = 'category_1_1';
    category_1_1.innerHTML = 'Вывод - СВОИ';
    category_1_1.addEventListener("click", vivod_svoi_test);
    category_1_1.style = "top: 78.6%; left:25.5%; cursor: pointer; text-align: center; border: 1px solid #547abb85; color: #3168c7; position: absolute; z-index:99999; display: inline-block; padding: 6px 9px; font-size: 14px; border-radius: 3px; background-color: #fff; transition: 0.05s cubic-bezier(0.55, 0.09, 0.68, 0.53); visibility: hidden;"
    document.body.appendChild(menu_button);
    document.body.appendChild(category_1);
    document.body.appendChild(category_2);
    document.body.appendChild(category_1_1);
    var x = 0
    var y = 0
    var color = 0
    window.onload = function() {
        if(window.location.href.includes('imbox') && window.location.href.includes('/leads/detail/'))
        {
            setTimeout(show_button, 1500);
            document.getElementsByClassName('nav__menu__item__title')[0].innerHTML = 'Статистика';
            document.getElementsByClassName('nav__menu__item__title')[8].innerHTML = 'Чаты';
            document.getElementsByClassName('nav__menu__item  nav__menu__item__icon-integration')[0].style.display = 'none';
            document.getElementsByClassName('nav__menu__item  nav__menu__item__icon-integration')[1].style.display = 'none';
            setInterval(set_park_tag, 0);
            setTimeout(set_title_to_fast_answer, 1500);
        }
    };
    //menu.style = "top:0;right:0;position:absolute;z-index:99999;padding:20px;color: #f1f1f1;";
    window.navigation.addEventListener("navigate", (event) => {
        if(window.location.href.includes('imbox') && window.location.href.includes('/leads/detail/'))
        {
            setInterval(set_park_tag, 0);
            setTimeout(set_title_to_fast_answer, 1500);
            setTimeout(show_button, 1500);
        }
        else
        {
            category_1.style.setProperty("visibility", "hidden");
            category_1_1.style.setProperty("visibility", "hidden");
            category_2.style.setProperty("visibility", "hidden");
        }
        if(y == 1){y = 0; menu_button.style.setProperty("visibility", "hidden");}
    })
    function set_title_to_fast_answer()
    {
        document.getElementsByClassName('js-control-contenteditable-input ')[0].addEventListener('change', function () {
            var list = document.getElementsByClassName('tips-item js-tips-item control-contenteditable__suggestions_template_item js-control-contenteditable-suggestions-item');
            for(let i = 0; i <= list.length; i++)
            {
                list[i].title = list[i].getAttribute('data-value');
            }
        });
        let previousValue = document.getElementsByClassName('js-control-contenteditable-input ')[0].value;
        setInterval(function() {
            if (document.getElementsByClassName('js-control-contenteditable-input ')[0].value !== previousValue) {
                    previousValue = document.getElementsByClassName('js-control-contenteditable-input ')[0].value;
                    document.getElementsByClassName('js-control-contenteditable-input ')[0].dispatchEvent(new Event('change'));
                }
            }, 500);
    }
    function show_button()
    {
        var area = document.getElementsByClassName('feed-compose minimized')[0];
        area.onclick = function(){
            if(y == 0)
            {
                menu_button.style.setProperty("visibility", "visible");
                y = 1;
            }
            else if(y == 1)
            {
                menu_button.style.setProperty("visibility", "hidden");
                y = 0;
            }
        }
    }
    function set_park_tag()
    {
        var temp = document.getElementsByClassName('notification notification--talk notification__item     notification-inner ');
        for(let i = 0; i <= temp.length; i++)
        {
            if(temp[i]?.getElementsByClassName('notification-https://st1.amocrm.ru/origins_icons/pact.whatsapp.svg__icon')[0]){
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].innerHTML = 'CASH TAXI';
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].style.setProperty('background', '#ff8f92');
            }
            else if(temp[i]?.getElementsByClassName('notification-https://st1.amocrm.ru/origins_icons/online.radist.svg__icon')[0]){
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].innerHTML = 'СВОИ';
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].style.setProperty('background', '#ffce5a');
            }
            else if(temp[i]?.getElementsByClassName('notification-https://st1.amocrm.ru/origins_icons/telegram.radist.svg__icon')[0]){
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].innerHTML = 'Telegram';
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].style.setProperty('background', '#37afe2');
            }
            else if(temp[i]?.getElementsByClassName('notification-/frontend/images/interface/svg/common/vk-sm.svg__icon')[0]){
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].innerHTML = 'VK СВОИ';
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].style.setProperty('background', '#0077ff');
            }
            else if(temp[i]?.getElementsByClassName('notification-https://st1.amocrm.ru/origins_icons/pact.vkgroup.svg__icon')[0]){
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].innerHTML = 'VK CASH TAXI';
                temp[i].getElementsByClassName('notification-inner__title_message_talk-id ')[0].style.setProperty('background', '#0077ff');
            }
        }
    }
    function change_color_menu()
    {
        if(color == 0)
        {
            menu_button.style.setProperty('color', '#ffffff');
            menu_button.style.setProperty('background-color', '#4986ef');
            color = 1;
        }
        else if(color == 1)
        {
            menu_button.style.setProperty('color', '#4986ef');
            menu_button.style.setProperty('background-color', '#ffffff');
            color = 0;
        }
    }
    function change_color_category_1()
    {
        if(color == 0)
        {
            category_1.style.setProperty('color', '#ffffff');
            category_1.style.setProperty('background-color', '#4986ef');
            color = 1;
        }
        else if(color == 1)
        {
            category_1.style.setProperty('color', '#4986ef');
            category_1.style.setProperty('background-color', '#ffffff');
            color = 0;
        }
    }
    function vivod()
    {
        category_1_1.style.setProperty("visibility", "visible");
        category_1.style.setProperty("visibility", "hidden");
        category_2.style.setProperty("visibility", "hidden");
    }
    function wrapper()
    {
        if(x == 0)
        {
            category_1.style.setProperty("visibility", "visible");
            category_2.style.setProperty("visibility", "visible");
            x = 1;
        }
        else if(x == 1)
        {
            category_1.style.setProperty("visibility", "hidden");
            category_2.style.setProperty("visibility", "hidden");
            category_1_1.style.setProperty("visibility", "hidden");
            x = 0;
        }
    }
    function vivod_svoi_test()
    {
        document.getElementsByClassName('js-control-contenteditable-input')[0].value = vivod_text;
        document.getElementsByClassName('control-contenteditable__area  feed-compose__message')[0].innerHTML = vivod_text;
        document.getElementsByClassName('control-contenteditable__area  feed-compose__message')[0].style = '';
        var r = document.getElementsByClassName('button-input   button-input-disabled js-note-submit feed-note__button')[0];
        r.classList.remove('button-input-disabled');
    }
    function vivod_svoi(data)
    {
       console.log(data);
    }
})();
