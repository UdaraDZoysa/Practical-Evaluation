# URL Shortener — Practical Evaluation

Full‑stack exercise that creates short links, stores them in PostgreSQL, counts
clicks and redirects.

| Layer | Stack |
|-------|-------|
| Back‑end | Spring Boot 3 · JPA / Hibernate · PostgreSQL |
| Front‑end | React 18 (Vite) · Tailwind 3 · Zustand |
| Build | Maven Wrapper · npm |

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| **Java JDK** | 17 or later | Adopt/OpenJDK, Corretto, Temurin… |
| **Node.js** | 18 or 20 | ships with **npm** |
| **PostgreSQL** | 14 – 17 | defaults to `postgres://localhost:5432/url` |

Edit `back‑end/src/main/resources/application.properties` if your database is
elsewhere.

---

## Quick start

```bash
# 1 clone
git clone https://github.com/UdaraDZoysa/Practical-Evaluation.git
cd Practical-Evaluation

# 2 back‑end  (macOS / Linux / WSL)
cd back-end
./mvnw spring-boot:run          # → http://localhost:8080

#    back‑end  (Windows PowerShell / CMD)
cd back-end
mvnw spring-boot:run

# 3 front‑end  (new terminal)
cd url-shortener-frontend
npm install                     # installs React, Vite, Tailwind …
npm run dev                     # → http://localhost:5173

The dashboard loads any URLs already in the database; New URL opens a
modal to create more.

## REST API cheatsheet (:8080)

Method	Path	Body / Param	Response 200
POST	/api/urls	{ "originalUrl": "...", "alias":?, "expiresInDays":? }	{ "shortCode": "abc123" }
GET	/api/urls	–	list of stored links
DELETE	/api/urls/{id}	–	–
GET	/{shortCode}	–	302 redirect, click counter ++

A Swagger UI is available at /swagger-ui/index.html when the server is
running.

## Troubleshooting

Port already in use
Back‑end: change server.port in application.properties.
Front‑end: change vite.config.js.

Database login fails — adjust spring.datasource.* (URL, user, password).

Tailwind classes don’t compile — run npm install again; you should see
tailwindcss@^3.x.

## License

MIT — do whatever you like with it.
