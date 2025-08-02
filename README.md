# MangaWatcher

Un'applicazione Vue.js per tracciare l'uscita di nuovi volumi manga dalla tua watchlist personale di MyAnimeList.

## 🚀 Caratteristiche

- **Ricerca Manga**: Cerca manga tramite l'API di MyAnimeList
- **Watchlist Personale**: Gestisci la tua lista di manga da tracciare
- **Stati di Lettura**: Organizza i manga per stato (in lettura, completato, in pausa, ecc.)
- **Link Amazon**: Collegamenti diretti ad Amazon.it per l'acquisto
- **Interfaccia Moderna**: UI basata su shadcn/ui con design responsive
- **Notifiche**: Sistema di toast per feedback utente

## 🛠️ Tecnologie

- **Vue 3** - Framework JavaScript progressivo
- **TypeScript** - Tipizzazione statica
- **Pinia** - Gestione dello stato
- **Vue Router** - Routing client-side
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componenti UI moderni
- **Sonner** - Notifiche toast
- **Lucide Vue** - Icone

## 📦 Installazione

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd mangawatcher
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   ```bash
   cp .env.template .env
   ```
   
   Aggiungi il tuo `VITE_MAL_CLIENT_ID` nel file `.env`:
   ```env
   VITE_MAL_CLIENT_ID=your_client_id_here
   ```

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

5. **Apri nel browser**
   ```
   http://localhost:3000
   ```

### 🚨 Risoluzione Problemi Comuni

#### Errore PowerShell "Impossibile caricare il file npm.ps1"
Se ricevi un errore di esecuzione script in PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Errore PostCSS "module is not defined"
Il file `postcss.config.js` è stato rinominato in `postcss.config.cjs` per compatibilità con ES modules.

#### Errore "Cannot find module 'tailwindcss-animate'"
Il pacchetto `tailwindcss-animate` è stato aggiunto alle dipendenze. Se persiste:
```bash
npm install tailwindcss-animate
```

#### Errore TypeScript "Failed to resolve extends base type"
I componenti Button e Badge sono stati aggiornati per rimuovere le dipendenze da `VariantProps`.

#### Errore di dipendenze
Se hai problemi con le dipendenze:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🔧 Configurazione MyAnimeList API

Per utilizzare l'API di MyAnimeList:

1. Vai su [MyAnimeList Developer](https://myanimelist.net/apiconfig)
2. Crea una nuova applicazione
3. Copia il `Client ID`
4. Inseriscilo nel file `.env`

## 📁 Struttura del Progetto

```
src/
├── components/
│   └── ui/           # Componenti shadcn/ui
├── views/            # Pagine principali
│   ├── Home.vue
│   ├── Search.vue
│   └── Watchlist.vue
├── store/            # Store Pinia
│   └── watchlist.ts
├── services/         # Servizi API
│   └── mal.ts
├── composables/      # Composables Vue
│   └── useMangaSearch.ts
├── utils/            # Utility
│   └── amazon.ts
└── types/            # Definizioni TypeScript
    └── manga.ts
```

## 🎯 Funzionalità Principali

### Home
- Dashboard con statistiche della watchlist
- Accesso rapido alle funzionalità principali
- Manga aggiornati di recente

### Ricerca
- Ricerca manga tramite MyAnimeList API
- Risultati con immagini e dettagli
- Aggiunta diretta alla watchlist
- Manga popolari suggeriti

### Watchlist
- Lista completa dei manga tracciati
- Filtri per stato di lettura
- Gestione note personali
- Collegamenti Amazon
- Statistiche per categoria

## 🔮 Funzionalità Future

- **Sistema di Notifiche**: Notifiche push per nuovi volumi
- **Sincronizzazione MAL**: Import/export dalla watchlist MyAnimeList
- **Tracking Volumi**: Monitoraggio specifico dei volumi
- **Backend**: API per notifiche e sincronizzazione
- **PWA**: Supporto per Progressive Web App

## 🧪 Test

```bash
npm run test:unit
```

## 📦 Build

```bash
npm run build
```

## 🎨 Formattazione

```bash
# Formatta tutto il codice
npm run format

# Controlla la formattazione
npm run format:check

# Lint e fix automatico
npm run lint
```

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🙏 Ringraziamenti

- [MyAnimeList](https://myanimelist.net/) per l'API
- [shadcn/ui](https://ui.shadcn.com/) per i componenti UI
- [Vue.js](https://vuejs.org/) per il framework 