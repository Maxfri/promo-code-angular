## Приложение для хранения промокодов - Техническое задание

### Описание

Необходимо разработать приложение для хранения промокодов. Приложение должно иметь две основные страницы: список промокодов и страницу создания/редактирования промокода. Для реализации форм и хранения данных можно использовать MobX или NgRx по выбору. Для пользовательского интерфейса следует использовать компоненты из Angular Material. Для работы с датами можно использовать библиотеку Moment.js.

### Требования к странице создания/редактирования промокода

- [x] Поле "Uuid" (скрытое поле) должно содержать уникальный идентификатор промокода. Для его генерации можно использовать пакет uuid. Уникальный идентификатор должен генерироваться в сервисе, эмулирующем работу с API при создании промокода.
- [] Поле "Название" является обязательным и должно содержать от 3 до 30 символов. Запретить ввод любых символов, кроме букв и цифр. Для ограничения формата можно использовать пакет ngx-mask. Название должно быть уникальным (асинхронные валидаторы).
- [x] Поле "Промокод" является обязательным и должно содержать от 1 до 10 символов. Промокод может содержать буквы (русские и английские), цифры и пробелы. Не может быть двух пробелов подряд, и пробелы в начале и конце должны быть обрезаны при сохранении.
- [x] Поле "Описание" является необязательным и должно содержать от 3 до 255 символов.
- [x] Поле "Дата окончания действия промокода" не может быть больше текущей даты. Даты, которые превышают текущую дату, должны быть задизейблены в компоненте выбора даты (datepicker).
- [x] При нажатии на кнопку сохранения, если форма невалидна, невалидные поля должны подсвечиваться красным цветом. Очень желательно добавить осмысленные сообщения для каждой валидации (под полями).

### Требования к списку промокодов

- [] На странице должен быть поиск, и если ничего не найдено, должно отображаться соответствующее сообщение. Поиск должен происходить по названию и описанию промокода.
- [] Должна быть кнопка создания промокода.
- [] Если нет ни одного промокода, должно отображаться соответствующее сообщение.
- [] Промокоды должны подгружаться по мере прокрутки (пакет ngx-infinite-scroll) пачками по 8 штук.
- [] Должен быть фильтр (выпадающий список), который позволяет выбрать все промокоды, активные или истекшие. Промокоды считаются истекшими, если их дата окончания действия превышает текущую дату.
- [x] Название промокода должно отображаться в верхнем регистре с использованием pipe.
- [x] Каждая карточка промокода должна иметь кнопки редактирования и удаления.
- [] При нажатии на кнопку удаления должно появляться окно подтверждения.
- [x] Истекшие промокоды должны выделяться особым образом.
- [x] При наведении курсора мыши на карточку промокода, она должна подсвечиваться. Это должно быть реализовано с помощью директивы.

---
