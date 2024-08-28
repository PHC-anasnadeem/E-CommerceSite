import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild('priceTemplate', { static: true }) priceTemplate: any;
  orders: any[] = [];
  totalOrders: number = 0;
  pendingOrders: number = 0;
  completedOrders: number = 0;
  CompletedOrders: number = 0;
  completedOrdersCount: number = 0;
  selectedOrder: any = null;
  showAddressModal: boolean = false;

  constructor(
    private productService: ProductService,
  
  ) { }



  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.productService.getOrders().subscribe(
      (data: any) => {
        this.CompletedOrders = data.completedOrdersCount;
        this.orders = data.pendingOrders;
        this.totalOrders = this.orders.length;
        this.pendingOrders = this.orders.length;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  viewDetail(order: any) {
    this.selectedOrder = order;
    this.showAddressModal = true;
  }

  closeAddressModal() {
    this.showAddressModal = false;
  }

  completeOrder(orderId: number) {
    this.productService.completeOrder(orderId).subscribe(
      () => {
        alert('Order marked as completed.');
        this.loadOrders();
      },
      (error) => {
        console.error('Error completing order:', error);
      }
    );
  }
}
