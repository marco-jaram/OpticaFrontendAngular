import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Customer {
  id: number;
  name: string;
  tel: string;
  email: string;
  lastVisitDate: Date;
  nextVisitDate: Date;
  note: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  apiUrl = 'http://localhost:8080/api/cliente';
  customers: Customer[] = [];
  newCustomer: Customer = {
    id: 0,
    name: '',
    tel: '',
    email: '',
    lastVisitDate: new Date(),
    nextVisitDate: new Date(),
    note: ''
  };

  
  selectedCustomerId: number | null = null; 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.http.get<Customer[]>(this.apiUrl).subscribe(customers => {
      this.customers = customers;
    });
  }

  saveCustomer(): void {
    this.http.post<Customer>(this.apiUrl, this.newCustomer).subscribe(customer => {
      this.customers.push(customer);
      this.newCustomer = {
        id: 0,
        name: '',
        tel: '',
        email: '',
        lastVisitDate: new Date(),
        nextVisitDate: new Date(),
        note: ''
      };
    });
  }

  deleteCustomer(id: number): void {
    this.selectedCustomerId = id;
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      this.performDelete();
    } else {
      this.selectedCustomerId = null;
      console.log("Eliminación cancelOpticaCentroCrud-Frontendlada");
    }
  }

  performDelete(): void {
    if (this.selectedCustomerId !== null) {
      this.http.delete<void>(`${this.apiUrl}/${this.selectedCustomerId}`).subscribe(() => {
        this.customers = this.customers.filter(customer => customer.id !== this.selectedCustomerId);
        this.getCustomers(); // Actualizar la lista de clientes después de la eliminación
      });
      this.selectedCustomerId = null;
      console.log("Cliente eliminado");
    }
  }
  
}

