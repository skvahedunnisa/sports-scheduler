# Sports Scheduler

Sports Scheduler is a web application that allows players to create and join sports sessions, while administrators can manage sports and view reports.

## Features

### Player
- Register and login
- Create sports sessions
- Select a sport
- Add existing players to teams
- Specify additional players needed
- Set date, time and venue
- View available sessions
- Join sessions
- View sessions created by me
- View sessions I joined
- Cancel sessions with a reason
- View cancellation information

### Admin
- Admin login
- Create sports
- Edit sports
- Create and join sessions
- View sessions
- View played-session reports
- View sport popularity reports

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JWT Authentication
- bcryptjs
- Render

## Project Structure

```text
sports-scheduler/
├── config/
├── controllers/
├── middleware/
├── migrations/
├── models/
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── create-session.html
│   ├── sessions.html
│   ├── my-sessions.html
│   ├── admin.html
│   └── style.css
├── routes/
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md