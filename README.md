# StreetCats - Tech Web Project 2024/2025

StreetCats è una piattaforma web dedicata alla condivisione e al tracciamento degli avvistamenti di gatti randagi, sviluppata come progetto per il corso di Tecnologie Web.

La piattaforma è composta da:
* **Backend:** API REST sviluppate in **Python** con **FastAPI** e database **PostgreSQL**.
* **Frontend:** Applicazione Single Page sviluppata in **Angular v19** (servita tramite **Nginx**).

L'intera applicazione è containerizzata tramite **Docker** e orchestrata con **Docker Compose**, rendendo l'avvio immediato e indipendente dalla configurazione del sistema ospite.

---

## 🛠️ Prerequisiti
Prima di iniziare, assicurati di avere installato sul tuo computer:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/).
---

## 📂 Struttura del Progetto
Il repository è strutturato nel seguente modo:
```text
streetcats/
├── backend/          # Codice sorgente del server FastAPI e Dockerfile dedicato
├── frontend/         # Codice sorgente dell'applicazione Angular e Dockerfile (Multi-stage con Nginx)
└── docker-compose.yml # File di orchestrazione per backend, frontend e database
```
---

## 🚀 Come Eseguire l'Applicazione
Grazie a Docker Compose, puoi avviare l'intero stack (Frontend, Backend e Database) con pochissimi passaggi.
1. Posizionati nella directory del progetto
Apri il terminale e naviga fino alla cartella principale del progetto:
Bash
cd percorso/della/cartella/streetcats
2. Avvia i container
Esegui il comando di build e avvio. (Nota: la prima volta potrebbe impiegare qualche minuto per scaricare le immagini di base e compilare l'applicazione Angular).
Bash
docker compose up --build
💡 Consiglio: Se preferisci avviare i container in background liberando il terminale, aggiungi il flag -d:
Bash
docker compose up --build -d
---

## 🌐 Endpoint e Servizi Disponibili
Una volta che tutti i container sono visualizzati come running (o verdi su Docker Desktop), l'applicazione sarà accessibile ai seguenti indirizzi:

| Servizio | URL | Descrizione |
| :--- | :--- | :--- |
| Frontend (Angular) | http://localhost:4200 | L'interfaccia utente completa di StreetCats. |
| Backend (FastAPI) | http://localhost:8000 | L'indirizzo base del server API. |
| Documentazione API | http://localhost:8000/docs | Interfaccia Swagger UI interattiva per testare le API. |

---

## 🛑 Come Fermare l'Applicazione
Per spegnere i container e liberare le porte del computer:
Se hai avviato i container in primo piano, premi CTRL + C nel terminale.
Se hai avviato i container in background (con il flag -d), esegui:
```Bash
docker compose down
Se desideri spegnere i container eliminando anche i volumi del database (resettando così i dati salvati per ripartire da una situazione pulita), esegui:
Bash
docker compose down -v
```
---
##🧪 Testing
I test end-to-end della piattaforma sono stati sviluppati utilizzando Playwright. Per eseguirli localmente, assicurati che l'applicazione sia avviata in Docker e, all'interno della cartella frontend, lancia:
```Bash
npm run test
```
---
