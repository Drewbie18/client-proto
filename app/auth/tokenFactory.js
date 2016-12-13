/**
 * Created by Drew on 2016-11-17.
 *
 * AUTH SERVER
 *
 * This will be part of the auth server. Function of this file will include
 * 1. Generate Auth token on successful login
 * 2. Generate refresh token for client
 * 3. Validate refresh token and if verified generate a new auth token
 *TODO - how to share key between auth server and api server
 *
 *
 *
 */
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/common/authRefreshToken');
const async = require('async');
const CryptoJS = require('crypto-js');


//create an object and attach methods on it.
var factory = {};

//this will return a basic auth token
factory.generateToken = function (userId, key) {

    key = 'secret-key';

    //create JWT data, IAT is appended automatically. JWT needs JSON.
    var data = {
        userId: userId
    };

    var token = jwt.sign(data, key, {expiresIn: '6h'});
    console.log(token);
    //return the token to send to the client.
    return token
};

//this will verify a token
//TODO how to handle success and failures of this method to suit all cases.
factory.verifyToken = function (token, key) {

    key = 'secret-key';

    //if there is an error i.e the token is invalid it will be caught.
    try {
        var decoded = jwt.verify(token, key);
        console.log('This is the decoded token we got back', decoded);

        return {status: true, info: decoded};

        //TODO handle different cases of decode errors.
    } catch (decodeError) {
        console.log('There was an error decoding the token', decodeError);

        return {status: false, info: decodeError};

    }

};


//Method to create a refresh token for Users on login.
factory.generateRefreshToken = function (userId, key, sendResult) {


    //generate and encrypt refreshToken via async waterFall
    return async.waterfall([
        function (callback) {

            //setting expiry date to 10 days in the future (ms*s*mins*hrs*d)
            var expiryDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 10));

            var tokenBody = {
                userId: userId,
                expiryDate: expiryDate.toJSON(),
                issuer: 'MVP',
                siteUrl: 'localhost:5050',
                state: 'ACTIVE'
            };

            //return the creation object.
            RefreshToken.create(tokenBody, function (err, refreshToken) {
                if (err) {
                    console.error('ERROR GENERATING REFRESH TOKEN', err);
                    callback(null, null);
                }
                else {
                    console.log('CREATED REFRESH TOKEN ID', refreshToken._id);
                    callback(null, refreshToken._id.toString());
                }
            });
        },
        function (arg1, callback) {

            var cipherObj = CryptoJS.AES.encrypt(arg1, key);
            console.log(cipherObj);
            var cipherString = cipherObj.toString();
            console.log('The encrypted refreshToken: ', cipherString);
            callback(null, cipherString);

        }
    ], function (err, results) {
        console.log('This is the results object:', results);

        var successResponse = {
            message: 'Login Succeeded',
            refreshToken: results
        };

        sendResult(successResponse);


    })

};

//TODO FIX DATE COMPARISION
//Method to verify encrypted refresh token from client side.
factory.verifyRefreshToken = function (refreshToken, key, response) {


    return async.waterfall([
        //decrpyt the token
        function (callback) {

            var decrypt = CryptoJS.AES.decrypt(refreshToken, key);
            var refreshId = decrypt.toString(CryptoJS.enc.Utf8);

            console.log('verifyRefreshToken - refreshId', refreshId);

            callback(null, refreshId);

        },
        //find the refresh token in DB
        function (arg1, callback) {
            RefreshToken.find({_id: arg1}, function (err, refreshToken) {
                if (err) {
                    callback(null, err);
                } else {
                    console.log('verifyRefreshToken - refreshToken', refreshToken);
                    callback(null, refreshToken[0]);
                }

            });

        },
        //verify that token is active and not expired
        function (arg1, callback) {

            var currentDate = new Date();
            var expiryDate = new Date(arg1.expiryDate);

            if (arg1.state !== 'ACTIVE') {
                console.log('The refresh token is not active');
                callback(null, false);
            } else if (expiryDate.getTime() < currentDate.getTime()) {
                console.log('the token is expired');
                callback(null, false);
            } else {

                console.log('the token is ACTIVE and not expired');
                callback(null, true);
            }
        }
    ], function (err, result) {

        response(result);

    });


};


module.exports = factory;