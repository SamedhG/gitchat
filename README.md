## GitChat
### Voice Chat for GitHub repos
Quick chat is a webapp to create voice chat rooms for GitHub repos.

### Tech Stack
#### Backend
 - Elixir/Phoenix
 - PostgreSQL

#### Frontend
- React
- Redux
- React Router
- Bootstrap

### Development Setup

#### Backend
 - Edit `server/config/dev.exs` with database settings

```bash
cd server
mix deps.get
mix ecto.reset # setup the database
mix phx.server
```

#### FrontEnd

```bash
cd web_ui
npm install
npm start
```
