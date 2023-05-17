Basic express jwt authentication

Simple express API with JSON Web Token authentication

Database engine to store users - Mongodb

Place ".env" to root dir with connection string to authenticate by username&password:

Example:
MONGO_URI="mongodb://usr3:123456@localhost:27017/basicauth?authMechanism=DEFAULT&authSource=basicauth"

Routes:

/               - GET   homepage without authorization
/api/register   - POST  { "username":"username", "password":"password" } to create user
/api/login      - POST  { "username":"username", "password":"password" } to login and recieve token
/api/user/      - GET   with Bearer token recieved when login, page for authenticated users.