Basic express jwt authentication

Simple express API with JSON Web Token authentication

Database engine to store users - Mongodb

Place ".env" to root dir with connection string to authenticate by username&password:

Example:

    MONGO_URI="mongodb://usr3:123456@localhost:27017/basicauth?authMechanism=DEFAULT&authSource=basicauth"

Routes:

    /                   - GET   homepage without authorization
    /api/register       - POST  { "username":"username", "password":"password" } to create user
    /api/login          - POST  { "username":"username", "password":"password" } to login and recieve token
    /api/token          - POST  { "refresh_token":"..." } to get new authorization token

    Authorized area (make request with header Authorization: Bearer %token_recieved_when_login% )
    /api/user/          - GET   home page for authenticated users
    /api/user/profile   - GET   get current user profile
    /api/user/profile   - POST  { "firstName":"...", "lastName":"...", "phoneNumber":"..." } to create/update profile
    