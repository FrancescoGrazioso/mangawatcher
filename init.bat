@echo off
chcp 65001 >nul

echo 🚀 Inizializzazione MangaWatcher...

REM Abilita l'esecuzione di script PowerShell se necessario
echo 🔧 Configurazione PowerShell...
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force" >nul 2>&1

REM Controlla se esiste già il file .env
if not exist .env (
    echo 📝 Creazione file .env da template...
    copy .env.template .env >nul
    echo ✅ File .env creato!
    echo ⚠️  Ricordati di aggiungere il tuo VITE_MAL_CLIENT_ID nel file .env
) else (
    echo ℹ️  File .env già esistente
)

REM Installa le dipendenze se non sono già installate
if not exist node_modules (
    echo 📦 Installazione dipendenze...
    npm install
    echo ✅ Dipendenze installate!
) else (
    echo ℹ️  Dipendenze già installate
)

echo.
echo 🎉 Inizializzazione completata!
echo.
echo 📋 Prossimi passi:
echo 1. Aggiungi il tuo VITE_MAL_CLIENT_ID nel file .env
echo 2. Esegui 'npm run dev' per avviare il server di sviluppo
echo 3. Apri http://localhost:3000 nel browser
echo.
echo 📚 Per maggiori informazioni, consulta il README.md

pause 