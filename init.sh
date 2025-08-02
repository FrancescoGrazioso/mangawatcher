#!/bin/bash

# MangaWatcher - Script di inizializzazione
echo "🚀 Inizializzazione MangaWatcher..."

# Verifica che Node.js sia installato
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non è installato. Installa Node.js prima di continuare."
    exit 1
fi

# Verifica che npm sia installato
if ! command -v npm &> /dev/null; then
    echo "❌ npm non è installato. Installa npm prima di continuare."
    exit 1
fi

# Controlla se esiste già il file .env
if [ ! -f .env ]; then
    echo "📝 Creazione file .env da template..."
    cp .env.template .env
    echo "✅ File .env creato!"
    echo "⚠️  Ricordati di aggiungere il tuo VITE_MAL_CLIENT_ID nel file .env"
else
    echo "ℹ️  File .env già esistente"
fi

# Installa le dipendenze se non sono già installate
if [ ! -d "node_modules" ]; then
    echo "📦 Installazione dipendenze..."
    npm install
    echo "✅ Dipendenze installate!"
else
    echo "ℹ️  Dipendenze già installate"
fi

echo ""
echo "🎉 Inizializzazione completata!"
echo ""
echo "📋 Prossimi passi:"
echo "1. Aggiungi il tuo VITE_MAL_CLIENT_ID nel file .env"
echo "2. Esegui 'npm run dev' per avviare il server di sviluppo"
echo "3. Apri http://localhost:3000 nel browser"
echo ""
echo "📚 Per maggiori informazioni, consulta il README.md" 