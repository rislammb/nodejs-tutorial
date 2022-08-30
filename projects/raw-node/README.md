# Uptime Monitoring API

## Requirments

- User can register themselves
- User can login with token based authentication
- User can logout
- User can edit and delete own account
- Admin can set the maximum link limit during development
- User can set links and up/down status code
- User can edit/delete links
- Check links periodically and send message to user about up/down

## Requirments Analysis

### Endpoints/Route

- POST /user [public]
- GET /user?phone [private]
- PUT /user [private]
- DELETE /user?phone [private]

- POST /token [public]
- GET /token?id [public]
- PUT /token [public]
- DELETE /token?id [public]

- POST /check [private]
- GET /check?id [private]
- PUT /check [private]
- DELETE /check?id [private]

## TODO

- [x] Authentication
  - [x] Registration
  - [x] Login
  - [x] Logout
  - [x] Edit
  - [x] Delete
- [ ] Links
  - [x] Add link for check
  - [x] Set maximum link limit
  - [ ] Set link with up/down status code
  - [x] Edit/delete link
  - [ ] Check links periodically
  - [ ] Sent message to user about up/down

## Pseudo code
