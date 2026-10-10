# 🎵 Э-Күндөлүк — фронтенд электронного дневника музыкальной школы

Фронтенд-часть системы «Э-Күндөлүк» на **чистом HTML + CSS + JavaScript**
(без сборщиков и фреймворков). Каждый экран — отдельный `.html`-файл с
настоящей разметкой (таблицы, формы, сайдбар), JavaScript используется только
для подгрузки данных из API и интерактива. Бэкенд — **Django REST Framework**
(+ JWT).

---

## 🚀 Быстрый старт (демо-режим)

Запустите любой статический сервер в папке проекта (или просто откройте
`login.html` в браузере):

```bash
python -m http.server 8123
# открыть http://127.0.0.1:8123  (index.html сам перенаправит на login.html)
```

По умолчанию включён **демо-режим** (`DEMO_MODE = true`): все запросы
обслуживаются встроенными мок-данными, бэкенд не нужен.

Демо-учётные записи (клик по строке на странице входа подставляет данные):

| Роль      | Логин      | Пароль      | Попадёте на        |
|-----------|------------|-------------|--------------------|
| Директор  | `director` | `director`  | `director/dashboard.html` |
| Учитель   | `teacher`  | `teacher`   | `teacher/dashboard.html`  |
| Ученик    | `student`  | `student`   | `student/dashboard.html`  |

---

## 🔌 Подключение к Django REST

1. **Отключите демо-режим и укажите адрес API** в `js/config.js`:

   ```js
   API_BASE: 'http://localhost:8000',   // или '' если отдавать фронт рядом с /api
   DEMO_MODE: false,
   ```

2. **JWT-авторизация.** Ожидается схема `djangorestframework-simplejwt`:

   - `POST /api/auth/login/` → `{ "access": "...", "refresh": "...", "user": {…} }`
     либо `{ "access": "..." }` + отдельный `GET /api/auth/me/` для роли.
   - `POST /api/auth/refresh/` → `{ "access": "..." }`
   - `GET /api/auth/me/` → `{ "id", "username", "role", "full_name" }`

   Токены хранятся в `localStorage`; access-токен автоматически обновляется
   при ответе `401`.

3. **Роль пользователя.** Поле `user.role` принимает значения
   `DIRECTOR | TEACHER | STUDENT`. На каждой странице перед показом выполняется
   проверка: без токена — редирект на `login.html`, чужая роль — редирект на
   дашборд своей роли + toast «Недостаточно прав».

---

## 📡 Ожидаемые эндпоинты (контракт)

Пути и названия полей настраиваются в `App.CONFIG.ENDPOINTS` (`js/config.js`).
Формат ответов DRF (список/объект/словарь — на ваше усмотрение, поля ниже
просто используются в интерфейсе).

### Авторизация
| Метод | Путь | Назначение |
|-------|------|------------|
| POST | `/api/auth/login/` | логин/пароль → JWT + роль |
| POST | `/api/auth/refresh/` | продлить access-токен |
| GET  | `/api/auth/me/` | текущий пользователь |

### Директор
| Метод | Путь | Поля |
|-------|------|------|
| GET  | `/api/director/stats/` | `teachers, students, events, upcoming_events[], average, grades_count, absences, lessons_count, attendance_rate` |
| GET | `/api/director/student-statistics/` | показатели каждого ученика: `student_id, full_name, class_name, average, grades_count, absences, lessons_count` |
| GET/POST | `/api/teachers/` | `full_name, subject, phone, login, password` |
| DELETE | `/api/teachers/{id}/` | удаление преподавателя (его ученики освобождаются) |
| GET/POST | `/api/students/`  | `full_name, class_name, subjects[], login, …` (GET + `?class=` фильтр) |
| DELETE | `/api/students/{id}/` | удаление ученика (журнал, репертуар, ДЗ, расписание — тоже) |
| GET/POST | `/api/events/` | `title, place, date, time, description` |
| DELETE | `/api/events/{id}/` | |

### Учитель
| Метод | Путь | Поля |
|-------|------|------|
| GET/POST | `/api/teacher/students/` | `full_name, class_name, subjects[], login, password` |
| PATCH | `/api/students/{id}/` | Учитель редактирует своего ученика: `full_name, class_name, birth_date, subjects[]` |
| GET | `/api/teacher/student-statistics/` | показатели закреплённых учеников: `student_id, full_name, class_name, average, grades_count, absences, lessons_count` |
| GET/POST | `/api/teacher/schedule/` | список занятий преподавателя / `student_id, subject, day, time, room, kind` |
| DELETE | `/api/teacher/schedule/{id}/` | удалить своё занятие |
| GET  | `/api/subjects/` | список предметов `[{name}]` |
| GET/POST | `/api/journal/` | GET `?subject=&student=`; POST `student_id, subject, date, attendance, grade, comment` |
| GET/POST | `/api/teacher/quarter-grades/` | GET filters `subject, school_year, quarter`; POST `student_id, subject, school_year, quarter, start_date, end_date, grade` |
| GET/POST | `/api/repertoire/` | `student_id, title, composer, subject, status` |
| PATCH | `/api/repertoire/{id}/` | `status` (В работе / Готово к зачету / Сдано) |
| GET/POST | `/api/homework/` | POST multipart (`file` + поля) |

