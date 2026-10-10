/* =========================================================================
 * config.js — Глобальная конфигурация фронтенда
 * =======================================================================*/
window.App = window.App || {};

App.CONFIG = {
  /* -----------------------------------------------------------------
   * Адрес Django REST API.
   *  - '' (пусто)         — тот же origin, что и фронтенд (рекомендуется:
   *                         отдавайте фронт через Django/nginx рядом с /api/).
   *  - 'http://localhost:8000' — если бэкенд запущен отдельно (runserver).
   * ----------------------------------------------------------------- */
  API_BASE: '',

  /* -----------------------------------------------------------------
   * DEMO_MODE:
   *  - true  — все запросы обслуживаются встроенными мок-данными.
   *            Фронт полностью работает без бэкенда (для демонстрации).
   *  - false — реальные запросы к API_BASE (Django REST + JWT).
   * ----------------------------------------------------------------- */
  DEMO_MODE: true,

  /* Ключи localStorage */
  STORAGE: {
    ACCESS: 'ek_access',
    REFRESH: 'ek_refresh',
    USER: 'ek_user',
  },

  /* Пути эндпоинтов Django REST (можно менять под свой urls.py).
   * Часть путей относительная — api.buildUrl() сам добавит /api/ если нужно.
   */
  ENDPOINTS: {
    // --- Auth (djangorestframework-simplejwt) ---
    login: '/api/auth/login/',          // POST {username, password} -> {access, refresh, user}
    refresh: '/api/auth/refresh/',      // POST {refresh} -> {access}
    me: '/api/auth/me/',                // GET  current user {id, username, role, full_name}

    // --- Director ---
    stats: '/api/director/stats/',      // GET {teachers, students, events}
    directorStudentStats: '/api/director/student-statistics/', // GET school-wide per-student performance
    teachers: '/api/teachers/',         // GET / POST
    teacher: (id) => `/api/teachers/${id}/`, // DELETE
    students: '/api/students/',         // GET (?class=) / POST
    student: (id) => `/api/students/${id}/`, // GET / DELETE
    events: '/api/events/',             // GET / POST
    event: (id) => `/api/events/${id}/`,

    // --- Teacher ---
    myStudents: '/api/teacher/students/',   // GET (ученики учителя) / POST (создать)
    teacherStudentStats: '/api/teacher/student-statistics/', // GET per-student performance for assigned students
    teacherSchedule: '/api/teacher/schedule/', // GET / POST lessons assigned to students
    teacherScheduleItem: (id) => `/api/teacher/schedule/${id}/`, // DELETE
    subjects: '/api/subjects/',             // GET список предметов
    journal: '/api/journal/',               // GET (?subject=&student=) / POST
    journalItem: (id) => `/api/journal/${id}/`,
    repertoire: '/api/repertoire/',         // GET (?student=) / POST / PATCH
    repertoireItem: (id) => `/api/repertoire/${id}/`,
    homework: '/api/homework/',             // GET / POST (multipart, файл)
    homeworkItem: (id) => `/api/homework/${id}/`,
  },

  SUBJECTS: [
    'Специальность',
    'Сольфеджио',
    'Муз. литература',
    'Хор',
    'Оркестр',
    'Ансамбль',
    'Теория музыки',
  ],
};
