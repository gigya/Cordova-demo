(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gigyaClient = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var index_1 = require("../gigya-js-sdk-client-base/index");
var Request = (function () {
    /**
     * @class
     * @classdesc Gigya Request
     * @param {string}  APIMethod  The Gigya API method to call, including namespace. For example: "socialize.getUserInfo". Please refer to our <a target="_blank" href="http://developers.gigya.com/display/GD/REST+API" >REST API reference</a> for the list of available methods.
     * @memberof gigyaClient
     */
    function Request(APIMethod) {
        /**
         * An object that contains the parameters for the Gigya API method to call. Please refer to our <a target="_blank" href="http://developers.gigya.com/display/GD/REST+API" >REST API reference</a> and find in the specific method reference the list of method parameters.
         *
         * @type {object}
         * @default {}
         */
        this.params = {};
        /**
         * This parameter determines whether the request to Gigya will be sent over HTTP or HTTPS. default is HTTPS (true).
         *
         * @type {boolean}
         * @default true
         */
        this.useHTTPS = true;
        this.APIMethod = APIMethod;
    }
    /**
     * Sends a request to Gigya server. This method is used for invoking any of the methods supported by Gigya's <a target="_blank" href="http://developers.gigya.com/display/GD/REST+API">REST API</a>.
     *
     * @returns {Promise}
     * @memberof gigyaClient.Request
     */
    Request.prototype.send = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            index_1.Utils.prepareParamsString(_this.params)
                .then(function (paramsStr) {
                cordova.exec(function (result) {
                    index_1.Utils.handleJsonResponse(result).then(resolve, reject);
                }, function (error) {
                    index_1.Utils.handleJsonResponse(error).then(reject, reject);
                }, 'GigyaConnectPlugin', 'sendRequest', [_this.APIMethod, paramsStr, String(_this.useHTTPS)]);
            }, reject);
        });
    };
    return Request;
})();
exports.Request = Request;
},{"../gigya-js-sdk-client-base/index":8}],2:[function(require,module,exports){
/**
 * @class
 * @classdesc Gigya event types
 * @memberof gigyaClient
 */
var Event = (function () {
    function Event() {
    }
    /**
     * Login
     *
     * @type {string}
     * @readonly
     */
    Event.LOGIN = 'login';
    /**
     * Logout
     *
     * @type {string}
     * @readonly
     */
    Event.LOGOUT = 'logout';
    return Event;
})();
exports.Event = Event;
},{}],3:[function(require,module,exports){
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.eventDispatcher = document.createElement('div');
    }
    EventDispatcher.prototype.addEventListener = function (eventName, eventHandler) {
        this.eventDispatcher.addEventListener(eventName, eventHandler, false);
    };
    EventDispatcher.prototype.removeEventListener = function (eventName, eventHandler) {
        this.eventDispatcher.removeEventListener(eventName, eventHandler, false);
    };
    EventDispatcher.prototype.dispatchEvent = function (event) {
        return this.eventDispatcher.dispatchEvent(event);
    };
    return EventDispatcher;
})();
exports.EventDispatcher = EventDispatcher;
},{}],4:[function(require,module,exports){
/**
 * @class ErrorCodes
 * @classdesc Gigya error-codes
 * @memberof gigyaClient
 */
(function (ErrorCodes) {
    /**
     * @name OK
     * @type {number}
     * @default 0
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["OK"] = 0] = "OK";
    /**
     * @name EXPIRED_REQUEST
     * @type {number}
     * @default 403002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["EXPIRED_REQUEST"] = 403002] = "EXPIRED_REQUEST";
    /**
     * @name NETWORK_ERROR
     * @type {number}
     * @default 500026
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NETWORK_ERROR"] = 500026] = "NETWORK_ERROR";
    /**
     * @name DATA_PENDING
     * @type {number}
     * @default 100001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["DATA_PENDING"] = 100001] = "DATA_PENDING";
    /**
     * @name OPERATION_CANCELED
     * @type {number}
     * @default 200001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["OPERATION_CANCELED"] = 200001] = "OPERATION_CANCELED";
    /**
     * @name PERMISSION_GRANTED
     * @type {number}
     * @default 200002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PERMISSION_GRANTED"] = 200002] = "PERMISSION_GRANTED";
    /**
     * @name PERMISSION_NOT_GRANTED
     * @type {number}
     * @default 200003
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PERMISSION_NOT_GRANTED"] = 200003] = "PERMISSION_NOT_GRANTED";
    /**
     * @name REDIRECT
     * @type {number}
     * @default 200004
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["REDIRECT"] = 200004] = "REDIRECT";
    /**
     * @name NEW_USER
     * @type {number}
     * @default 200005
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NEW_USER"] = 200005] = "NEW_USER";
    /**
     * @name OPERATION_DONE
     * @type {number}
     * @default 200006
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["OPERATION_DONE"] = 200006] = "OPERATION_DONE";
    /**
     * @name UPDATE_USER
     * @type {number}
     * @default 200007
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UPDATE_USER"] = 200007] = "UPDATE_USER";
    /**
     * @name OK_WITH_ERRORS
     * @type {number}
     * @default 200008
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["OK_WITH_ERRORS"] = 200008] = "OK_WITH_ERRORS";
    /**
     * @name ACCOUNTS_LINKED
     * @type {number}
     * @default 200009
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNTS_LINKED"] = 200009] = "ACCOUNTS_LINKED";
    /**
     * @name OK_WITH_ERROR_LOGIN_IDENTIFIER_EXISTS
     * @type {number}
     * @default 200010
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["OK_WITH_ERROR_LOGIN_IDENTIFIER_EXISTS"] = 200010] = "OK_WITH_ERROR_LOGIN_IDENTIFIER_EXISTS";
    /**
     * @name ACCOUNT_PENDING_REGISTRATION
     * @type {number}
     * @default 206001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNT_PENDING_REGISTRATION"] = 206001] = "ACCOUNT_PENDING_REGISTRATION";
    /**
     * @name ACCOUNT_PENDING_VERIFICATION
     * @type {number}
     * @default 206002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNT_PENDING_VERIFICATION"] = 206002] = "ACCOUNT_PENDING_VERIFICATION";
    /**
     * @name ACCOUNT_MISSING_LOGINID
     * @type {number}
     * @default 206003
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNT_MISSING_LOGINID"] = 206003] = "ACCOUNT_MISSING_LOGINID";
    /**
     * @name IDENTITY_ALREADY_ASSIGNED
     * @type {number}
     * @default 206004
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["IDENTITY_ALREADY_ASSIGNED"] = 206004] = "IDENTITY_ALREADY_ASSIGNED";
    /**
     * @name AFTER_EMAIL_VERIFICATION
     * @type {number}
     * @default 206005
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["AFTER_EMAIL_VERIFICATION"] = 206005] = "AFTER_EMAIL_VERIFICATION";
    /**
     * @name CLIENT_LOG
     * @type {number}
     * @default 300001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["CLIENT_LOG"] = 300001] = "CLIENT_LOG";
    /**
     * @name INVALID_DATA_CENTER
     * @type {number}
     * @default 301001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_DATA_CENTER"] = 301001] = "INVALID_DATA_CENTER";
    /**
     * @name INVALID_REQUEST_FORMAT
     * @type {number}
     * @default 400001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_REQUEST_FORMAT"] = 400001] = "INVALID_REQUEST_FORMAT";
    /**
     * @name MISSING_REQUIRED_PARAMETER
     * @type {number}
     * @default 400002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["MISSING_REQUIRED_PARAMETER"] = 400002] = "MISSING_REQUIRED_PARAMETER";
    /**
     * @name UNIQUE_IDENTIFIER_EXISTS
     * @type {number}
     * @default 400003
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNIQUE_IDENTIFIER_EXISTS"] = 400003] = "UNIQUE_IDENTIFIER_EXISTS";
    /**
     * @name INVALID_PARAMETER_FORMAT
     * @type {number}
     * @default 400004
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_PARAMETER_FORMAT"] = 400004] = "INVALID_PARAMETER_FORMAT";
    /**
     * @name INVALID_PARAMETER_VALUE
     * @type {number}
     * @default 400006
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_PARAMETER_VALUE"] = 400006] = "INVALID_PARAMETER_VALUE";
    /**
     * @name DUPLICATE_VALUE
     * @type {number}
     * @default 400007
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["DUPLICATE_VALUE"] = 400007] = "DUPLICATE_VALUE";
    /**
     * @name INVALID_AUTHENTICATION_HEADER
     * @type {number}
     * @default 400008
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_AUTHENTICATION_HEADER"] = 400008] = "INVALID_AUTHENTICATION_HEADER";
    /**
     * @name VALIDATION_ERROR
     * @type {number}
     * @default 400009
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["VALIDATION_ERROR"] = 400009] = "VALIDATION_ERROR";
    /**
     * @name INVALID_REDIRECT_URI
     * @type {number}
     * @default 400011
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_REDIRECT_URI"] = 400011] = "INVALID_REDIRECT_URI";
    /**
     * @name INVALID_RESPONSE_TYPE
     * @type {number}
     * @default 400012
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_RESPONSE_TYPE"] = 400012] = "INVALID_RESPONSE_TYPE";
    /**
     * @name UNSUPPORTED_GRANT_TYPE
     * @type {number}
     * @default 400013
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNSUPPORTED_GRANT_TYPE"] = 400013] = "UNSUPPORTED_GRANT_TYPE";
    /**
     * @name INVALID_GRANT
     * @type {number}
     * @default 400014
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_GRANT"] = 400014] = "INVALID_GRANT";
    /**
     * @name CODE_EXPIRED
     * @type {number}
     * @default 400015
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["CODE_EXPIRED"] = 400015] = "CODE_EXPIRED";
    /**
     * @name SCHEMA_VALIDATION_FAILED
     * @type {number}
     * @default 400020
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SCHEMA_VALIDATION_FAILED"] = 400020] = "SCHEMA_VALIDATION_FAILED";
    /**
     * @name CAPTCHA_VERIFICATION_FAILED
     * @type {number}
     * @default 400021
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["CAPTCHA_VERIFICATION_FAILED"] = 400021] = "CAPTCHA_VERIFICATION_FAILED";
    /**
     * @name UNIQUE_INDEX_VALIDATION_ERROR
     * @type {number}
     * @default 400022
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNIQUE_INDEX_VALIDATION_ERROR"] = 400022] = "UNIQUE_INDEX_VALIDATION_ERROR";
    /**
     * @name INVALID_TYPE_VALIDATION_ERROR
     * @type {number}
     * @default 400023
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_TYPE_VALIDATION_ERROR"] = 400023] = "INVALID_TYPE_VALIDATION_ERROR";
    /**
     * @name DYNAMIC_FIELDS_VALIDATION_ERROR
     * @type {number}
     * @default 400024
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["DYNAMIC_FIELDS_VALIDATION_ERROR"] = 400024] = "DYNAMIC_FIELDS_VALIDATION_ERROR";
    /**
     * @name WRITE_ACCESS_VALIDATION_ERROR
     * @type {number}
     * @default 400025
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["WRITE_ACCESS_VALIDATION_ERROR"] = 400025] = "WRITE_ACCESS_VALIDATION_ERROR";
    /**
     * @name INVALID_FORMAT_VALIDATION_ERROR
     * @type {number}
     * @default 400026
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_FORMAT_VALIDATION_ERROR"] = 400026] = "INVALID_FORMAT_VALIDATION_ERROR";
    /**
     * @name REQUIRED_VALUE_VALIDATION_ERROR
     * @type {number}
     * @default 400027
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["REQUIRED_VALUE_VALIDATION_ERROR"] = 400027] = "REQUIRED_VALUE_VALIDATION_ERROR";
    /**
     * @name EMAIL_NOT_VERIFIED
     * @type {number}
     * @default 400028
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["EMAIL_NOT_VERIFIED"] = 400028] = "EMAIL_NOT_VERIFIED";
    /**
     * @name SCHEMA_CONFLICT_ERROR
     * @type {number}
     * @default 400029
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SCHEMA_CONFLICT_ERROR"] = 400029] = "SCHEMA_CONFLICT_ERROR";
    /**
     * @name OPERATION_NOT_ALLOWED
     * @type {number}
     * @default 400030
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["OPERATION_NOT_ALLOWED"] = 400030] = "OPERATION_NOT_ALLOWED";
    /**
     * @name SECURITY_VERIFICATION_FAILED
     * @type {number}
     * @default 400050
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SECURITY_VERIFICATION_FAILED"] = 400050] = "SECURITY_VERIFICATION_FAILED";
    /**
     * @name INVALID_APIKEY_PARAMETER
     * @type {number}
     * @default 400093
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_APIKEY_PARAMETER"] = 400093] = "INVALID_APIKEY_PARAMETER";
    /**
     * @name NOT_SUPPORTED
     * @type {number}
     * @default 400096
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NOT_SUPPORTED"] = 400096] = "NOT_SUPPORTED";
    /**
     * @name UNSUPPORTED_USER_AGENT
     * @type {number}
     * @default 400097
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNSUPPORTED_USER_AGENT"] = 400097] = "UNSUPPORTED_USER_AGENT";
    /**
     * @name NO_PROVIDERS
     * @type {number}
     * @default 400100
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NO_PROVIDERS"] = 400100] = "NO_PROVIDERS";
    /**
     * @name POPUP_BLOCKED
     * @type {number}
     * @default 400101
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["POPUP_BLOCKED"] = 400101] = "POPUP_BLOCKED";
    /**
     * @name INVALID_EVENT_HANDLER
     * @type {number}
     * @default 400102
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_EVENT_HANDLER"] = 400102] = "INVALID_EVENT_HANDLER";
    /**
     * @name INVALID_CONTAINERID
     * @type {number}
     * @default 400103
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_CONTAINERID"] = 400103] = "INVALID_CONTAINERID";
    /**
     * @name NOT_CONNECTED
     * @type {number}
     * @default 400106
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NOT_CONNECTED"] = 400106] = "NOT_CONNECTED";
    /**
     * @name INVALID_SITE_DOMAIN
     * @type {number}
     * @default 400120
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_SITE_DOMAIN"] = 400120] = "INVALID_SITE_DOMAIN";
    /**
     * @name PROVIDER_CONFIGURATION_ERROR
     * @type {number}
     * @default 400122
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PROVIDER_CONFIGURATION_ERROR"] = 400122] = "PROVIDER_CONFIGURATION_ERROR";
    /**
     * @name LIMIT_REACHED
     * @type {number}
     * @default 400124
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["LIMIT_REACHED"] = 400124] = "LIMIT_REACHED";
    /**
     * @name FREQUENCY_LIMIT_REACHED
     * @type {number}
     * @default 400125
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["FREQUENCY_LIMIT_REACHED"] = 400125] = "FREQUENCY_LIMIT_REACHED";
    /**
     * @name INVALID_ACTION
     * @type {number}
     * @default 400126
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_ACTION"] = 400126] = "INVALID_ACTION";
    /**
     * @name INSUFFICIENT_POINTS_TO_REDEEM
     * @type {number}
     * @default 400127
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INSUFFICIENT_POINTS_TO_REDEEM"] = 400127] = "INSUFFICIENT_POINTS_TO_REDEEM";
    /**
     * @name SIGNATURE_TIMESTAMP_EXPIRED
     * @type {number}
     * @default 400128
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SIGNATURE_TIMESTAMP_EXPIRED"] = 400128] = "SIGNATURE_TIMESTAMP_EXPIRED";
    /**
     * @name INVALID_POLICY_CONFIGURATION
     * @type {number}
     * @default 401000
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_POLICY_CONFIGURATION"] = 401000] = "INVALID_POLICY_CONFIGURATION";
    /**
     * @name SUSPECTED_SPAM
     * @type {number}
     * @default 401010
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SUSPECTED_SPAM"] = 401010] = "SUSPECTED_SPAM";
    /**
     * @name LOGIN_FAILED_CAPTCHA_REQUIRED
     * @type {number}
     * @default 401020
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["LOGIN_FAILED_CAPTCHA_REQUIRED"] = 401020] = "LOGIN_FAILED_CAPTCHA_REQUIRED";
    /**
     * @name LOGIN_FAILED_WRONG_CAPTCHA
     * @type {number}
     * @default 401021
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["LOGIN_FAILED_WRONG_CAPTCHA"] = 401021] = "LOGIN_FAILED_WRONG_CAPTCHA";
    /**
     * @name OLD_PASSWORD_USED
     * @type {number}
     * @default 401030
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["OLD_PASSWORD_USED"] = 401030] = "OLD_PASSWORD_USED";
    /**
     * @name FORBIDDEN
     * @type {number}
     * @default 403000
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["FORBIDDEN"] = 403000] = "FORBIDDEN";
    /**
     * @name INVALID_SESSION_TOKEN
     * @type {number}
     * @default 403001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_SESSION_TOKEN"] = 403001] = "INVALID_SESSION_TOKEN";
    /**
     * @name REQUEST_HAS_EXPIRED
     * @type {number}
     * @default 403002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["REQUEST_HAS_EXPIRED"] = 403002] = "REQUEST_HAS_EXPIRED";
    /**
     * @name INVALID_REQUEST_SIGNATURE
     * @type {number}
     * @default 403003
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_REQUEST_SIGNATURE"] = 403003] = "INVALID_REQUEST_SIGNATURE";
    /**
     * @name DUPLICATE_NONCE
     * @type {number}
     * @default 403004
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["DUPLICATE_NONCE"] = 403004] = "DUPLICATE_NONCE";
    /**
     * @name UNAUTHORIZED_USER
     * @type {number}
     * @default 403005
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNAUTHORIZED_USER"] = 403005] = "UNAUTHORIZED_USER";
    /**
     * @name SENSITIVE_DATA_SENT_OVER_HTTP
     * @type {number}
     * @default 403006
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SENSITIVE_DATA_SENT_OVER_HTTP"] = 403006] = "SENSITIVE_DATA_SENT_OVER_HTTP";
    /**
     * @name PERMISSION_DENIED
     * @type {number}
     * @default 403007
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PERMISSION_DENIED"] = 403007] = "PERMISSION_DENIED";
    /**
     * @name INVALID_OPENID_URL
     * @type {number}
     * @default 403008
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_OPENID_URL"] = 403008] = "INVALID_OPENID_URL";
    /**
     * @name PROVIDER_SESSION_EXPIRED
     * @type {number}
     * @default 403009
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PROVIDER_SESSION_EXPIRED"] = 403009] = "PROVIDER_SESSION_EXPIRED";
    /**
     * @name INVALID_SECRET
     * @type {number}
     * @default 403010
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_SECRET"] = 403010] = "INVALID_SECRET";
    /**
     * @name SESSION_HAS_EXPIRED
     * @type {number}
     * @default 403011
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SESSION_HAS_EXPIRED"] = 403011] = "SESSION_HAS_EXPIRED";
    /**
     * @name NO_VALID_SESSION
     * @type {number}
     * @default 403012
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NO_VALID_SESSION"] = 403012] = "NO_VALID_SESSION";
    /**
     * @name UNVERIFIED_USER
     * @type {number}
     * @default 403013
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNVERIFIED_USER"] = 403013] = "UNVERIFIED_USER";
    /**
     * @name MISSING_REQUEST_REFERRER
     * @type {number}
     * @default 403015
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["MISSING_REQUEST_REFERRER"] = 403015] = "MISSING_REQUEST_REFERRER";
    /**
     * @name UNEXPECTED_PROVIDER_USER
     * @type {number}
     * @default 403017
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNEXPECTED_PROVIDER_USER"] = 403017] = "UNEXPECTED_PROVIDER_USER";
    /**
     * @name PERMISSION_NOT_REQUESTED
     * @type {number}
     * @default 403022
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PERMISSION_NOT_REQUESTED"] = 403022] = "PERMISSION_NOT_REQUESTED";
    /**
     * @name NO_USER_PERMISSION
     * @type {number}
     * @default 403023
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NO_USER_PERMISSION"] = 403023] = "NO_USER_PERMISSION";
    /**
     * @name PROVIDER_LIMIT_REACHED
     * @type {number}
     * @default 403024
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PROVIDER_LIMIT_REACHED"] = 403024] = "PROVIDER_LIMIT_REACHED";
    /**
     * @name INVALID_TOKEN
     * @type {number}
     * @default 403025
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_TOKEN"] = 403025] = "INVALID_TOKEN";
    /**
     * @name UNAUTHORIZED_ACCESS_ERROR
     * @type {number}
     * @default 403026
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNAUTHORIZED_ACCESS_ERROR"] = 403026] = "UNAUTHORIZED_ACCESS_ERROR";
    /**
     * @name DIFFERENT_USER_FOR_REAUTH
     * @type {number}
     * @default 403027
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["DIFFERENT_USER_FOR_REAUTH"] = 403027] = "DIFFERENT_USER_FOR_REAUTH";
    /**
     * @name SESSION_EXPIRED_RETRY
     * @type {number}
     * @default 403030
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SESSION_EXPIRED_RETRY"] = 403030] = "SESSION_EXPIRED_RETRY";
    /**
     * @name APPROVED_BY_MODERATOR
     * @type {number}
     * @default 403031
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["APPROVED_BY_MODERATOR"] = 403031] = "APPROVED_BY_MODERATOR";
    /**
     * @name NO_USER_COOKIE
     * @type {number}
     * @default 403035
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NO_USER_COOKIE"] = 403035] = "NO_USER_COOKIE";
    /**
     * @name UNAUTHORIZED_PARTNER
     * @type {number}
     * @default 403036
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNAUTHORIZED_PARTNER"] = 403036] = "UNAUTHORIZED_PARTNER";
    /**
     * @name POST_DENIED
     * @type {number}
     * @default 403037
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["POST_DENIED"] = 403037] = "POST_DENIED";
    /**
     * @name NO_LOGIN_TICKET
     * @type {number}
     * @default 403040
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NO_LOGIN_TICKET"] = 403040] = "NO_LOGIN_TICKET";
    /**
     * @name ACCOUNT_DISABLED
     * @type {number}
     * @default 403041
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNT_DISABLED"] = 403041] = "ACCOUNT_DISABLED";
    /**
     * @name INVALID_LOGINID
     * @type {number}
     * @default 403042
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_LOGINID"] = 403042] = "INVALID_LOGINID";
    /**
     * @name LOGIN_IDENTIFIER_EXISTS
     * @type {number}
     * @default 403043
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["LOGIN_IDENTIFIER_EXISTS"] = 403043] = "LOGIN_IDENTIFIER_EXISTS";
    /**
     * @name UNDERAGE_USER
     * @type {number}
     * @default 403044
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UNDERAGE_USER"] = 403044] = "UNDERAGE_USER";
    /**
     * @name INVALID_SITE_CONFIGURATION_ERROR
     * @type {number}
     * @default 403045
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_SITE_CONFIGURATION_ERROR"] = 403045] = "INVALID_SITE_CONFIGURATION_ERROR";
    /**
     * @name LOGINID_DOES_NOT_EXIST
     * @type {number}
     * @default 403047
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["LOGINID_DOES_NOT_EXIST"] = 403047] = "LOGINID_DOES_NOT_EXIST";
    /**
     * @name API_RATE_LIMIT_EXCEEDED
     * @type {number}
     * @default 403048
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["API_RATE_LIMIT_EXCEEDED"] = 403048] = "API_RATE_LIMIT_EXCEEDED";
    /**
     * @name PENDING_PASSWORD_CHANGE
     * @type {number}
     * @default 403100
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PENDING_PASSWORD_CHANGE"] = 403100] = "PENDING_PASSWORD_CHANGE";
    /**
     * @name ACCOUNT_PENDING_TFA_VERIFICATION
     * @type {number}
     * @default 403101
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNT_PENDING_TFA_VERIFICATION"] = 403101] = "ACCOUNT_PENDING_TFA_VERIFICATION";
    /**
     * @name ACCOUNT_PENDING_TFA_REGISTRATION
     * @type {number}
     * @default 403102
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNT_PENDING_TFA_REGISTRATION"] = 403102] = "ACCOUNT_PENDING_TFA_REGISTRATION";
    /**
     * @name ACCOUNT_PENDING_RECENT_LOGIN
     * @type {number}
     * @default 403110
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNT_PENDING_RECENT_LOGIN"] = 403110] = "ACCOUNT_PENDING_RECENT_LOGIN";
    /**
     * @name ACCOUNT_TEMPORARILY_LOCKED_OUT
     * @type {number}
     * @default 403120
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ACCOUNT_TEMPORARILY_LOCKED_OUT"] = 403120] = "ACCOUNT_TEMPORARILY_LOCKED_OUT";
    /**
     * @name REDUNDANT_OPERATION
     * @type {number}
     * @default 403200
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["REDUNDANT_OPERATION"] = 403200] = "REDUNDANT_OPERATION";
    /**
     * @name INVALID_APPLICATION_ID
     * @type {number}
     * @default 403201
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_APPLICATION_ID"] = 403201] = "INVALID_APPLICATION_ID";
    /**
     * @name NOT_FOUND
     * @type {number}
     * @default 404000
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NOT_FOUND"] = 404000] = "NOT_FOUND";
    /**
     * @name FRIEND_NOT_FOUND
     * @type {number}
     * @default 404001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["FRIEND_NOT_FOUND"] = 404001] = "FRIEND_NOT_FOUND";
    /**
     * @name CATEGORY_NOT_FOUND
     * @type {number}
     * @default 404002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["CATEGORY_NOT_FOUND"] = 404002] = "CATEGORY_NOT_FOUND";
    /**
     * @name UID_NOT_FOUND
     * @type {number}
     * @default 404003
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["UID_NOT_FOUND"] = 404003] = "UID_NOT_FOUND";
    /**
     * @name RESOURCE_NOT_FOUND
     * @type {number}
     * @default 404004
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["RESOURCE_NOT_FOUND"] = 404004] = "RESOURCE_NOT_FOUND";
    /**
     * @name INVALID_API_METHOD
     * @type {number}
     * @default 405001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_API_METHOD"] = 405001] = "INVALID_API_METHOD";
    /**
     * @name IDENTITY_EXISTS
     * @type {number}
     * @default 409001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["IDENTITY_EXISTS"] = 409001] = "IDENTITY_EXISTS";
    /**
     * @name GONE
     * @type {number}
     * @default 410000
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["GONE"] = 410000] = "GONE";
    /**
     * @name REQUEST_ENTITY_TOO_LARGE
     * @type {number}
     * @default 413001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["REQUEST_ENTITY_TOO_LARGE"] = 413001] = "REQUEST_ENTITY_TOO_LARGE";
    /**
     * @name COMMENT_TEXT_TOO_LARGE
     * @type {number}
     * @default 413002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["COMMENT_TEXT_TOO_LARGE"] = 413002] = "COMMENT_TEXT_TOO_LARGE";
    /**
     * @name OBJECT_TOO_LARGE
     * @type {number}
     * @default 413003
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["OBJECT_TOO_LARGE"] = 413003] = "OBJECT_TOO_LARGE";
    /**
     * @name PROFILE_PHOTO_TOO_LARGE
     * @type {number}
     * @default 413004
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PROFILE_PHOTO_TOO_LARGE"] = 413004] = "PROFILE_PHOTO_TOO_LARGE";
    /**
     * @name REQUEST_URI_TOO_LONG
     * @type {number}
     * @default 414000
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["REQUEST_URI_TOO_LONG"] = 414000] = "REQUEST_URI_TOO_LONG";
    /**
     * @name MISSING_USER_PHOTO
     * @type {number}
     * @default 409010
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["MISSING_USER_PHOTO"] = 409010] = "MISSING_USER_PHOTO";
    /**
     * @name COUNTER_NOT_REGISTERED
     * @type {number}
     * @default 409011
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["COUNTER_NOT_REGISTERED"] = 409011] = "COUNTER_NOT_REGISTERED";
    /**
     * @name INVALID_GMID_TICKET
     * @type {number}
     * @default 409012
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_GMID_TICKET"] = 409012] = "INVALID_GMID_TICKET";
    /**
     * @name SAML_MAPPED_ATTRIBUTE_NOT_FOUND
     * @type {number}
     * @default 409013
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SAML_MAPPED_ATTRIBUTE_NOT_FOUND"] = 409013] = "SAML_MAPPED_ATTRIBUTE_NOT_FOUND";
    /**
     * @name SAML_CERTIFICATE_NOT_FOUND
     * @type {number}
     * @default 409014
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SAML_CERTIFICATE_NOT_FOUND"] = 409014] = "SAML_CERTIFICATE_NOT_FOUND";
    /**
     * @name SAML_MESSAGE_NOT_FOUND
     * @type {number}
     * @default 409015
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SAML_MESSAGE_NOT_FOUND"] = 409015] = "SAML_MESSAGE_NOT_FOUND";
    /**
     * @name GENERAL_SERVER_ERROR
     * @type {number}
     * @default 500001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["GENERAL_SERVER_ERROR"] = 500001] = "GENERAL_SERVER_ERROR";
    /**
     * @name SERVER_LOGIN_ERROR
     * @type {number}
     * @default 500002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SERVER_LOGIN_ERROR"] = 500002] = "SERVER_LOGIN_ERROR";
    /**
     * @name DEFAULT_APPLICATION_CONFIGURATION_ERROR
     * @type {number}
     * @default 500003
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["DEFAULT_APPLICATION_CONFIGURATION_ERROR"] = 500003] = "DEFAULT_APPLICATION_CONFIGURATION_ERROR";
    /**
     * @name SESSION_MIGRATION_ERROR
     * @type {number}
     * @default 500014
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["SESSION_MIGRATION_ERROR"] = 500014] = "SESSION_MIGRATION_ERROR";
    /**
     * @name PROVIDER_ERROR
     * @type {number}
     * @default 500023
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["PROVIDER_ERROR"] = 500023] = "PROVIDER_ERROR";
    /**
     * @name DATABASE_ERROR
     * @type {number}
     * @default 500028
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["DATABASE_ERROR"] = 500028] = "DATABASE_ERROR";
    /**
     * @name USERNAME_REQUIRED
     * @type {number}
     * @default 500029
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["USERNAME_REQUIRED"] = 500029] = "USERNAME_REQUIRED";
    /**
     * @name NO_PROVIDER_APPLICATION
     * @type {number}
     * @default 500031
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["NO_PROVIDER_APPLICATION"] = 500031] = "NO_PROVIDER_APPLICATION";
    /**
     * @name LOAD_FAILED
     * @type {number}
     * @default 500032
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["LOAD_FAILED"] = 500032] = "LOAD_FAILED";
    /**
     * @name INVALID_ENVIRONMENT_CONFIG
     * @type {number}
     * @default 500033
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_ENVIRONMENT_CONFIG"] = 500033] = "INVALID_ENVIRONMENT_CONFIG";
    /**
     * @name ERROR_DURING_BACKEND_OPERATION
     * @type {number}
     * @default 500034
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["ERROR_DURING_BACKEND_OPERATION"] = 500034] = "ERROR_DURING_BACKEND_OPERATION";
    /**
     * @name TIMEOUT
     * @type {number}
     * @default 504001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["TIMEOUT"] = 504001] = "TIMEOUT";
    /**
     * @name CLIENT_TIMEOUT
     * @type {number}
     * @default 504002
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["CLIENT_TIMEOUT"] = 504002] = "CLIENT_TIMEOUT";
    /**
     * @name INVALID_URL
     * @type {number}
     * @default 404004
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["INVALID_URL"] = 404004] = "INVALID_URL";
    /**
     * @name MEDIA_ITEMS_NOT_SUPPORTED
     * @type {number}
     * @default 401001
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["MEDIA_ITEMS_NOT_SUPPORTED"] = 401001] = "MEDIA_ITEMS_NOT_SUPPORTED";
    /**
     * @name MISSING_ERROR_CODE
     * @type {number}
     * @default 599999
     * @readonly
     * @memberof gigyaClient.ErrorCodes
     */
    ErrorCodes[ErrorCodes["MISSING_ERROR_CODE"] = 599999] = "MISSING_ERROR_CODE";
})(exports.ErrorCodes || (exports.ErrorCodes = {}));
var ErrorCodes = exports.ErrorCodes;
},{}],5:[function(require,module,exports){
var ErrorCodes_1 = require('./ErrorCodes');
(function (ErrorMessages) {
    ErrorMessages[ErrorMessages['Network error'] = 500026] = 'Network error';
    ErrorMessages[ErrorMessages['Expired request'] = 403002] = 'Expired request';
    ErrorMessages[ErrorMessages['Invalid parameter format'] = 400004] = 'Invalid parameter format';
})(exports.ErrorMessages || (exports.ErrorMessages = {}));
var ErrorMessages = exports.ErrorMessages;
},{"./ErrorCodes":4}],6:[function(require,module,exports){
var ErrorCodes_1 = require("./ErrorCodes");
var ErrorMessages_1 = require("./ErrorMessages");
var index_1 = require("../index");
var Utils = (function () {
    function Utils() {
    }
    Utils.prepareParamsString = function (params) {
        return new Promise(function (resolve, reject) {
            var paramsStr;
            try {
                params.environment = index_1.getVersion();
                paramsStr = JSON.stringify(params);
            }
            catch (ex) {
                reject({
                    errorCode: ErrorCodes_1.ErrorCodes.INVALID_PARAMETER_FORMAT,
                    errorMessage: ErrorMessages_1.ErrorMessages[ErrorCodes_1.ErrorCodes.INVALID_PARAMETER_FORMAT],
                    exception: ex,
                    data: undefined
                });
                return;
            }
            resolve(paramsStr);
        });
    };
    Utils.handleJsonResponse = function (result) {
        return new Promise(function (resolve, reject) {
            var data;
            try {
                data = JSON.parse(result);
            }
            catch (ex) {
                reject({
                    data: result,
                    errorCode: ErrorCodes_1.ErrorCodes.NETWORK_ERROR,
                    errorMessage: ErrorMessages_1.ErrorMessages[ErrorCodes_1.ErrorCodes.NETWORK_ERROR],
                    exception: ex
                });
                return;
            }
            resolve({
                data: data,
                errorCode: data.errorCode,
                errorMessage: data.errorMessage,
                errorDetails: data.errorDetails
            });
        });
    };
    return Utils;
})();
exports.Utils = Utils;
},{"../index":7,"./ErrorCodes":4,"./ErrorMessages":5}],7:[function(require,module,exports){
var version;
function setVersion(value) {
    version = value;
}
exports.setVersion = setVersion;
/**
 * Gets the SDK version
 *
 * @returns {string}
 * @memberof module:gigyaClient
 */
function getVersion() {
    return version;
}
exports.getVersion = getVersion;
},{}],8:[function(require,module,exports){
var index_1 = require("./gigya-js-sdk-base/index");
exports.setVersion = index_1.setVersion;
exports.getVersion = index_1.getVersion;
var Utils_1 = require("./gigya-js-sdk-base/app/Utils");
exports.Utils = Utils_1.Utils;
var ErrorCodes_1 = require("./gigya-js-sdk-base/app/ErrorCodes");
exports.ErrorCodes = ErrorCodes_1.ErrorCodes;
var ErrorMessages_1 = require("./gigya-js-sdk-base/app/ErrorMessages");
exports.ErrorMessages = ErrorMessages_1.ErrorMessages;
var EventDispatcher_1 = require("./app/EventDispatcher");
exports.EventDispatcher = EventDispatcher_1.EventDispatcher;
var Event_1 = require("./app/Event");
exports.Event = Event_1.Event;
},{"./app/Event":2,"./app/EventDispatcher":3,"./gigya-js-sdk-base/app/ErrorCodes":4,"./gigya-js-sdk-base/app/ErrorMessages":5,"./gigya-js-sdk-base/app/Utils":6,"./gigya-js-sdk-base/index":7}],9:[function(require,module,exports){
/** Cordova plugin API
 * @module gigyaClient
 */
var index_1 = require("./gigya-js-sdk-client-base/index");
exports.ErrorCodes = index_1.ErrorCodes;
exports.Event = index_1.Event;
exports.getVersion = index_1.getVersion;
var Request_1 = require("./app/Request");
exports.Request = Request_1.Request;
var eventDispatcher = new index_1.EventDispatcher();
index_1.setVersion('cordova_1.0.0');
if (window['__GIGYA_DEBUG_OPTION_ENABLE_TEST_NETWORKS'])
    cordova.exec(null, null, 'GigyaConnectPlugin', 'debugOptionEnableTestNetworks', []);
/**
 * Initializes the Gigya SDK and sets your partner API key.
 *
 * @param {string}  apiKey      Your partner API key.
 * @param {string}  apiDomain   Your partner API domain.
 * @static
 */
function init(apiKey, apiDomain) {
    cordova.exec(onGlobalEvents, null, 'GigyaConnectPlugin', 'registerToGlobalEvents', []);
    cordova.exec(null, null, 'GigyaConnectPlugin', 'init', [apiKey, apiDomain]);
}
exports.init = init;
/**
 * Sends a request to Gigya server. This method is used for invoking any of the methods supported by Gigya's <a target="_blank" href="http://developers.gigya.com/display/GD/REST+API">REST API</a>.
 *
 * @param {string}  APIMethod        The Gigya API method to call, including namespace. For example: "socialize.getUserInfo". Please refer to our <a target="_blank" href="http://developers.gigya.com/display/GD/REST+API" >REST API reference</a> for the list of available methods.
 * @param {object}  [params={}]      An object that contains the parameters for the Gigya API method to call. Please refer to our <a target="_blank" href="http://developers.gigya.com/display/GD/REST+API" >REST API reference</a> and find in the specific method reference the list of method parameters.
 * @param {boolean} [useHTTPS=true]  This parameter determines whether the request to Gigya will be sent over HTTP or HTTPS. default is HTTPS (true).
 * @returns {Promise}
 * @static
 */
function sendRequest(APIMethod, params, useHTTPS) {
    if (params === void 0) { params = {}; }
    if (useHTTPS === void 0) { useHTTPS = true; }
    var request = new Request_1.Request(APIMethod);
    request.params = params;
    request.useHTTPS = useHTTPS;
    return request.send();
}
exports.sendRequest = sendRequest;
/**
 * Logs in the user with the specified provider.
 *
 * If the provider supports <a target="_blank" href="http://developers.gigya.com/display/GD/Cordova#Cordova-AdditionalProviderConfigurations">native login</a>, it will be used instead of fast-app-switch.
 * Calling this method when the user is already logged in will result in an exception on iOS.
 *
 * @param {string}  provider     The provider's name.
 * @param {object}  [params={}]  An object of optional login parameters. May include the following values:
 *
 *  | Name                       | Type        | Description                                                                         |
 *  |----------------------------|-------------|-------------------------------------------------------------------------------------|
 *  | cid                        | NSString    | A string of maximum 100 characters length. This string will be associated with each transaction and will later appear on reports generated by Gigya, in the "Context ID" combo box. The cid allows you to associate the report information with your own internal data. The "Context ID" combo box lets you filter the report data by application context. |
 *  | facebookReadPermissions    | NSString    | A comma delimited list of Facebook extended permissions to request from the user **when using <a target="_blank" href="http://developers.gigya.com/display/GD/Cordova#Cordova-FacebookNativeLogin">native login</a>**. This parameter gives the possibility to request extended permissions in addition to the permissions that Gigya is already requesting. Please refer to Facebook's <a target="_blank" href="https://developers.facebook.com/docs/reference/login/#permissions">permissions</a> documentation for the complete list of read permissions. Note: you should only include read permissions, otherwise Facebook will fail the login. |
 *  | googleExtraPermissions     | NSString    | This parameter gives the possibility to request extended permissions in addition to the permissions that Gigya is already requesting. The supported values are: "wallet" - for Google wallet permissions. |
 *  | googlePlusExtraPermissions | NSString    | A comma delimited list of Google+ extended permissions to request from the user **when using <a target="_blank" href="http://developers.gigya.com/display/GD/Cordova#Cordova-Google+NativeLogin">native login</a>**. |
 *  | pendingRegistration        | NSNumber    | A Boolean value indicating whether the account should not be considered final until <a target="_blank" href="http://developers.gigya.com/display/GD/socialize.notifyRegistration+REST">socialize.notifyRegistration</a> is called. Default is `YES`. |
 *  | sessionExpiration          | NSNumber    | A time interval that defines the time in seconds that Gigya should keep the login session valid for the user. If this parameter is not specified, the session will be valid forever. |
 *  | forceAuthentication        | NSNumber    | A Boolean value indicating whether the user will be forced to provide his social network credentials during login, even if he is already connected to the social network. Default is `NO` |
 *  | temporaryAccount           | NSNumber    | A Boolean value indicating whether the account is temporary and is only accessible with the associated access token. This means that it is not possible to access the same account, and get the same Gigya UID again by using login. Default is `NO`. |
 *  | loginMode                  | NSString    | (optional) - The type of login being performed<ul><li>standard - (default) the user is logging into an existing account.</li><li>link - the user is linking a social network to an existing account. The account being used to login will become the primary account. When passing loginMode='link', regToken must also be passed to identify the account being linked. This is obtained from the initial login call response.</li><li>reAuth - the user is proving ownership of an existing account by logging into it. The loginID will be ignored and the password verified.</li></ul> |
 *  | regToken                   | NSString    | (optional) This parameter is required for completing the link accounts flow. Once the initial login has failed, call the login method with loginMode=link and the regToken returned from the initial call to complete the linking. For more information go to the <a target="_blank" href="http://developers.gigya.com/display/GD/Linking+Social+Accounts">social account linking guide</a>. |
 *
 * @returns {Promise}
 * @static
 */
function loginToProvider(provider, params) {
    if (params === void 0) { params = {}; }
    return new Promise(function (resolve, reject) {
        index_1.Utils.prepareParamsString(params)
            .then(function (paramsStr) {
            cordova.exec(function (result) {
                index_1.Utils.handleJsonResponse(result).then(resolve, reject);
            }, function (error) {
                index_1.Utils.handleJsonResponse(error).then(resolve, reject);
            }, 'GigyaConnectPlugin', 'loginToProvider', [provider, paramsStr]);
        }, reject);
    });
}
exports.loginToProvider = loginToProvider;
/**
 * Logs out from Gigya and clears the saved session.
 *
 * If the user has logged in to Facebook or Google+ via <a target="_blank" href="http://developers.gigya.com/display/GD/Cordova#Cordova-AdditionalProviderConfigurations">native login</a>, this method will log out from the corresponding native SDKs as well.
 *
 * @static
 */
function logout() {
    cordova.exec(null, null, 'GigyaConnectPlugin', 'logout', []);
}
exports.logout = logout;
/**
 * Logs in the user with the specified provider. When the user completes the login process, Gigya will associate the connection with the user's account.
 *
 * If the provider supports <a target="_blank" href="http://developers.gigya.com/display/GD/Cordova#Cordova-AdditionalProviderConfigurations">native login</a>, it will be used instead of fast-app-switch.
 * Calling this method when the user isn't logged in (there is no Gigya session) will result in an exception on iOS.
 *
 * @param {string}  provider     The provider's name.
 * @param {object}  [params={}]  An object of optional login parameters. May include the following values:
 *
 * | Name                       | Type        | Description                                                                         |
 * |----------------------------|-------------|-------------------------------------------------------------------------------------|
 * | cid                        | NSString    | A string of maximum 100 characters length. This string will be associated with each transaction and will later appear on reports generated by Gigya, in the "Context ID" combo box. The cid allows you to associate the report information with your own internal data. The "Context ID" combo box lets you filter the report data by application context. |
 * | facebookReadPermissions    | NSString    | A comma delimited list of Facebook extended permissions to request from the user **when using <a target="_blank" href="http://developers.gigya.com/display/GD/Cordova#Cordova-FacebookNativeLogin">native login</a>**. This parameter gives the possibility to request extended permissions in addition to the permissions that Gigya is already requesting. Please refer to Facebook's <a target="_blank" href="https://developers.facebook.com/docs/reference/login/#permissions">permissions</a> documentation for the complete list of read permissions. Note: you should only include read permissions, otherwise Facebook will fail the login. |
 * | googleExtraPermissions     | NSString    | This parameter gives the possibility to request extended permissions in addition to the permissions that Gigya is already requesting. The supported values are: "wallet" - for Google wallet permissions. |
 * | googlePlusExtraPermissions | NSString    | A comma delimited list of Google+ extended permissions to request from the user **when using <a target="_blank" href="http://developers.gigya.com/display/GD/Cordova#Cordova-FacebookNativeLogin">native login</a>**. |
 *
 * @returns {Promise}
 * @static
 */
function addConnectionToProvider(provider, params) {
    if (params === void 0) { params = {}; }
    return new Promise(function (resolve, reject) {
        index_1.Utils.prepareParamsString(params)
            .then(function (paramsStr) {
            cordova.exec(function (result) {
                index_1.Utils.handleJsonResponse(result).then(resolve, reject);
            }, function (error) {
                index_1.Utils.handleJsonResponse(error).then(reject, reject);
            }, 'GigyaConnectPlugin', 'addConnectionToProvider', [provider, paramsStr]);
        }, reject);
    });
}
exports.addConnectionToProvider = addConnectionToProvider;
/**
 * Renders Gigya <a target="_blank" href="http://developers.gigya.com/display/GD/Plugins">JS Plugins</a> and display them modally.
 *
 * @param {string}  pluginName          A plugin name of a supported plugin, see <GSPluginView> for a list.
 * @param {object}  [params={}]         The parameters passed to the plugin.
 * @param {object}  [pluginEvents={}]   An object of optional event handlers functions that accepts plugin event object as an argument.
 * @static
 */
function showPlugin(pluginName, params, pluginEvents) {
    if (params === void 0) { params = {}; }
    if (pluginEvents === void 0) { pluginEvents = {}; }
    var paramsStr;
    try {
        paramsStr = JSON.stringify(params);
    }
    catch (ex) {
        if (typeof pluginEvents['onError'] !== "function")
            return;
        pluginEvents['onError']({
            errorCode: index_1.ErrorCodes.INVALID_PARAMETER_FORMAT,
            errorMessage: index_1.ErrorMessages[index_1.ErrorCodes.INVALID_PARAMETER_FORMAT],
            exception: ex,
            data: undefined
        });
        return;
    }
    cordova.exec(function (result) {
        showPluginOnEvent(pluginEvents, result);
    }, function (error) {
        if (typeof pluginEvents['onError'] !== "function")
            return;
        index_1.Utils.handleJsonResponse(error).then(pluginEvents['onError'], pluginEvents['onError']);
    }, 'GigyaConnectPlugin', 'showPlugin', [pluginName, paramsStr]);
}
exports.showPlugin = showPlugin;
/**
 * Adds a global event listener
 *
 * @param {string}    eventName     The event name to listen to.
 * @param {function}  eventHandler  The event handler function that will be called with a CustomEvent object when the event is triggered.
 * @static
 */
function addEventListener(eventName, eventHandler) {
    eventDispatcher.addEventListener(eventName, eventHandler);
}
exports.addEventListener = addEventListener;
/**
 * Removes a global event listener
 *
 * @param {string}    eventName     The event name to listen to.
 * @param {function}  eventHandler  The event handler function that will be called with a CustomEvent object when the event is triggered.
 * @static
 */
function removeEventListener(eventName, eventHandler) {
    eventDispatcher.removeEventListener(eventName, eventHandler);
}
exports.removeEventListener = removeEventListener;
function showPluginOnEvent(pluginEvents, result) {
    var data;
    try {
        data = JSON.parse(result);
    }
    catch (ex) {
        if (typeof pluginEvents['onError'] !== "function")
            return;
        pluginEvents['onError']({
            data: result,
            errorCode: index_1.ErrorCodes.NETWORK_ERROR,
            errorMessage: index_1.ErrorMessages[index_1.ErrorCodes.NETWORK_ERROR],
            exception: ex
        });
        return;
    }
    var eventName = data.event.eventName;
    var methodName = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
    if (typeof pluginEvents[methodName] !== "function")
        return;
    pluginEvents[methodName](data.event);
}
function onGlobalEvents(result) {
    var data;
    try {
        data = JSON.parse(result);
    }
    catch (ex) {
        return;
    }
    var eventInitDict = (data.type == index_1.Event.LOGIN) ? { detail: { account: data.account } } : undefined;
    eventDispatcher.dispatchEvent(new CustomEvent(data.type, eventInitDict));
}
},{"./app/Request":1,"./gigya-js-sdk-client-base/index":8}]},{},[9])(9)
});