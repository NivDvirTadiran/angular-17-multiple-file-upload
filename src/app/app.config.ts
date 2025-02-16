import {ApplicationConfig, InjectionToken} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.module';


// parse ful url to ip,port, params
var parsedUrl = new URL(window.location.href);
var url = parsedUrl.hostname;
var port = parsedUrl.port;
var protocol = parsedUrl.protocol;
const GATE_URL_PREFIX = protocol + "//" + url + ":" + port;


export const AppConfig = {
  accServer: {
    ACCWEBServers: GATE_URL_PREFIX,
    ACCServerAddress1: "",
    ACCServerAddress2: ""
  },
  endpoints: {
    TOKEN_KEY: 'token',
    REFRESHTOKEN_KEY: 'auth-refreshtoken',
    USER_KEY: 'user'
  },
  translateLanguage: {
    lang: 'eng',
    dir: 'ltr'
  },
  webAppVersion: "8.6.000"
};
