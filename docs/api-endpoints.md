# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Pins

- `POST /api/pins` :new
- `GET /api/pins/:id` :show
- `PATCH /api/pins/:id` :edit
- `DELETE /api/pins/:id` :delete

### Boards

- `POST /api/boards` :new
- `GET /api/boards/:id` :show
- `PATCH /api/boards/:id` :edit
- `DELETE /api/boards/:id` :delete

### Tags

- `GET /api/tags` :pull data for pin tagging
- `POST /api/pins/:pin_id/tags` :save tags
- `DELETE /api/pins/:pin_id/tags/:tag_id` :remove tags
