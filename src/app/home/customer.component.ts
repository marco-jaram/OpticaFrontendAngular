import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../models/customer';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
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

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  saveCustomer(): void {
    this.customerService.saveCustomer(this.newCustomer).subscribe(customer => {
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
      console.log("Eliminación cancelada");
    }
  }

  performDelete(): void {
    if (this.selectedCustomerId !== null) {
      this.customerService.deleteCustomer(this.selectedCustomerId).subscribe(() => {
        this.customers = this.customers.filter(customer => customer.id !== this.selectedCustomerId);
        this.getCustomers();
      });
      this.selectedCustomerId = null;
      console.log("Cliente eliminado");
    }
  }
}