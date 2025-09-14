@echo off
REM usage: wait-for-it.bat host port -- command args

SETLOCAL ENABLEDELAYEDEXPANSION

IF "%~3"=="" (
    echo Usage: %0 host port -- command args
    exit /b 1
)

SET HOST=%1
SET PORT=%2
shift
shift

REM пропускаем --
IF "%1"=="--" shift

:check
REM пробуем соединиться через powershell
powershell -Command "try { $tcp = New-Object System.Net.Sockets.TcpClient('%HOST%', %PORT%); $tcp.Close(); exit 0 } catch { exit 1 }"
IF %ERRORLEVEL% NEQ 0 (
    echo Waiting for %HOST%:%PORT%...
    timeout /t 3 /nobreak >nul
    GOTO check
)

REM запускаем команду
echo %*
%*
