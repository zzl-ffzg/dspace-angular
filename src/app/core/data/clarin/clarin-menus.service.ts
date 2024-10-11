import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClarinMenusService {
  private apiUrl = 'https://www.clarin.hr/api/pages/';

  constructor(private http: HttpClient) { }

  menu = new BehaviorSubject({});
  menusList = this.menu.asObservable();

  updateMenu(menu: any) {
    this.menu.next(menu);
  }

  async getMenus() {
    try {
      const headers = new HttpHeaders({
        'x-requested-with': 'XMLHttpRequest',
      });
      const response = await firstValueFrom(this.http.options(this.apiUrl, {headers}));
      this.updateMenu(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}
