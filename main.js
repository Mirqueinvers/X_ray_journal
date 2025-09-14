const { app, BrowserWindow } = require('electron');
const path = require('path');
const mysql = require('mysql2/promise');

let mainWindow;

async function initDatabase() {
  try {
    // Подключаемся к MySQL на localhost:3306 (Docker)
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'user',       // пользователь из docker-compose
      password: 'userpass',
      database: 'x_ray_journal',
      port: 3306
    });

    // Создание таблиц, если их нет
    await connection.query(`CREATE TABLE IF NOT EXISTS patients (
      id INT PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(255),
      birth_date DATE,
      adress VARCHAR(255)
    )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS visits (
      id INT PRIMARY KEY AUTO_INCREMENT,
      patient_id INT,
      visit_date DATE,
      FOREIGN KEY(patient_id) REFERENCES patients(id)
    )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS research (
      id INT PRIMARY KEY AUTO_INCREMENT,
      visit_id INT,
      dsnapr VARCHAR(255),
      research_region VARCHAR(255),
      research_type VARCHAR(255),
      cassete_size VARCHAR(50),
      numb_of_proc INT,
      dose FLOAT,
      sent BOOLEAN,
      created_at DATETIME,
      patient_id INT,
      FOREIGN KEY(visit_id) REFERENCES visits(id),
      FOREIGN KEY(patient_id) REFERENCES patients(id)
    )`);

    await connection.end();
    console.log('✅ База и таблицы готовы!');
  } catch (err) {
    console.error('❌ Ошибка при инициализации базы:', err);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const startURL = app.isPackaged
    ? `file://${path.join(__dirname, 'client/dist/index.html')}`
    : 'http://localhost:5173';

  mainWindow.loadURL(startURL);
}

app.whenReady().then(async () => {
  await initDatabase();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
