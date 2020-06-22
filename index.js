const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api

const token = "1217697783:AAEVgJFOjdBMHlAaxxrZKM-LF8CBJw3sRaI" // тут токен кторый мы получили от botFather



// включаем самого обота
 const bot = new TelegramBot(token, {polling: true});

//конфиг клавиатуры
const keyboard = [
    [
        {
            text: 'Сертификаты HTML', // текст на кнопке
            callback_data: 'certificateHTML' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'Сертификаты JS', // текст на кнопке
            callback_data: 'certificateJS' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'Ссылка на резюме',
            url: 'https://spb.hh.ru/resume/a390bf87ff078676200039ed1f526178505837'
        }
    ],

    [
        {
            text: 'Ссылка на гитхаб',
            url: 'https://github.com/Jerd0/Jerdo' //внешняя ссылка
        }
    ],
    [
        {
            text: 'Мой личный сайт',
            url: 'https://jerdosite.web.app/' //внешняя ссылка
        }
    ],
];
// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
    const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

    // отправляем сообщение
    bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let url1 = null;
    let url2 = null;
    let url3 = null;
    if (query.data === 'certificateHTML') {
        url2 ='https://testprovider.com/ru/certificate/search/TP61184836'
        url1='https://geekbrains.ru/certificates/881174'
    }
    if (query.data === 'certificateJS') {
        url1='https://testprovider.com/ru/certificate/search/TP88215978'
        url2='https://geekbrains.ru/certificates/879829'
        url3='https://geekbrains.ru/certificates/880046'
    }
    if (url1) {
        bot.sendMessage(chatId,`${url1}`);
            if (url2 && url3){
                bot.sendMessage(chatId, `${url2}`);
                bot.sendMessage(chatId, `${url3}`,{
                reply_markup: {
                inline_keyboard: keyboard
                }});
            }
            else {
                bot.sendMessage(chatId, `${url2}`,{
                    reply_markup: {
                        inline_keyboard: keyboard
                    }});
            }
    }
    else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});