import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GlobalConfig } from 'src/app/config/app-config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = GlobalConfig.apiEndpoint;

  constructor(private http: HttpClient) {}

  /**
   * Gets users list
   * @returns users list
   */
  public getUsersListService() {
    return this.http.get(this.baseUrl);
  }
}