### Ученик (персональные данные текущего пользователя)
| Метод | Путь | Что возвращает |
|-------|------|----------------|
| GET | `/api/student/dashboard/` | средний балл, счётчики, `recent[]`, `events[]` |
| GET | `/api/student/grades/` | оценки по предметам `[{subject, records[]}]` |
| GET | `/api/student/quarter-grades/` | сохранённые четвертные оценки `student_id, subject, school_year, quarter, start_date, end_date, grade` |
| GET | `/api/student/repertoire/` | репертуар ученика |
| GET | `/api/student/homework/` | задания + `file_url` |
| GET | `/api/student/schedule/` | `day, time, subject, teacher, room, kind` |

> Если поле в ответе API называется иначе — поменяйте его в соответствующем
> `<script>` страницы (секция «подгрузка данных»). Правка — 1–2 строки.

---

## 🗂 Структура проекта

```
├── index.html            # редирект на login.html
├── login.html            # страница входа (+ демо-входы)
├── css/styles.css        # все стили (сайдбар, карточки, таблицы, модалки)
├── js/                   # общий код приложения
│   ├── config.js         # API_BASE, DEMO_MODE, эндпоинты, список предметов
│   ├── ui.js             # h() (hyperscript), toast, бейджи, состояния
│   ├── store.js          # сессия: JWT + пользователь в localStorage
│   ├── mock.js           # демо-данные, полностью повторяют контракт API
│   ├── api.js            # fetch-обёртка: JWT, refresh, FormData, ошибки DRF
│   └── shell.js          # guard() по ролям, init() оболочки, логаут,
│                         # eventCard/loadInto — общие помощники разметки
│
├── director/             # панель директора
│   ├── dashboard.html    # обзор: счётчики + ближайшие анонсы
│   ├── teachers.html     # преподаватели (+ создание и удаление)
│   ├── students.html     # реестр учеников с фильтром по классам (+ удаление)
│   └── events.html       # концерты и анонсы (создание/удаление)
│
├── teacher/              # панель преподавателя
│   ├── dashboard.html    # главная + афиша
│   ├── students.html     # мои ученики + создание (генерация пароля) и удаление
│   ├── journal.html      # журнал: посещаемость Б/Н·Б, оценки 1–5, комментарий
│   ├── quarter-grades.html # рекомендация по среднему за период и сохранение оценки учителем
│   ├── schedule.html     # составление и удаление расписания учеников
│   ├── repertoire.html   # репертуарный план (статусы: В работе/Готово/Сдано)
│   └── homework.html     # ДЗ с прикреплением файлов + история отправлений
│
└── student/              # панель ученика
    ├── dashboard.html    # баннер-афиша, счётчики, последние оценки
    ├── diary.html        # дневник по предметам (оценки, пропуски, комментарии)
    ├── quarter-grades.html # четвертные оценки, выставленные учителем
    ├── repertoire.html   # мой репертуар со статусами
    ├── homework.html     # материалы и задания со скачиванием файлов
    └── schedule.html     # расписание по дням недели
```

> Каждая страница подключает скрипты в строгом порядке:
> `config → store → mock → api → ui → shell`, затем свой `<script>`.
> Сайдбар/шапка задублированы в разметке каждой страницы — при переносе на
> Django их удобно вынести в `{% include %}` / базовый шаблон.

---

## 🔐 Ролевая защита страниц

Проверяется в `js/shell.js` (`App.shell.guard(roles)`), который вызывается
первой строкой `<script>` на каждой странице:

- пользователь без токена → `location.replace(login.html)`;
- неверная роль (например, ученик открыл `teacher/journal.html`)
  → редирект на дашборд своей роли + toast «Недостаточно прав»;
- отметка «Выйти» очищает сессию и возвращает на страницу входа.

Маршрут по умолчанию после входа: `director/dashboard.html`,
`teacher/dashboard.html`, `student/dashboard.html`.

---

## 🧪 Известные особенности демо-режима

- Журнал, расписание, изменения учеников и четвертные оценки сохраняются в
  `localStorage` браузера.
- Файлы в домашних заданиях подставляются заглушкой (`file_url: '#'`).
- В реальном режиме файл в `POST /api/homework/` уходит как `multipart/form-data`.
- Логин/пароль ученика можно сгенерировать кнопкой в модалке «Создать ученика»
  (например: `aliya82 / e4q7vz`).