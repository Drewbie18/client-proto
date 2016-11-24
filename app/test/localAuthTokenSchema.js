/**
 * Created by Drew on 2016-11-23.
 */
var mongoose = require('mongoose');

var localAuthTokenSchema = new mongoose.Schema({

    issueDate: {
        type: Date,
        default: Date.now()
    },
    expiryDate: {
        type: Date
    },
    issuer: {
        type: String,
        default: ''
    },
    siteUrl: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: 'PENDING_ACTIVATION',
        enum: [

            'PENDING_ACTIVATION',
            'ACTIVE',
            'REVOKED',
            'EXPIRED'
        ]
    }
});

module.exports = mongoose.model('LocalAuthToken', localAuthTokenSchema);
