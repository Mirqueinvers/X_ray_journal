# backup.ps1
# Скрипт для автоматического бэкапа в GitHub

# Получаем текущую дату
$today = Get-Date -Format "yyyy-MM-dd"

# Добавляем все файлы
git add .

# Делаем коммит
git commit -m "Backup on $today"

# Пушим (если новая ветка — автоматически привяжем к origin)
git push -u origin HEAD
