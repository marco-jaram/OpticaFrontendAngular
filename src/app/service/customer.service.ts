import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root' // Esto asegura que el servicio esté disponible en toda la aplicación
})
export class CustomerService {
  // Inyecta HttpClient en el constructor para poder utilizarlo en el servicio
  constructor(private http: HttpClient) { }
  
  // Aquí puedes definir los métodos relacionados con la comunicación HTTP
  getCustomers(): Observable<Customer[]> {
    const apiUrl = 'http://localhost:8080/api/cliente';
    return this.http.get<Customer[]>(apiUrl);
  }

  saveCustomer(newCustomer: Customer): Observable<Customer> {
    const apiUrl = 'http://localhost:8080/api/cliente';
    return this.http.post<Customer>(apiUrl, newCustomer);
  }

  deleteCustomer(id: number): Observable<void> {
    const apiUrl = `http://localhost:8080/api/cliente/${id}`;
    return this.http.delete<void>(apiUrl);
  }
}
