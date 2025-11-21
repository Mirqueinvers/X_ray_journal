import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Настройки подключения к БД (берём из переменных окружения docker-compose)
const db_config = {
  host: process.env.DB_HOST || 'mysql',   // в docker-compose сервис называется mysql
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'userpass',
  database: process.env.DB_NAME || 'x_ray_journal',
  dateStrings: true,
};

let db;

// ➕ Функция для ожидания подключения к БД
const handleDisconnect = () => {
  db = mysql.createConnection(db_config);

  db.connect(err => {
    if (err) {
      // Если ошибка, пробуем переподключиться через 3 секунды
      console.error('❌ Ошибка подключения к базе данных, повторная попытка через 3 секунды:', err);
      setTimeout(handleDisconnect, 3000);
    } else {
      console.log('✅ Подключено к MySQL');
      // Подключение успешно, запускаем сервер
      startServer();
    }
  });

  db.on('error', err => {
    // Если соединение потеряно, пытаемся переподключиться
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('❌ Соединение с MySQL потеряно, пытаюсь переподключиться...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

// Функция запуска сервера
const startServer = () => {
  // Простой эндпоинт для теста
  app.get('/api/test', (req, res) => {
    db.query("SELECT 'Hello from Docker MySQL!' AS message", (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  });

  // ➕ Добавить пациента + визит
  app.post('/api/add-patient-with-visit', (req, res) => {
    const { fio, birth_date, adress, visit_date } = req.body;

    if (!fio || !birth_date || !adress || !visit_date) {
      return res.status(400).json({ success: false, error: 'Заполните все поля' });
    }

    const sqlInsertPatient = `INSERT INTO patients (full_name, birth_date, adress) VALUES (?, ?, ?)`;

    db.query(sqlInsertPatient, [fio, birth_date, adress], (err, result) => {
      if (err) {
        console.error('❌ Ошибка при добавлении пациента:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      const patientId = result.insertId;

      const sqlInsertVisit = `INSERT INTO visits (patient_id, visit_date) VALUES (?, ?)`;
      db.query(sqlInsertVisit, [patientId, visit_date], (err2) => {
        if (err2) {
          console.error('❌ Ошибка при добавлении визита:', err2);
          return res.status(500).json({ success: false, error: err2.message });
        }

        res.json({ success: true, patientId });
      });
    });
  });

  // 📆 Получить пациентов с их исследованиями по дате визита
  app.get('/api/patients-by-visit-date', (req, res) => {
    const { visit_date } = req.query;
    if (!visit_date) {
      return res.status(400).json({ success: false, error: 'Не указана дата визита' });
    }

    const sql = `
      SELECT 
        p.id AS patient_id, p.full_name, p.birth_date, p.adress,
        v.id AS visit_id, v.visit_date,
        r.id AS research_id, r.dsnapr, r.research_region, r.research_type,
        r.cassete_size, r.numb_of_proc, r.dose, r.sent, r.issued_on_hands,
        r.description 
      FROM patients p
      JOIN visits v ON p.id = v.patient_id
      LEFT JOIN research r ON v.id = r.visit_id
      WHERE v.visit_date = ?
      ORDER BY v.id ASC, r.created_at ASC
    `;

    db.query(sql, [visit_date], (err, rows) => {
      if (err) {
        console.error('❌ Ошибка получения пациентов:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      // Группировка пациентов и их исследований
      const patientsMap = new Map();

      rows.forEach(row => {
        const {
          patient_id, full_name, birth_date, adress,
          visit_id, visit_date,
          research_id, dsnapr, research_region,
          research_type, cassete_size, numb_of_proc, dose, sent, issued_on_hands,
          description  // ← получаем description из строки БД
        } = row;

        if (!patientsMap.has(patient_id)) {
          patientsMap.set(patient_id, {
            id: patient_id,
            full_name,
            birth_date,
            adress,
            visit_id,
            visit_date,
            researches: [],
          });
        }

        if (research_id) {
          patientsMap.get(patient_id).researches.push({
            id: research_id,
            dsnapr,
            research_region,
            research_type,
            cassete_size,
            numb_of_proc,
            dose,
            sent,
            issued_on_hands: issued_on_hands == 1,  // Преобразуем в boolean
            description: description || ""  // ← добавляем description в объект исследования
          });
        }
      });

      const result = Array.from(patientsMap.values());
      res.json({ success: true, patients: result });
    });
  });

  // 📋 Добавить исследование пациенту
  app.post('/api/add-research', (req, res) => {
    console.log('Body:', req.body);
    const {
      patient_id,
      visit_id,
      dsnapr,
      research_region,
      research_type,
      cassete_size,
      numb_of_proc,
      dose,
      sent
    } = req.body;

    if (!patient_id || !visit_id) {
      return res.status(400).json({ success: false, error: 'Не указан пациент или визит' });
    }

    const sql = `
      INSERT INTO research (
        patient_id, visit_id, dsnapr,
        research_region, research_type,
        cassete_size, numb_of_proc, dose, sent, issued_on_hands
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        patient_id,
        visit_id,
        dsnapr || null,
        research_region || null,
        research_type || null,
        cassete_size || null,
        numb_of_proc || null,
        dose || null,
        sent || null,
        false  // по умолчанию новое исследование не выдано
      ],
      (err, result) => {
        if (err) {
          console.error('Ошибка при добавлении исследования:', err);
          return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, id: result.insertId });
      }
    );
  });

  // 🔍 Получить список уникальных пациентов по ФИО + дате рождения
  app.get('/api/patients', (req, res) => {
    const sql = `
      SELECT 
        MIN(id) as id, 
        full_name, 
        birth_date, 
        adress
      FROM patients
      GROUP BY full_name, birth_date, adress
      ORDER BY id DESC
    `;

    db.query(sql, (err, rows) => {
      if (err) {
        console.error('❌ Ошибка получения всех пациентов:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      res.json(rows);
    });
  });

  // 🧾 Получить все исследования пациента
  app.get('/api/patient/:id/researches', (req, res) => {
    const patientId = req.params.id;

    // Получаем ФИО и дату рождения пациента по его id
    const getPatientSql = `SELECT full_name, birth_date FROM patients WHERE id = ?`;
    db.query(getPatientSql, [patientId], (err, patientRows) => {
      if (err || patientRows.length === 0) {
        return res.status(404).json({ success: false, error: 'Пациент не найден' });
      }

      const { full_name, birth_date } = patientRows[0];

      // Выбираем все исследования всех записей с таким же ФИО + датой рождения
      const sql = `
        SELECT r.*, v.visit_date
        FROM research r
        LEFT JOIN visits v ON r.visit_id = v.id
        LEFT JOIN patients p ON r.patient_id = p.id
        WHERE p.full_name = ? AND p.birth_date = ?
        ORDER BY v.visit_date ASC
      `;

      db.query(sql, [full_name, birth_date], (err, rows) => {
        if (err) {
          console.error('❌ Ошибка получения исследований:', err);
          return res.status(500).json({ success: false, error: err.message });
        }

        console.log('rows из MySQL:', rows); // вывод из MySQL

        // Преобразуем поле issued_on_hands в boolean и добавляем description
        const researches = rows.map(r => ({
          ...r,
          issued_on_hands: r.issued_on_hands == 1,  // двойное равно проверяет '1' и 1
          description: r.description || ""  // ← добавляем description
        }));

        console.log('researches после преобразования:', researches);

        res.json(researches);
      });
    });
  });

  // 🗑️ Удалить пациента и все связанные данные
  app.delete('/api/delete-patient/:patientId', (req, res) => {
    const patientId = req.params.patientId;

    if (!patientId) {
      return res.status(400).json({ success: false, error: 'Не указан ID пациента' });
    }

    // Удаляем исследования, связанные с визитами пациента
    const sqlDeleteResearch = `
      DELETE r FROM research r
      JOIN visits v ON r.visit_id = v.id
      WHERE v.patient_id = ?
    `;

    // Удаляем визиты пациента
    const sqlDeleteVisits = `DELETE FROM visits WHERE patient_id = ?`;

    // Удаляем пациента
    const sqlDeletePatient = `DELETE FROM patients WHERE id = ?`;

    db.beginTransaction(err => {
      if (err) {
        console.error('Ошибка начала транзакции:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      db.query(sqlDeleteResearch, [patientId], (err) => {
        if (err) {
          return db.rollback(() => {
            console.error('Ошибка удаления исследований:', err);
            res.status(500).json({ success: false, error: err.message });
          });
        }

        db.query(sqlDeleteVisits, [patientId], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Ошибка удаления визитов:', err);
              res.status(500).json({ success: false, error: err.message });
            });
          }

          db.query(sqlDeletePatient, [patientId], (err, result) => {
            if (err) {
              return db.rollback(() => {
                console.error('Ошибка удаления пациента:', err);
                res.status(500).json({ success: false, error: err.message });
              });
            }

            db.commit(err => {
              if (err) {
                return db.rollback(() => {
                  console.error('Ошибка коммита транзакции:', err);
                  res.status(500).json({ success: false, error: err.message });
                });
              }

              res.json({ success: true, message: 'Пациент и все связанные данные успешно удалены' });
            });
          });
        });
      });
    });
  });

  // ========== Новые маршруты для редактирования ==========

  // Редактировать пациента
  app.put('/api/patient/:id', (req, res) => {
    const patientId = req.params.id;
    const { fio, birth_date, adress } = req.body;

    if (!fio || !birth_date || !adress) {
      return res.status(400).json({ success: false, error: 'Заполните все поля' });
    }

    const sql = `UPDATE patients SET full_name = ?, birth_date = ?, adress = ? WHERE id = ?`;

    db.query(sql, [fio, birth_date, adress, patientId], (err, result) => {
      if (err) {
        console.error('Ошибка обновления пациента:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'Пациент не найден' });
      }

      res.json({ success: true, message: 'Пациент обновлён' });
    });
  });

  // Редактировать визит
  app.put('/api/visit/:id', (req, res) => {
    const visitId = req.params.id;
    const { visit_date } = req.body;

    if (!visit_date) {
      return res.status(400).json({ success: false, error: 'Не указана дата визита' });
    }

    const sql = `UPDATE visits SET visit_date = ? WHERE id = ?`;

    db.query(sql, [visit_date, visitId], (err, result) => {
      if (err) {
        console.error('Ошибка обновления визита:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'Визит не найден' });
      }

      res.json({ success: true, message: 'Визит обновлён' });
    });
  });

  // Редактировать исследование
  app.put('/api/research/:id', (req, res) => {
    const researchId = req.params.id;
    const {
      dsnapr,
      research_region,
      research_type,
      cassete_size,
      numb_of_proc,
      dose,
      sent,
      issued_on_hands
    } = req.body;

    const sql = `
      UPDATE research
      SET dsnapr = ?, research_region = ?, research_type = ?,
          cassete_size = ?, numb_of_proc = ?, dose = ?, sent = ?, issued_on_hands = ?
      WHERE id = ?
    `;

    db.query(sql, [
      dsnapr || null,
      research_region || null,
      research_type || null,
      cassete_size || null,
      numb_of_proc || null,
      dose || null,
      sent || null,
      issued_on_hands || false,  // добавляем поле
      researchId
    ], (err, result) => {
      if (err) {
        console.error('Ошибка обновления исследования:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'Исследование не найдено' });
      }

      res.json({ success: true, message: 'Исследование обновлено' });
    });
  });

  // Удаляет исследование
  app.delete('/api/research/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM research WHERE id = ?';

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Ошибка при удалении исследования:', err);
        return res.status(500).json({ success: false, error: 'Ошибка сервера' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'Исследование не найдено' });
      }

      res.json({ success: true });
    });
  });

  // Считает дозы по возрасту
  app.get('/api/research_doses', (req, res) => {
    const { startDate, endDate } = req.query;

    let sql = `
      SELECT
        r.research_region,
        SUM(COALESCE(r.dose, 0)) AS total_dose,
        CASE
          WHEN TIMESTAMPDIFF(YEAR, p.birth_date, CURDATE()) >= 18 THEN 'adult'
          ELSE 'child'
        END AS population_group
      FROM research r
      JOIN patients p ON r.patient_id = p.id
      JOIN visits v ON r.visit_id = v.id
      WHERE 1=1
    `;

    if (startDate) sql += ` AND v.visit_date >= ?`;
    if (endDate) sql += ` AND v.visit_date <= ?`;

    sql += ` GROUP BY r.research_region, population_group`;

    const params = [];
    if (startDate) params.push(startDate);
    if (endDate) params.push(endDate);

    db.query(sql, params, (err, rows) => {
      if (err) return res.status(500).json({ success: false, error: err.message });

      const grouped = {};
      rows.forEach(row => {
        if (!grouped[row.research_region]) grouped[row.research_region] = { adult: 0, child: 0 };
        grouped[row.research_region][row.population_group] = parseFloat(row.total_dose);
      });

      res.json(grouped);
    });
  });

  app.get('/api/research', (req, res) => {
    const { startDate, endDate } = req.query;

    let sql = `
      SELECT r.research_region, r.numb_of_proc
      FROM research r
      JOIN visits v ON r.visit_id = v.id
      WHERE 1=1
    `;

    const params = [];

    if (startDate) {
      sql += ' AND v.visit_date >= ?';
      params.push(startDate);
    }

    if (endDate) {
      sql += ' AND v.visit_date <= ?';
      params.push(endDate);
    }

    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error('Ошибка получения исследований:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      res.json(rows);
    });
  });

  app.post('/api/add-patient-with-visit', async (req, res) => {
    try {
      const { fio, birth_date, adress, visit_date } = req.body;

      // Разбиваем ФИО на части, если надо (пример)
      const [last_name, first_name, middle_name] = fio.split(' ');

      // Вставка пациента
      const [patientResult] = await pool.execute(
        'INSERT INTO patients (last_name, first_name, middle_name, birth_date, adress) VALUES (?, ?, ?, ?, ?)',
        [last_name, first_name, middle_name, birth_date, adress]
      );

      const patientId = patientResult.insertId;

      // Вставка визита с patientId
      await pool.execute(
        'INSERT INTO visits (patient_id, visit_date) VALUES (?, ?)',
        [patientId, visit_date]
      );

      // Возвращаем ID пациента клиенту
      res.json({ success: true, patientId });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: error.message });
    }
  });

  // Заполняет амб и стационары
  app.get("/research-summary", (req, res) => {
    const { startDate, endDate } = req.query;

    let whereClause = "";
    const params = [];

    if (startDate) {
      whereClause += "v.visit_date >= ?";
      params.push(startDate);
    }
    if (endDate) {
      if (whereClause) whereClause += " AND ";
      whereClause += "v.visit_date <= ?";
      params.push(endDate);
    }

    const sql = `
      SELECT r.research_region, r.sent, COUNT(*) AS researchCount,
             SUM(CAST(r.numb_of_proc AS UNSIGNED)) AS procCount
      FROM research r
      INNER JOIN visits v ON r.visit_id = v.id
      ${whereClause ? "WHERE " + whereClause : ""}
      GROUP BY r.research_region, r.sent
    `;

    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error("Ошибка при получении данных:", err);
        return res.status(500).json({ error: "Ошибка при получении данных" });
      }

      const result = {};

      rows.forEach(({ research_region, sent, researchCount, procCount }) => {
        let category;
        if (sent === "Стационар дневной") category = "Стационар дневной";
        else if (sent === "Стационар круглосуточный") category = "Стационар круглосуточный";
        else category = "Амбулаторно";

        if (!result[research_region]) {
          result[research_region] = {
            "Амбулаторно": { researchCount: 0, procCount: 0 },
            "Стационар дневной": { researchCount: 0, procCount: 0 },
            "Стационар круглосуточный": { researchCount: 0, procCount: 0 },
          };
        }

        result[research_region][category].researchCount += Number(researchCount) || 0;
        result[research_region][category].procCount += Number(procCount) || 0;
      });

      res.json(result);
    });
  });

  // Экспорт всей базы в один JSON
  app.get('/export', (req, res) => {
    const exportData = {};

    db.query('SELECT * FROM patients', (err, patients) => {
      if (err) return res.status(500).json({ error: err.message });
      exportData.patients = patients;

      db.query('SELECT * FROM visits', (err, visits) => {
        if (err) return res.status(500).json({ error: err.message });
        exportData.visits = visits;

        db.query('SELECT * FROM research', (err, research) => {
          if (err) return res.status(500).json({ error: err.message });
          exportData.research = research;

          // Красивый JSON с отступами
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify(exportData, null, 2));
        });
      });
    });
  });

  // Импорт
  app.post('/import', (req, res) => {
    const data = req.body;

    if (!data.patients || !data.visits || !data.research) {
      return res.status(400).json({ error: "Неверный формат JSON" });
    }

    const patientIdMap = {}; // старый id => новый id
    const visitIdMap = {};   // старый id => новый id

    // 1. Вставляем пациентов
    const patientPromises = data.patients.map(p => {
      const oldId = p.id;
      delete p.id; // удаляем id, чтобы база присвоила новый
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO patients SET ?', p, (err, result) => {
          if (err) reject(err);
          else {
            patientIdMap[oldId] = result.insertId;
            resolve();
          }
        });
      });
    });

    Promise.all(patientPromises)
      .then(() => {
        // 2. Вставляем визиты с корректными patient_id
        const visitPromises = data.visits.map(v => {
          const oldId = v.id;
          const oldPatientId = v.patient_id;
          v.patient_id = patientIdMap[oldPatientId]; // обновляем id пациента
          delete v.id; // база присвоит новый id
          return new Promise((resolve, reject) => {
            db.query('INSERT INTO visits SET ?', v, (err, result) => {
              if (err) reject(err);
              else {
                visitIdMap[oldId] = result.insertId;
                resolve();
              }
            });
          });
        });
        return Promise.all(visitPromises);
      })
      .then(() => {
        // 3. Вставляем исследования с корректными patient_id и visit_id
        const researchPromises = data.research.map(r => {
          const oldPatientId = r.patient_id;
          const oldVisitId = r.visit_id;
          r.patient_id = patientIdMap[oldPatientId];
          if (oldVisitId) r.visit_id = visitIdMap[oldVisitId];
          delete r.id; // база присвоит новый id
          return new Promise((resolve, reject) => {
            db.query('INSERT INTO research SET ?', r, (err, result) => {
              if (err) reject(err);
              else resolve();
            });
          });
        });
        return Promise.all(researchPromises);
      })
      .then(() => {
        res.json({ status: "Импорт завершён с сохранением связей" });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });

  // Добавляем новый маршрут для обновления статуса "выдано на руки"
  app.put('/api/research/:id/issue', (req, res) => {
    const researchId = req.params.id;
    const { issued_on_hands } = req.body;

    const sql = 'UPDATE research SET issued_on_hands = ? WHERE id = ?';

    db.query(sql, [issued_on_hands, researchId], (err, result) => {
      if (err) {
        console.error('Ошибка обновления статуса выдачи:', err);
        return res.status(500).json({ success: false, error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'Исследование не найдено' });
      }

      res.json({ success: true, message: 'Статус выдачи обновлён' });
    });
  });

  // 💾 Сохранить описание исследования
  // POST /api/save-research-description
  app.post('/api/save-research-description', (req, res) => {
    const { research_id, description } = req.body;

    if (!research_id) return res.status(400).json({ success: false, error: "Не указан research_id" });

    const sql = "UPDATE research SET description = ? WHERE id = ?";
    db.query(sql, [description || "", research_id], (err) => {
      if (err) {
        console.error("Ошибка сохранения описания:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true });
    });
  });

  // просмотр описания
  // GET /api/get-research-description?research_id=...
  app.get('/api/get-research-description', (req, res) => {
    const { research_id } = req.query;
    if (!research_id) return res.status(400).json({ success: false, error: "Не указан research_id" });

    const sql = "SELECT description FROM research WHERE id = ?";
    db.query(sql, [research_id], (err, results) => {
      if (err) {
        console.error("Ошибка получения описания:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, description: results[0]?.description || "" });
    });
  });

  // График направлений от врачей
app.get('/api/referrals-by-doctor', (req, res) => {
  const { startDate, endDate } = req.query;

  let sql = `
    SELECT 
      r.sent as doctor_name,
      COUNT(DISTINCT CONCAT(v.visit_date, '-', r.patient_id)) as referral_count
    FROM research r
    JOIN visits v ON r.visit_id = v.id
    WHERE r.sent IS NOT NULL AND r.sent != ''
  `;

  const params = [];

  if (startDate) {
    sql += ' AND v.visit_date >= ?';
    params.push(startDate);
  }

  if (endDate) {
    sql += ' AND v.visit_date <= ?';
    params.push(endDate);
  }

  sql += ' GROUP BY r.sent ORDER BY referral_count DESC';

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error('❌ Ошибка получения направлений от врачей:', err);
      return res.status(500).json({ success: false, error: err.message });
    }

    // Преобразуем данные для графика
    const chartData = rows.map(row => ({
      name: row.doctor_name || 'Не указан',
      value: parseInt(row.referral_count) || 0
    })).filter(item => item.value > 0);

    res.json({ success: true, data: chartData });
  });
});

// Статистика по регионам исследований
app.get('/api/research-regions', (req, res) => {
  const { startDate, endDate } = req.query;

  let sql = `
    SELECT 
      r.research_region,
      COUNT(r.id) as research_count,
      SUM(CAST(r.numb_of_proc AS UNSIGNED)) as total_procedures,
      SUM(COALESCE(r.dose, 0)) as total_dose
    FROM research r
    JOIN visits v ON r.visit_id = v.id
    WHERE r.research_region IS NOT NULL AND r.research_region != ''
  `;

  const params = [];

  if (startDate) {
    sql += ' AND v.visit_date >= ?';
    params.push(startDate);
  }

  if (endDate) {
    sql += ' AND v.visit_date <= ?';
    params.push(endDate);
  }

  sql += ' GROUP BY r.research_region ORDER BY research_count DESC';

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error('❌ Ошибка получения статистики по регионам:', err);
      return res.status(500).json({ success: false, error: err.message });
    }

    // Преобразуем данные для графика
    const chartData = rows.map(row => ({
      region: row.research_region,
      researchCount: parseInt(row.research_count) || 0,
      procedureCount: parseInt(row.total_procedures) || 0,
      totalDose: parseFloat(row.total_dose) || 0
    })).filter(item => item.researchCount > 0);

    res.json({ success: true, data: chartData });
  });
});

// Статистика количества пациентов по месяцам
app.get('/api/patients-by-month', (req, res) => {
  const { startDate, endDate } = req.query;

  let sql = `
    SELECT 
      DATE_FORMAT(v.visit_date, '%Y-%m') as month,
      COUNT(DISTINCT CONCAT(v.visit_date, '-', r.patient_id)) as unique_patients,
      COUNT(DISTINCT v.visit_date) as working_days,
      COUNT(r.id) as total_researches
    FROM visits v
    LEFT JOIN research r ON v.id = r.visit_id
    WHERE 1=1
  `;

  const params = [];

  if (startDate) {
    sql += ' AND v.visit_date >= ?';
    params.push(startDate);
  }

  if (endDate) {
    sql += ' AND v.visit_date <= ?';
    params.push(endDate);
  }

  sql += ' GROUP BY DATE_FORMAT(v.visit_date, \'%Y-%m\') ORDER BY month ASC';

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error('❌ Ошибка получения статистики по месяцам:', err);
      return res.status(500).json({ success: false, error: err.message });
    }

    // Преобразуем данные для графика (БЕЗ дополнительной сортировки!)
    const chartData = rows.map(row => ({
      month: row.month,
      monthName: getMonthName(row.month),
      monthOrder: getMonthOrder(row.month),
      uniquePatients: parseInt(row.unique_patients) || 0,
      workingDays: parseInt(row.working_days) || 0,
      totalResearches: parseInt(row.total_researches) || 0
    })).filter(item => item.uniquePatients > 0);

    // Сортируем только по календарному порядку (январь, февраль, март...)
    chartData.sort((a, b) => a.monthOrder - b.monthOrder);

    console.log('Отсортированные данные:', chartData.map(item => ({ month: item.monthName, order: item.monthOrder })));

    res.json({ success: true, data: chartData });
  });
});

// Вспомогательная функция для получения названия месяца
function getMonthName(monthStr) {
  const [year, month] = monthStr.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
}

// Вспомогательная функция для получения порядкового номера месяца
function getMonthOrder(monthStr) {
  const [year, month] = monthStr.split('-');
  return parseInt(year + month);
}

  // ▶️ Запуск сервера
  app.listen(port, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${port}`);
  });
};

// Начинаем процесс подключения к БД
handleDisconnect();