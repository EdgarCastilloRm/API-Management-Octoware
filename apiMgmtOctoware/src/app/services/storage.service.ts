import { Injectable } from '@angular/core';
var SecureStorage = require("secure-web-storage");
const SECRET_KEY = 'e6cff00455944224b62f5dfc3602adbe464babe34aaf90aadf7098f4140b6849c5658787b70a305e0ef2d667c92d6d594febe4c4d556cbc423ceb246db123ff8';
var CryptoJS = require("crypto-js");

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key:any): any {
        return key;
    },
    // Encrypt the localstorage data
    encrypt: function encrypt(data: any) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
        data = data.toString();
        return data;
    },
    // Decrypt the encrypted data
    decrypt: function decrypt(data: any) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);
        data = data.toString(CryptoJS.enc.Utf8);
        return data;
    }
    });

}