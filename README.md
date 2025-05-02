Sure! Below is your finalized **README.md** content. It’s formatted with GitHub-compatible markdown and ready to **copy-paste** directly into your project root:

---

````markdown
# URL Shortener — Practical Evaluation

Full‑stack demo that creates short links, stores them in PostgreSQL, counts clicks and redirects.

| Layer      | Stack                                          |
|------------|------------------------------------------------|
| Back‑end   | Spring Boot 3 · JPA / Hibernate · PostgreSQL   |
| Front‑end  | React 18 (Vite) · Tailwind 3 · Zustand         |
| Build      | Maven Wrapper · npm                            |

---

## Prerequisites

| Tool         | Version    | Notes                                                        |
|--------------|------------|--------------------------------------------------------------|
| **Java JDK** | 17 or later| Temurin, Corretto, OpenJDK …                                 |
| **Node.js**  | 18 or 20   | Ships with **npm**                                           |
| **PostgreSQL** | 14–17    | Defaults to `postgres://localhost:5432/url`                 |

> If your database is elsewhere, edit `back-end/src/main/resources/application.properties`.

---

## Quick start (dev mode)

```bash
# 1. Clone the repo
git clone https://github.com/UdaraDZoysa/Practical-Evaluation.git
cd Practical-Evaluation

# 2. Start the back-end (macOS / Linux / WSL)
cd back-end
./mvnw spring-boot:run          # → http://localhost:8080

#    Start the back-end (Windows CMD / PowerShell)
cd back-end
mvnw spring-boot:run

# 3. Start the front-end (new terminal)
cd url-shortener-frontend
npm install
npm run dev                     # → http://localhost:5173
````

The dashboard shows any existing links from the database.
Click **New URL** to add more.

---

\## Docker usage (optional)

Dockerized setup for deployment or containerized local dev:

* `back-end/Dockerfile` – builds Spring Boot jar (exposes port 8080)
* `url-shortener-frontend/Dockerfile` – builds static React site (served via Nginx on port 80)
* `docker-compose.yaml` – runs PostgreSQL + both services

### Build & run the whole stack

```bash
docker compose up --build -d
# → http://localhost (frontend)
# → http://localhost:8080/swagger-ui/index.html (backend Swagger)
```

Stop the containers:

```bash
docker compose down
```

---

\## REST API cheat sheet (port 8080)

| Method | Path             | Body / Param                                             | 200 Response                |
| ------ | ---------------- | -------------------------------------------------------- | --------------------------- |
| POST   | `/api/urls`      | `{ "originalUrl": "...", "alias":?, "expiresInDays":? }` | `{ "shortCode": "abc123" }` |
| GET    | `/api/urls`      | –                                                        | List of stored links        |
| DELETE | `/api/urls/{id}` | –                                                        | –                           |
| GET    | `/{shortCode}`   | –                                                        | **302 redirect**, click ++  |

Swagger UI available at:
**`/swagger-ui/index.html`**

---

\## Troubleshooting

| Issue                        | Solution                                                              |
| ---------------------------- | --------------------------------------------------------------------- |
| Port already in use          | Change `server.port` or `vite.config.js`.                             |
| Database login fails         | Update `spring.datasource.*` in the backend `application.properties`. |
| Tailwind classes not showing | Run `npm install` again; ensure you see `tailwindcss@^3.x`.           |

---

\## License

MIT — free for personal, academic, or commercial use.

