<!-- # StreetCats - Tech Web Project 2024/2025

StreetCats è una piattaforma web dedicata alla condivisione e al tracciamento degli avvistamenti di gatti randagi, sviluppata come progetto per il corso di Tecnologie Web.

La piattaforma è composta da:
* **Backend:** API REST sviluppate in **Python** con **FastAPI** e database **PostgreSQL**.
* **Frontend:** Single Page Application sviluppata in **Angular v19** (servita tramite **Nginx**).

L'intera applicazione è containerizzata tramite **Docker** e orchestrata con **Docker Compose**, rendendo l'avvio immediato e indipendente dalla configurazione del sistema ospite.

---
## 📂 Struttura del Progetto

```text
streetcats/
├── backend/          # Codice sorgente del server FastAPI e Dockerfile dedicato
├── frontend/         # Codice sorgente dell'applicazione Angular e Dockerfile (Multi-stage con Nginx)
└── docker-compose.yml # File di orchestrazione per backend, frontend e database
```
---

## 🚀 Come Eseguire l'Applicazione

1. Prima di iniziare, assicurati di avere installato sul tuo computer [Docker Desktop](https://www.docker.com/products/docker-desktop/).

2. Posizionati nella directory del progetto, apri il terminale e naviga fino alla cartella principale del progetto:
```Bash
cd percorso/della/cartella/StreetCats
```
3. Avvia i container eseguendo il comando di build e avvio.
```Bash
docker compose up --build
```
---

## 🌐 Endpoint e Servizi Disponibili
Una volta che tutti i container sono attivi l'applicazione sarà accessibile ai seguenti indirizzi:

| Servizio | URL | Descrizione |
| :--- | :--- | :--- |
| Frontend (Angular) | http://localhost:4200 | L'interfaccia utente completa di StreetCats. |
| Backend (FastAPI) | http://localhost:8000 | L'indirizzo base del server API. |
| Documentazione API | http://localhost:8000/docs | Interfaccia Swagger UI interattiva per testare le API. |

---
## 🧪 Testing
I test end-to-end della piattaforma sono stati sviluppati utilizzando **Playwright** . Per eseguirli localmente, assicurati che l'applicazione sia avviata in Docker e, all'interno della cartella **frontend**, lancia:
```Bash
npm run test
```
--- -->

# StreetCats - Tech Web Project 2024/2025
StreetCats is a web platform for sharing and tracking stray cat sightings, developed as part of the Web Technologies course at the University of Naples Federico II.

The platform includes:
- **Backend:** a REST API built with **Python**, **FastAPI**, and **PostgreSQL**.
- **Frontend:** a Single Page Application built with **Angular v19** and served through **Nginx**.
The entire application is containerized with **Docker** and orchestrated using **Docker Compose**, making it easy to run regardless of the host machine configuration.
---
## 📂 Project Structure
```text
streetcats/
├── backend/           # FastAPI backend source code and Dockerfile
├── frontend/          # Angular frontend source code and Dockerfile
└── docker-compose.yml # Docker Compose configuration for backend, frontend, and database
```

## 🚀 Running the Application
Before getting started, make sure you have 
[Docker Desktop](https://www.docker.com/products/docker-desktop/).
 installed on your machine.
1. Move to the project directory. Open a terminal and navigate to the root folder of the project:
```bash
cd path/to/StreetCats
```
2. Build and start the containers. Run the following command:
```bash
docker compose up --build
```

## 🌐 Available Services
Once the containers are up and running, the application will be available at the following addresses:

| Service | URL | Description |
| :--- | :--- | :--- |
| Frontend (Angular) | http://localhost:4200 | Main user interface of StreetCats. |
| Backend (FastAPI) | http://localhost:8000 | Base URL of the REST API. |
| Documentazione API | http://localhost:8000/docs | Swagger UI for exploring and testing the API. |



## 🧪 Testing
End-to-end tests for the platform were developed using Playwright.
To run them locally make sure the application is already running with Docker.
Open a terminal inside the frontend folder and run:
```bash
npm run test
```