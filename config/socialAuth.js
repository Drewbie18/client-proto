/**
 * THIS FILE MUST BE KEPT SECRET
 *
 * This file will contain all the configuration information for each of the social platforms
 * that are being used for registration/login.
 *
 */

module.exports = {

    'facebookAuth': {
        'clientID': '1321078801257340', //app id
        'clientSecret': 'e9ef9d2630a73eeb790adf361f467c93', //app secret
        'callBackUrl': 'http://localhost:5050/v1/auth/facebook/callback'
    },
    'googleAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': 'http://localhost:5050/v1/auth/google/callback'
    }

};