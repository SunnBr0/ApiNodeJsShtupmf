# Инструкция
Клонируем
```
https://github.com/SunnBr0/ApiNodeJsShtupmf
```
Переходим  в папку
```
cd ApiNodeJsShtupmf
```
Ставим зависимости
```
yarn install
```
PostgreSQL
Добавляем файл в корневую директорию файл .env    
mydb - название базы данных   
USERNAME - название   
PASSWORD - пароль   
```
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/mydb
```
Миграция для базы данных с Prisma
```
npx prisma migrate dev --name init
```
запуск API
```
yarn start
```
# API Документация

## Введение

Инструкция по использования api

## Базовая URL

```
https://localhost:3000/api/v1
```

## Endpoints

### 1. Получение всех элементов

**Endpoint:** `/api/v1/appeals`  
**Method:** `GET`  
**Response:**

```json
[
  {
    "id": 1,
    "topic": "Тема обращения",
    "text": "описание ",
    "status": "Завершено",
    "resolutionText": "да там всё просто",
    "cancelReason": null,
    "createdAt": "2025-04-12T17:00:23.847Z"
  },
  {
    "id": 2,
    "topic": "Ура",
    "text": "выфвфы",
    "status": "Отменено",
    "resolutionText": null,
    "cancelReason": "да там всё просто",
    "createdAt": "2025-04-12T17:00:16.814Z"
  }
]
```

### 2. Получение элемента по id

**Endpoint:** `/api/v1/appeals/{id}`  
**Method:** `GET`  
**Response:**

```json
{
  "id": 2,
  "topic": "Ура",
  "text": "выфвфы",
  "status": "Отменено",
  "resolutionText": null,
  "cancelReason": "да там всё просто",
  "createdAt": "2025-04-12T17:00:16.814Z"
}
```

### 3. Получить список обращений с возможность фильтрации по конкретной дате и по диапазону дат.
**По определённой дате**   
**Endpoint:** `/api/v1/appeals?date=2025-04-12`   
**По диапазону дат**        
**Endpoint:** `/api/v1/appeals?from=2025-04-12&to=2025-04-12`  
**Method:** `GET`    
**Response:**  

```json
[
    {
        "id": 20,
        "topic": "Помещение",
        "text": "Мало воздуха",
        "status": "Новое",
        "resolutionText": null,
        "cancelReason": null,
        "createdAt": "2025-04-12T19:43:24.260Z"
    },
    {
        "id": 19,
        "topic": "ЖКХ",
        "text": "Не приходят люди",
        "status": "Новое",
        "resolutionText": null,
        "cancelReason": null,
        "createdAt": "2025-04-12T19:43:11.493Z"
    },
    {
        "id": 18,
        "topic": "Работа",
        "text": "нет отпуска",
        "status": "Отменено",
        "resolutionText": null,
        "cancelReason": "всё нормально,ошиблись",
        "createdAt": "2025-04-12T19:42:53.134Z"
    },
    {
        "id": 17,
        "topic": "Приложение",
        "text": "Не выключается",
        "status": "Завершено",
        "resolutionText": "что то пошло не так",
        "cancelReason": null,
        "createdAt": "2025-04-12T19:40:48.175Z"
    }
]
```

### 4. Создание обращения

**Endpoint:** `/api/v1/appeals`  
**Method:** `POST`  
**Description:** создаётся обращение.
Повторное обращение с одинаковым темой и текстом,созданным до этого не создасться   
**Request Body:**

```json
{
  "topic": "Тема",
  "text": "Текст обращения"
}
```

**Response:**

```
Created
```

### 5. Взять обращение в работу

**Endpoint:** `/api/v1/appeals/{id}/start`  
**Method:** `PATCH`  
**Description:** меняет статус на "В работе"  
**Response:**

```json
{
  "message": "Статус обновлен на 'В работе'"
}
```

### 6. Завершить обращение

**Endpoint:** `/api/v1/appeals/{id}/complete`  
**Method:** `PATCH`  
**Description:** меняет статус на "завершено"  
Если обращение отменено ,то у него нельзя поменять статус  
**Request Body:**   
**Необязательно**

```json
{
  "resolutionText": "что то пошло не так"
}
```

**Response:**

```json
{
  "message": "Статус обновлен на 'Завершено'"
}
```

### 7. Отменить обращение

**Endpoint:** `/api/v1/appeals/{id}/cancel`  
**Method:** `PATCH`  
**Description:** меняет статус на "отменено"  
Если обращение завершено ,то у него нельзя поменять статус  
**Request Body:**  
**Необязательно**

```json
{
  "cancelReason": "всё нормально,ошиблись"
}
```

**Response:**

```json
{
    "message": "Статус обновлен на 'Отменено'"
}
```

### 8. endpoint который отменит все обращения, которые находятся в статусе "в работе"

**Endpoint:** `/api/v1/appeals/all-cancel`  
**Method:** `PATCH`  
**Description:** отменит все обращения, которые находятся в статусе "в работе"  
**Response:**

```json
{
    "message": "Все обращения в статусе 'В работе' отменились"
}
```
