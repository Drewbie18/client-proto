/**
 * Created by Drew on 2016-11-17.
 *
 * AUTH SERVER
 *
 * This will be part of the auth server. Function of this file will include
 * 1. Generate Auth token on successful login
 * 2. Generate refresh token for client
 * 3. Validate refresh token and if verified generate a new auth token
 *
 */


const jwt  = require('jsonwebtoken');


