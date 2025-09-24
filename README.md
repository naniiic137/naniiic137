# 🚀 Windows apps, pragmatic web dev, and clean, reliable tooling
I design and build small, fast, and reliable software — from Windows utilities to web backends.
<!-- Optional alt: "Maker of reliable Windows utilities and full‑stack web apps with a focus on DX and performance." -->

## 💫 About Me
🔭 Currently building Windows utilities and internal tools<br>👯 Open to collaborating on impactful, well‑scoped projects<br>🌱 Growing in backend/API design and systems thinking<br>⚡ Fun fact: I studied Pascal for 5 years

## 🌐 Socials
<!-- Replace the placeholders below with your actual links -->
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/REPLACE_WITH_LINKEDIN_USERNAME/) <!-- e.g., https://www.linkedin.com/in/hamzabenismail1/ -->
[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?logo=twitter&logoColor=white)](https://twitter.com/REPLACE_WITH_TWITTER_HANDLE)
[![Portfolio](https://img.shields.io/badge/Portfolio-%23000000.svg?logo=vercel&logoColor=white)](https://REPLACE_WITH_PORTFOLIO_URL)
[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:REPLACE_WITH_EMAIL)

## 💻 Tech Stack
<!-- Keep only what you actually use. Replace or remove freely. -->
<!-- Languages -->
![C](https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white) ![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
<!-- Backend & Runtimes -->
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) ![Keycloak](https://img.shields.io/badge/Keycloak-311C87?style=for-the-badge&logo=keycloak&logoColor=white)
<!-- Frontend -->
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
<!-- Databases -->
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
<!-- Build & Tools -->
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
<!-- OS & Distribution -->
![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
<!-- Add or remove badges to match your real stack. You can find more at https://shields.io/ and https://simpleicons.org/ -->

## 🧭 Project Spotlight — LogiServ (Private Final‑Year Project)
Web application for managing building maintenance and vehicle fleet operations at STEG. Focused on optimizing human and material resources with an ergonomic interface.

### Objectives
- Buildings: preventive/curative maintenance, progress tracking, teams, and stock management
- Vehicle Fleet: fleet tracking, maintenance planning, mileage tracking, assignments
- Users & Profiles: account management, roles/permissions, centralized auth via Keycloak + LDAP

### Core Features
- Intervention requests: creation, technician assignment, progress tracking, validation
- Materials: stock levels, per‑intervention consumption
- Reporting: intervention status, resolution time, cost tracking
- Vehicles: technical sheets, mileage, maintenance schedules, fuel consumption
- Security: LDAP/Keycloak login, password reset, activity tracking and notifications

### Architecture (Containers)
```
/docker
├── nginx/                  # Reverse proxy & load balancer
├── app/
│   ├── frontend/           # React + TypeScript (MUI, Redux)
│   └── backend/            # Spring Boot REST API
├── db/
│   ├── postgres/           # Primary database
│   └── redis/              # Cache & session store
├── notifications/          # Email/Push service (Firebase)
├── keycloak/               # Authentication & IAM
├── docker-compose.yml
└── docker-compose.prod.yml
```

### Tech Highlights
- Frontend: React.js + TypeScript, Material‑UI, Redux
- Backend: Spring Boot (REST), PostgreSQL, Redis
- Platform: Docker, NGINX, Ubuntu LTS
- Identity: Keycloak with LDAP integration
- Notifications: email alerts (new requests, assignments, reminders)

## 🔥 Highlights
- ✨ Featured project: [REPLACE_WITH_PROJECT_NAME](https://github.com/REPLACE_WITH_USERNAME/REPLACE_WITH_REPO)
- 🧰 Favorite tool: REPLACE_WITH_TOOL
- 🏆 Notable achievement: REPLACE_WITH_AWARD_OR_FACT
<!-- Swap the placeholders above with your real links and facts. Remove any line you don't need. -->

## 📈 GitHub Stats
<!-- If your username differs, replace naniiic137 below. -->
![GitHub Streak](https://streak-stats.demolab.com?user=naniiic137&theme=transparent&hide_border=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=naniiic137&langs_count=8&layout=compact&theme=transparent&hide_border=true)
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=naniiic137&show_icons=true&theme=transparent&hide_border=true)

---
[![](https://visitcount.itsvg.in/api?id=naniiic137&icon=0&color=7)](https://visitcount.itsvg.in)
<!-- Replace id with your username if needed. Example: id=naniiic137 -->

## 💰 Support My Work
[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/REPLACE_WITH_USERNAME)
<!-- Example: https://www.buymeacoffee.com/naniii -->

<!-- Optional: Showcase screenshots or GIFs of your apps -->
<!-- 
### 📸 Screenshots
![App Screenshot](REPLACE_WITH_IMAGE_URL)
-->

<!-- Optional: Add a short roadmap or what you're learning next -->
<!-- 
### 🗺️ Roadmap
- Shipping v2 of my Windows utility
- Exploring Electron + Rust
-->

<!-- If this is your profile README, pin your top repos on your profile for visibility. If this is a project README, add Installation/Usage sections instead. -->

<!-- Proudly created with GPRM ( https://gprm.itsvg.in ) -->
