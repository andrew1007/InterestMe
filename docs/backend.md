# Backend

InterestMe runs on the Rails framework and is hosted on Heroku. Rails is used strictly as a RESTful API, returning JSON data and interpreted by React.js in the frontend.

## Database

PostgresSQL RDBMS is used, in compliance with Heroku's database standards.

## Dependencies

Other noteable dependencies include:

- Cloudinary image hosting for storing and returning user content
- BCrypt for password-salting and secure user authentication
