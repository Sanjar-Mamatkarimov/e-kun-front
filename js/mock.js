/* =========================================================================
 * mock.js — автономные демо-данные (работают при CONFIG.DEMO_MODE = true)
 * Полностью эмулирует ответы Django REST API, чтобы интерфейс можно было
 * посмотреть без бэкенда. Структура совпадает с ожидаемыми эндпоинтами.
 * =======================================================================*/
(function (App) {
  'use strict';

  const clone = (v) => JSON.parse(JSON.stringify(v));

  const state = {
    users: [
      { id: 1, username: 'director', password: 'director', role: 'DIRECTOR', full_name: 'Айгуль Смагулова' },
      { id: 2, username: 'teacher',  password: 'teacher',  role: 'TEACHER',  full_name: 'Дмитрий Ким' },
      { id: 3, username: 'student',  password: 'student',  role: 'STUDENT',  full_name: 'Алия Нурланова' },
    ],

    teachers: [
      { id: 2, full_name: 'Дмитрий Ким', subject: 'Специальность (скрипка)', phone: '+7 701 111 22 33', login: 'teacher' },
      { id: 4, full_name: 'Марина Орлова', subject: 'Сольфеджио', phone: '+7 702 555 66 77', login: 'orlova' },
      { id: 5, full_name: 'Сергей Волков', subject: 'Хор / Оркестр', phone: '+7 705 888 99 00', login: 'volkov' },
      { id: 6, full_name: 'Гульнара Ахметова', subject: 'Муз. литература', phone: '+7 707 123 45 67', login: 'ahmetova' },
    ],

    students: [
      { id: 3,  full_name: 'Алия Нурланова',   class_name: '3 класс', teacher_id: 2, subjects: ['Специальность', 'Сольфеджио', 'Хор'], login: 'student', birth_date: '2013-04-12' },
      { id: 7,  full_name: 'Тимур Бекболатов', class_name: '3 класс', teacher_id: 2, subjects: ['Специальность', 'Сольфеджио'], login: 'timur',   birth_date: '2013-01-20' },
      { id: 8,  full_name: 'София Ли',         class_name: '4 класс', teacher_id: 2, subjects: ['Специальность', 'Оркестр'], login: 'sofia',    birth_date: '2012-09-03' },
      { id: 9,  full_name: 'Данияр Сейтов',    class_name: '2 класс', teacher_id: 4, subjects: ['Специальность', 'Сольфеджио'], login: 'daniyar', birth_date: '2014-06-15' },
      { id: 10, full_name: 'Камила Жумабай',   class_name: '5 класс', teacher_id: 5, subjects: ['Хор', 'Ансамбль'], login: 'kamila', birth_date: '2011-11-28' },
      { id: 11, full_name: 'Амир Оспанов',     class_name: '2 класс', teacher_id: 4, subjects: ['Специальность', 'Хор'], login: 'amir', birth_date: '2014-03-08' },
      { id: 12, full_name: 'Ева Соколова',     class_name: '6 класс', teacher_id: 6, subjects: ['Муз. литература', 'Сольфеджио'], login: 'eva', birth_date: '2010-12-01' },
    ],

    events: [
      { id: 1, title: 'Отчётный концерт «Зимняя сказка»', place: 'Большой зал филармонии', date: '2026-12-20', time: '18:00', description: 'Выступление старших классов и оркестра.' },
      { id: 2, title: 'Концерт ко Дню Независимости', place: 'Актовый зал школы', date: '2026-12-15', time: '15:30', description: 'Хор и ансамбль младших классов.' },
      { id: 3, title: 'Открытый урок сольфеджио', place: 'Кабинет №12', date: '2026-11-05', time: '14:00', description: 'Для родителей 2–3 классов.' },
    ],

    journal: [
      { id: 1, student_id: 3, subject: 'Специальность', date: '2026-10-01', attendance: 'Б',   grade: 5, comment: 'Отличная интонация.' },
      { id: 2, student_id: 3, subject: 'Специальность', date: '2026-10-08', attendance: 'Б',   grade: 4, comment: 'Сбивается в среднем разделе.' },
      { id: 3, student_id: 3, subject: 'Сольфеджио',    date: '2026-10-02', attendance: 'Н/Б', grade: null, comment: 'Болеет.' },
      { id: 4, student_id: 3, subject: 'Сольфеджио',    date: '2026-10-09', attendance: 'Б',   grade: 5, comment: 'Диктант без ошибок.' },
      { id: 5, student_id: 3, subject: 'Хор',           date: '2026-10-03', attendance: 'Б',   grade: 5, comment: '' },
      { id: 6, student_id: 7, subject: 'Специальность', date: '2026-10-01', attendance: 'Б',   grade: 3, comment: 'Мало занимался дома.' },
      { id: 7, student_id: 7, subject: 'Специальность', date: '2026-10-08', attendance: 'Б',   grade: 4, comment: '' },
      { id: 8, student_id: 8, subject: 'Специальность', date: '2026-10-02', attendance: 'Б',   grade: 5, comment: 'Готовится к конкурсу.' },
      { id: 9, student_id: 8, subject: 'Оркестр',       date: '2026-10-04', attendance: 'Н/Б', grade: null, comment: 'Не предупредил.' },
    ],

    repertoire: [
      { id: 1, student_id: 3, title: 'Концерт ля минор, I ч.', composer: 'А. Вивальди',   subject: 'Специальность', status: 'В работе' },
      { id: 2, student_id: 3, title: 'Этюд №12',              composer: 'К. Черни',       subject: 'Специальность', status: 'Готово к зачету' },
      { id: 3, student_id: 3, title: '«Сурок»',               composer: 'Л. Бетховен',    subject: 'Специальность', status: 'Сдано' },
      { id: 4, student_id: 7, title: 'Гавот',                 composer: 'Госсек',         subject: 'Специальность', status: 'В работе' },
      { id: 5, student_id: 8, title: 'Рондо',                 composer: 'В. Моцарт',      subject: 'Специальность', status: 'Готово к зачету' },
    ],

    homework: [
      { id: 1, subject: 'Специальность', student_id: 3, title: 'Вивальди — разобрать II часть', description: 'Работа над штрихами, темп 60–70.', due_date: '2026-10-15', created_at: '2026-10-08', file_name: 'vivaldi_part2.pdf', file_url: '#', teacher: 'Дмитрий Ким' },
      { id: 2, subject: 'Сольфеджио',    student_id: 3, title: 'Гамма фа мажор + интервалы',    description: 'Спеть и сыграть, выучить наизусть.', due_date: '2026-10-12', created_at: '2026-10-06', file_name: null, file_url: null, teacher: 'Марина Орлова' },
      { id: 3, subject: 'Хор',           student_id: 3, title: 'Разучить партию сопрано',       description: 'Партия №2, страницы 3–4.', due_date: '2026-10-18', created_at: '2026-10-09', file_name: 'chor_part2.mp3', file_url: '#', teacher: 'Сергей Волков' },
    ],

    schedule: [
      { id: 1, student_id: 3, teacher_id: 2, subject: 'Специальность', teacher: 'Д. Ким',       day: 'Понедельник', time: '15:00', room: 'Каб. 5',  kind: 'индивидуальное' },
      { id: 2, student_id: 3, teacher_id: 4, subject: 'Сольфеджио',    teacher: 'М. Орлова',    day: 'Вторник',     time: '16:30', room: 'Каб. 12', kind: 'групповое' },
      { id: 3, student_id: 3, teacher_id: 5, subject: 'Хор',           teacher: 'С. Волков',    day: 'Среда',       time: '17:00', room: 'Актовый зал', kind: 'групповое' },
      { id: 4, student_id: 3, teacher_id: 2, subject: 'Специальность', teacher: 'Д. Ким',       day: 'Четверг',     time: '15:00', room: 'Каб. 5',  kind: 'индивидуальное' },
      { id: 5, student_id: 3, teacher_id: 6, subject: 'Муз. литература', teacher: 'Г. Ахметова', day: 'Пятница',    time: '14:00', room: 'Каб. 8',  kind: 'групповое' },
    ],

    _seq: { teachers: 100, students: 100, events: 100, journal: 100, repertoire: 100, homework: 100, schedule: 100 },
  };

  const DEMO_JOURNAL_KEY = 'ek_demo_journal_v1';
  const DEMO_SCHEDULE_KEY = 'ek_demo_schedule_v1';
  const DEMO_STUDENT_EDITS_KEY = 'ek_demo_student_edits_v1';

  function readDemoList(key, fallback) {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    try {
      const value = JSON.parse(stored);
      if (Array.isArray(value)) return value;
      console.error('Некорректные демо-данные в хранилище: ' + key);
    } catch (error) {
      console.error('Не удалось прочитать демо-данные ' + key, error);
    }
    return fallback;
  }

  function saveDemoList(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  state.journal = readDemoList(DEMO_JOURNAL_KEY, state.journal);
  state.schedule = readDemoList(DEMO_SCHEDULE_KEY, state.schedule);
  let studentEdits = readDemoList(DEMO_STUDENT_EDITS_KEY, []);
  state.students.forEach((student) => {
    const saved = studentEdits.find((item) => item.id === student.id);
    if (saved) Object.assign(student, saved);
  });
  state._seq.journal = Math.max(state._seq.journal, ...state.journal.map((item) => Number(item.id) || 0));
  state._seq.schedule = Math.max(state._seq.schedule, ...state.schedule.map((item) => Number(item.id) || 0));

  /* ------------------------- вспомогательные ------------------------- */
  const nextId = (key) => ++state._seq[key];

  function currentUser(token) {
    const m = /mock-token-(\d+)/.exec(token || '');
    const id = m ? Number(m[1]) : null;
    return state.users.find((u) => u.id === id) || null;
  }

  function userFromAccess() {
    const token = App.auth.getAccess();
    return currentUser(token);
  }

  function publicUser(u) {
    return { id: u.id, username: u.username, role: u.role, full_name: u.full_name };
  }

  const delay = (data) => new Promise((res) => setTimeout(() => res(clone(data)), 220));
  const fail = (message, status = 400) => {
    const err = new Error(message);
    err.status = status;
    return Promise.reject(err);
  };

  function studentStatistics(student) {
    const records = state.journal.filter((entry) => entry.student_id === student.id);
    const grades = records.filter((entry) => entry.grade != null).map((entry) => Number(entry.grade));
    return {
      student_id: student.id,
      full_name: student.full_name,
      class_name: student.class_name,
      average: grades.length ? Math.round((grades.reduce((sum, grade) => sum + grade, 0) / grades.length) * 10) / 10 : null,
      grades_count: grades.length,
      absences: records.filter((entry) => entry.attendance === 'Н/Б').length,
      lessons_count: records.length,
    };
  }

  function schoolStatistics() {
    const records = state.journal;
    const grades = records.filter((entry) => entry.grade != null).map((entry) => Number(entry.grade));
    const attended = records.filter((entry) => entry.attendance === 'Б').length;
    return {
      average: grades.length ? Math.round((grades.reduce((sum, grade) => sum + grade, 0) / grades.length) * 10) / 10 : null,
      grades_count: grades.length,
      absences: records.filter((entry) => entry.attendance === 'Н/Б').length,
      lessons_count: records.length,
      attendance_rate: records.length ? Math.round((attended / records.length) * 100) : null,
    };
  }

  /* ----------------------------- маршруты ----------------------------- */
  function handle(method, path, payload) {
    const [pathname, qsRaw] = path.split('?');
    const qs = {};
    (qsRaw || '').split('&').filter(Boolean).forEach((pair) => {
      const [k, v] = pair.split('=');
      qs[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    const M = method.toUpperCase();
    const body = payload && payload.body;
    const get = (obj, key) => (obj instanceof FormData ? obj.get(key) : obj && obj[key]);

    // ---- Auth ----
    if (M === 'POST' && pathname === App.CONFIG.ENDPOINTS.login) {
      const u = state.users.find((x) => x.username === get(body, 'username') && x.password === get(body, 'password'));
      if (!u) return fail('Неверный логин или пароль', 401);
      return delay({ access: `mock-token-${u.id}`, refresh: `mock-refresh-${u.id}`, user: publicUser(u) });
    }
    if (M === 'POST' && pathname === App.CONFIG.ENDPOINTS.refresh) {
      const u = userFromAccess();
      return delay({ access: u ? `mock-token-${u.id}` : null });
    }
    if (M === 'GET' && pathname === App.CONFIG.ENDPOINTS.me) {
      const u = userFromAccess();
      return u ? delay(publicUser(u)) : fail('Не авторизован', 401);
    }

    const user = userFromAccess();
    if (!user) return fail('Не авторизован', 401);

    // ---- Director: статистика ----
    if (M === 'GET' && pathname === App.CONFIG.ENDPOINTS.stats) {
      if (user.role !== 'DIRECTOR') return fail('Недостаточно прав', 403);
      return delay({
        teachers: state.teachers.length,
        students: state.students.length,
        events: state.events.length,
        ...schoolStatistics(),
        upcoming_events: state.events.slice(0, 3),
      });
    }
    if (M === 'GET' && pathname === App.CONFIG.ENDPOINTS.directorStudentStats) {
      if (user.role !== 'DIRECTOR') return fail('Недостаточно прав', 403);
      return delay(state.students.map(studentStatistics));
    }

    // ---- Teachers ----
    if (pathname === App.CONFIG.ENDPOINTS.teachers) {
      if (M === 'GET') return delay(state.teachers);
      if (M === 'POST') {
        const item = {
          id: nextId('teachers'),
          full_name: get(body, 'full_name'),
          subject: get(body, 'subject'),
          phone: get(body, 'phone'),
          login: get(body, 'login'),
        };
        state.teachers.push(item);
        return delay(item);
      }
    }
    let m;
    if ((m = /^\/api\/teachers\/(\d+)\/$/.exec(pathname))) {
      const id = Number(m[1]);
      if (M === 'DELETE') {
        state.teachers = state.teachers.filter((t) => t.id !== id);
        // ученики удалённого преподавателя освобождаются (теряют teacher_id)
        state.students.forEach((s) => { if (s.teacher_id === id) s.teacher_id = null; });
        return delay({ ok: true });
      }
      if (M === 'GET') return delay(state.teachers.find((t) => t.id === id));
    }

    // ---- Students ----
    if (pathname === App.CONFIG.ENDPOINTS.students) {
      if (M === 'GET') {
        let list = state.students.slice();
        if (qs.class) list = list.filter((s) => s.class_name === qs.class);
        return delay(list);
      }
      if (M === 'POST') {
        const subjects = body instanceof FormData ? body.getAll('subjects') : (body.subjects || []);
        const item = {
          id: nextId('students'),
          full_name: get(body, 'full_name'),
          class_name: get(body, 'class_name'),
          subjects: subjects,
          birth_date: get(body, 'birth_date'),
          login: get(body, 'login'),
          password: get(body, 'password'),
          teacher_id: user.role === 'TEACHER' ? user.id : (Number(get(body, 'teacher_id')) || null),
        };
        state.students.push(item);
        return delay(item);
      }
    }
    if ((m = /^\/api\/students\/(\d+)\/$/.exec(pathname))) {
      const id = Number(m[1]);
      const student = state.students.find((item) => item.id === id);
      if (!student) return fail('Ученик не найден', 404);
      if (M === 'PATCH') {
        if (user.role !== 'TEACHER' || student.teacher_id !== user.id) return fail('Недостаточно прав', 403);
        const fullName = get(body, 'full_name');
        const className = get(body, 'class_name');
        const birthDate = get(body, 'birth_date');
        const subjects = get(body, 'subjects');
        if (fullName !== undefined) {
          if (!String(fullName).trim()) return fail('Укажите ФИО ученика.', 400);
        }
        let updatedSubjects;
        if (subjects !== undefined) {
          updatedSubjects = Array.isArray(subjects)
            ? Array.from(new Set(subjects.map((subject) => String(subject).trim()).filter(Boolean)))
            : [];
          if (!updatedSubjects.length) return fail('Выберите хотя бы один предмет.', 400);
        }
        if (fullName !== undefined) student.full_name = String(fullName).trim();
        if (className !== undefined) student.class_name = String(className).trim();
        if (birthDate !== undefined) student.birth_date = String(birthDate).trim();
        if (updatedSubjects) student.subjects = updatedSubjects;
        const edit = {
          id: student.id,
          full_name: student.full_name,
          class_name: student.class_name,
          birth_date: student.birth_date,
          subjects: student.subjects,
        };
        studentEdits = studentEdits.filter((item) => item.id !== student.id).concat(edit);
        saveDemoList(DEMO_STUDENT_EDITS_KEY, studentEdits);
        return delay(student);
      }
      if (M === 'DELETE') {
        state.students = state.students.filter((s) => s.id !== id);
        // чистим связанные данные ученика: журнал, репертуар, ДЗ, расписание
        state.journal = state.journal.filter((j) => j.student_id !== id);
        state.repertoire = state.repertoire.filter((r) => r.student_id !== id);
        state.homework = state.homework.filter((hw) => hw.student_id !== id);
        state.schedule = state.schedule.filter((sc) => sc.student_id !== id);
        saveDemoList(DEMO_JOURNAL_KEY, state.journal);
        saveDemoList(DEMO_SCHEDULE_KEY, state.schedule);
        return delay({ ok: true });
      }
      if (M === 'GET') return delay(student);
    }

    // ---- Events ----
    if (pathname === App.CONFIG.ENDPOINTS.events) {
      if (M === 'GET') {
        const list = state.events.slice().sort((a, b) => (a.date < b.date ? -1 : 1));
        return delay(list);
      }
      if (M === 'POST') {
        const item = {
          id: nextId('events'),
          title: get(body, 'title'),
          place: get(body, 'place'),
          date: get(body, 'date'),
          time: get(body, 'time'),
          description: get(body, 'description') || '',
        };
        state.events.push(item);
        return delay(item);
      }
    }
    if ((m = /^\/api\/events\/(\d+)\/$/.exec(pathname))) {
      const id = Number(m[1]);
      if (M === 'DELETE') {
        state.events = state.events.filter((e) => e.id !== id);
        return delay({ ok: true });
      }
    }

    // ---- Subjects ----
    if (M === 'GET' && pathname === App.CONFIG.ENDPOINTS.subjects) {
      return delay(App.CONFIG.SUBJECTS.map((s, i) => ({ id: i + 1, name: s })));
    }

    // ---- Teacher: мои ученики ----
    if (pathname === App.CONFIG.ENDPOINTS.myStudents) {
      if (M === 'GET') return delay(state.students.filter((s) => s.teacher_id === user.id));
      if (M === 'POST') {
        const subjects = body instanceof FormData ? body.getAll('subjects') : (body.subjects || []);
        const item = {
          id: nextId('students'),
          full_name: get(body, 'full_name'),
          class_name: get(body, 'class_name'),
          birth_date: get(body, 'birth_date'),
          login: get(body, 'login'),
          password: get(body, 'password'),
          subjects: subjects,
          teacher_id: user.id,
        };
        state.students.push(item);
        return delay(item);
      }
    }
    if (M === 'GET' && pathname === App.CONFIG.ENDPOINTS.teacherStudentStats) {
      if (user.role !== 'TEACHER') return fail('Недостаточно прав', 403);
      return delay(state.students.filter((student) => student.teacher_id === user.id).map(studentStatistics));
    }

    // ---- Journal ----
    if (pathname === App.CONFIG.ENDPOINTS.journal) {
      if (M === 'GET') {
        let list = state.journal.slice();
        if (qs.student) list = list.filter((j) => String(j.student_id) === String(qs.student));
        if (qs.subject) list = list.filter((j) => j.subject === qs.subject);
        list.sort((a, b) => (a.date < b.date ? 1 : -1));
        return delay(list);
      }
      if (M === 'POST') {
        const item = {
          id: nextId('journal'),
          student_id: Number(get(body, 'student_id')),
          subject: get(body, 'subject'),
          date: get(body, 'date'),
          attendance: get(body, 'attendance') || 'Б',
          grade: get(body, 'grade') ? Number(get(body, 'grade')) : null,
          comment: get(body, 'comment') || '',
        };
        const updated = state.journal.concat(item);
        saveDemoList(DEMO_JOURNAL_KEY, updated);
        state.journal = updated;
        return delay(item);
      }
    }

    // ---- Repertoire ----
    if (pathname === App.CONFIG.ENDPOINTS.repertoire) {
      if (M === 'GET') {
        let list = state.repertoire.slice();
        if (qs.student) list = list.filter((r) => String(r.student_id) === String(qs.student));
        return delay(list);
      }
      if (M === 'POST') {
        const item = {
          id: nextId('repertoire'),
          student_id: Number(get(body, 'student_id')),
          title: get(body, 'title'),
          composer: get(body, 'composer'),
          subject: get(body, 'subject') || 'Специальность',
          status: get(body, 'status') || 'В работе',
        };
        state.repertoire.push(item);
        return delay(item);
      }
    }
    if ((m = /^\/api\/repertoire\/(\d+)\/$/.exec(pathname))) {
      const id = Number(m[1]);
      const item = state.repertoire.find((r) => r.id === id);
      if (!item) return fail('Не найдено', 404);
      if (M === 'PATCH' || M === 'PUT') {
        ['title', 'composer', 'subject', 'status'].forEach((k) => {
          const v = get(body, k);
          if (v !== undefined && v !== null) item[k] = v;
        });
        return delay(item);
      }
      if (M === 'DELETE') {
        state.repertoire = state.repertoire.filter((r) => r.id !== id);
        return delay({ ok: true });
      }
    }

    // ---- Homework ----
    if (pathname === App.CONFIG.ENDPOINTS.homework) {
      if (M === 'GET') {
        let list = state.homework.slice();
        if (qs.student) list = list.filter((hw) => String(hw.student_id) === String(qs.student));
        list.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
        return delay(list);
      }
      if (M === 'POST') {
        const file = body instanceof FormData ? body.get('file') : null;
        const item = {
          id: nextId('homework'),
          subject: get(body, 'subject'),
          student_id: Number(get(body, 'student_id')),
          title: get(body, 'title'),
          description: get(body, 'description') || '',
          due_date: get(body, 'due_date'),
          created_at: new Date().toISOString().slice(0, 10),
          file_name: file && file.name ? file.name : null,
          file_url: file && file.name ? '#' : null,
          teacher: user.full_name,
        };
        state.homework.push(item);
        return delay(item);
      }
    }

    // ---- Teacher schedule management ----
    if (pathname === App.CONFIG.ENDPOINTS.teacherSchedule) {
      if (user.role !== 'TEACHER') return fail('Недостаточно прав', 403);
      if (M === 'GET') {
        const studentsById = new Map(state.students.map((student) => [student.id, student]));
        const order = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return delay(state.schedule.filter((lesson) => lesson.teacher_id === user.id)
          .map((lesson) => Object.assign({}, lesson, {
            student_name: (studentsById.get(lesson.student_id) || {}).full_name || 'Ученик',
          }))
          .sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day) || a.time.localeCompare(b.time)));
      }
      if (M === 'POST') {
        const studentId = Number(get(body, 'student_id'));
        const student = state.students.find((item) => item.id === studentId && item.teacher_id === user.id);
        if (!student) return fail('Выберите своего ученика.', 400);
        const day = get(body, 'day');
        const time = get(body, 'time');
        if (!day || !time || !get(body, 'subject')) return fail('Укажите день, время и предмет.', 400);
        const lesson = {
          id: nextId('schedule'),
          student_id: student.id,
          student_name: student.full_name,
          teacher_id: user.id,
          teacher: user.full_name,
          subject: get(body, 'subject'),
          day,
          time,
          room: get(body, 'room') || '—',
          kind: get(body, 'kind') || 'индивидуальное',
        };
        const updated = state.schedule.concat(lesson);
        saveDemoList(DEMO_SCHEDULE_KEY, updated);
        state.schedule = updated;
        return delay(lesson);
      }
    }
    if ((m = /^\/api\/teacher\/schedule\/(\d+)\/$/.exec(pathname))) {
      if (user.role !== 'TEACHER') return fail('Недостаточно прав', 403);
      const lesson = state.schedule.find((item) => item.id === Number(m[1]) && item.teacher_id === user.id);
      if (!lesson) return fail('Занятие не найдено', 404);
      if (M === 'DELETE') {
        const updated = state.schedule.filter((item) => item.id !== lesson.id);
        saveDemoList(DEMO_SCHEDULE_KEY, updated);
        state.schedule = updated;
        return delay({ ok: true });
      }
    }

    // ---- Student personal endpoints ----
    if (M === 'GET' && pathname === '/api/student/dashboard/') {
      const mine = state.journal.filter((j) => j.student_id === user.id);
      const grades = mine.filter((j) => j.grade != null).map((j) => j.grade);
      const avg = grades.length ? (grades.reduce((a, b) => a + b, 0) / grades.length) : 0;
      const bySubject = {};
      state.journal.filter((j) => j.student_id === user.id).forEach((j) => {
        const s = bySubject[j.subject] || (bySubject[j.subject] = { subject: j.subject, grades: [], absences: 0 });
        if (j.grade != null) s.grades.push(j.grade);
        if (j.attendance === 'Н/Б') s.absences += 1;
      });
      return delay({
        full_name: user.full_name,
        class_name: (state.students.find((s) => s.id === user.id) || {}).class_name || '',
        average: Math.round(avg * 10) / 10,
        grades_count: grades.length,
        absences: mine.filter((j) => j.attendance === 'Н/Б').length,
        homework_pending: state.homework.filter((hw) => hw.student_id === user.id).length,
        recent: mine.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5),
        events: state.events.slice().sort((a, b) => (a.date < b.date ? -1 : 1)).slice(0, 3),
        by_subject: Object.values(bySubject),
      });
    }
    if (M === 'GET' && pathname === '/api/student/grades/') {
      const mine = state.journal.filter((j) => j.student_id === user.id);
      const bySubject = {};
      mine.forEach((j) => {
        const s = bySubject[j.subject] || (bySubject[j.subject] = { subject: j.subject, records: [] });
        s.records.push(j);
      });
      return delay(Object.values(bySubject).map((s) => ({
        subject: s.subject,
        records: s.records.sort((a, b) => (a.date < b.date ? 1 : -1)),
      })));
    }
    if (M === 'GET' && pathname === '/api/student/repertoire/') {
      return delay(state.repertoire.filter((r) => r.student_id === user.id));
    }
    if (M === 'GET' && pathname === '/api/student/homework/') {
      return delay(state.homework.filter((hw) => hw.student_id === user.id).sort((a, b) => (a.created_at < b.created_at ? 1 : -1)));
    }
    if (M === 'GET' && pathname === '/api/student/schedule/') {
      const order = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      const list = state.schedule.filter((s) => s.student_id === user.id)
        .sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day) || a.time.localeCompare(b.time));
      return delay(list);
    }

    return null; // не обработано -> api.js попробует реальный запрос
  }

  App.mock = {
    enabled: () => App.CONFIG.DEMO_MODE === true,
    request(method, path, payload) {
      if (!App.mock.enabled()) return null;
      return handle(method, path, payload);
    },
    reset() {
      // Заглушка для возможного сброса демо-данных
      location.reload();
    },
  };
})(window.App);
