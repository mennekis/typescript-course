# lesson11-homework Readme

### У репозиторії є набір файлів lesson11-homework

* src/lesson11-homework.ts - містить class Users який потрібно розширити і змінити так щоб тести проходили
* src/lesson11-homework-test.ts - містить юніт-тести, деякі з них задісейблані - їх потрібно виправити так, щоб вони правильно перевіряли необхідні умови, і дописати необхідний код у class User
* src/users-data.ts - це дані користувачів, які необхідно передати у конструктор класу User. **Зверніть увагу - дані зафрізані, їх неможна змінювати** (Object.freeze(data);)  Це важливо, наприклад коли потрібно апдейтнути дату народження - потрібно замапити список користувачів так щоб не міняти існуючий об'єкт data, а створити новий з правильною датою
* lesson11-homework.html - цей файл запускає юніт-тести

### Важливо: - усі файли у фаорматі ts, і потрібно запустити `npm run watch` щоб вони компілювалися

### Потрібно

1. реалізувати методи класу User
    * updateUsersAge <- важливо тут потрібно пере-створити список користувачів так щоб не міняти існуючий об'єкт data - він зафрізаний, і при зміні властивостей буде падати помилка 
    * getUsersFromUkraine
    * getStatePostalCodes
    * getAverageWomenAge
    * getMostCommonWoomanHairColor
    * getMostCommonManBlodType
1. поправити задісейблені юніт-тести методів
    * updateUsersAge
    * getUsersFromUkraine
    * getStatePostalCodes
1. написати юніт-тести до методів
    * getAverageWomenAge
    * getMostCommonWoomanHairColor
    * getMostCommonManBlodType
1. запустити юніт-тести і переконатися що вони проходять