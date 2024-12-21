# Backend API Documentation

## Endpoints

### POST /users/register

#### Description

This endpoint is used to register a new user.

#### Request

- **URL**: `/users/register`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "password": "string"
  }
  ```

### Example Response

- `user` (object). 
    - `fullname` (object). 
        - `firstname` (string) : Users first name minimum 3 characters. 
        - `lastname` (string) : Users last name minimum 3 characters. 
    - `email` (string): Users email minimum 5 characters. 
    - `passeord` (string):Users password minimum 6 characters. 
    - `token` (string)

### POST /users/login

#### Description

This endpoint is used to log in an existing user.

#### Request

- **URL**: `/users/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Example Response

- `user` (object):
    - `fullname` (object):
        - `firstname` (string): User's first name minimum 3 character.
        - `lastname` (string): User's last name minimum 3 character.
    - `email` (string): User's email must be valid.
    - `password` (string): User's password minimum 6 character.
- `token` (string): Authentication token.

### GET /users/profile

#### Description

This endpoint is used to get the profile of the authenticated user.

#### Request

- **URL**: `/users/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <token>`

### Example Response

- `user` (object):
    - `fullname` (object):
        - `firstname` (string): User's first name.
        - `lastname` (string): User's last name.
    - `email` (string): User's email.

### GET /users/logout

#### Description

Logout the current user and blacklist the token provided in cookies or headers.

#### Request

- **URL**: `/users/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <token>`

### Example Response

- `message` (string): "Logout successfully"

### POST /captains/register

#### Description

This endpoint is used to register a new captain.

#### Request

- **URL**: `/captains/register`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "password": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
  ```

#### Example Response

- `captain` (object):
    - `fullname` (object):
        - `firstname` (string): Captain's first name.
        - `lastname` (string): Captain's last name.
    - `email` (string): Captain's email.
    - `vehicle` (object):
        - `color` (string): Vehicle color.
        - `plate` (string): Vehicle plate number.
        - `capacity` (number): Vehicle capacity.
        - `vehicleType` (string): Type of vehicle.
    - `token` (string): Authentication token.

### POST /captains/login

#### Description

This endpoint is used to log in an existing captain.

#### Request

- **URL**: `/captains/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Example Response

- `captain` (object):
    - `fullname` (object):
        - `firstname` (string): Captain's first name.
        - `lastname` (string): Captain's last name.
    - `email` (string): Captain's email.
    - `token` (string): Authentication token.

### GET /captains/profile

#### Description

This endpoint is used to get the profile of the authenticated captain.

#### Request

- **URL**: `/captains/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <token>`

#### Example Response

- `captain` (object):
    - `fullname` (object):
        - `firstname` (string): Captain's first name.
        - `lastname` (string): Captain's last name.
    - `email` (string): Captain's email.
    - `vehicle` (object):
        - `color` (string): Vehicle color.
        - `plate` (string): Vehicle plate number.
        - `capacity` (number): Vehicle capacity.
        - `vehicleType` (string): Type of vehicle.

### GET /captains/logout

#### Description

Logout the current captain and blacklist the token provided in cookies or headers.

#### Request

- **URL**: `/captains/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <token>`

#### Example Response

- `message` (string): "Logout successfully"