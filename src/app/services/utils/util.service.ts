import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getParameters(json) {
    return Object.keys(json).map((key) => {
      if (json[key] === undefined || json[key] === null) {
        json[key] = '';
      }
      return `${key}=${json[key]}`;
    }).join('&');
  }
}
