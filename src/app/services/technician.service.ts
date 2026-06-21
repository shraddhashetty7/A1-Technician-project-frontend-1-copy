import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  private apiUrl = 'https://localhost:7122/api/Technician';

  constructor(private http: HttpClient) { }

  getTechnicians(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addTechnician(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateTechnician(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteTechnician(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}