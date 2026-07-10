import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'https://localhost:7122/api/Booking';

  constructor(private http: HttpClient) {}

  addBooking(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getBookings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBookingsByPhone(phone: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-phone/${phone}`);
  }

  getBookingsByCustomer(customerId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/by-customer/${customerId}`);
} 
  getBookingById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateBooking(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteBooking(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  cancelBooking(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel/${id}`, {});
  }
}