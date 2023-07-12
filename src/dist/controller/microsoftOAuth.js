"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const UserEntity_1 = require("../model/AdminEntity/UserEntity");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Github = require("passport-github2").Strategy;
const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
console.log(GoogleStrategy);
passport_1.default.use(new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield UserEntity_1.UserEntity.findOne({
        where: { email: profile._json.email },
    });
    if (checkUser) {
        return callback(null, checkUser);
    }
    else {
        const userCreated = yield UserEntity_1.UserEntity.create({
            email: profile._json.email,
            userName: profile.name.familyName,
            token: "",
            verified: profile._json.email_verified,
        }).save();
        return callback(null, userCreated);
    }
})));
var MicrosoftStrategy = require("passport-microsoft").Strategy;
passport_1.default.use(new MicrosoftStrategy({
    // Standard OAuth2 options
    clientID: process.env.APPLICATION_ID2,
    clientSecret: process.env.SECRET_ID2,
    callbackURL: "/auth/microsoft/callback",
    scope: ["openid", "profile", "email"],
    // Microsoft specific options
    // [Optional] The tenant for the application. Defaults to 'common'.
    // Used to construct the authorizationURL and tokenURL
    tenant: "common",
    // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
    authorizationURL: 
    //   `https://login.microsoftonline.com/${process.env.TENANT_ID2}/oauth2/v2.0/authorize`,
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
    tokenURL: 
    // `https://login.microsoftonline.com/${process.env.TENANT_ID2}/oauth2/v2.0/token`,
    "https://login.microsoftonline.com/common/oauth2/v2.0/token",
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=microsoftOAuth.js.map