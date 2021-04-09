import { Component, OnInit } from '@angular/core';
import { DataTable } from '../core/models/datatable';
import { CodeService } from '../core/services/code.service';
import { OrderService } from '../core/services/order.service';
import { Order } from '../core/models/order';
import { Code } from '../core/models/code';

@Component({
  selector: 'app-page-order-manage',
  templateUrl: './page-order-manage.component.html',
  styleUrls: ['./page-order-manage.component.css']
})
export class PageOrderManageComponent implements OnInit {
  
  orders = new DataTable();
  
  selectedOrder: Order = new Order();
  
  popupOrder: Order = new Order();
  
  orderLoading = true;

  isOrderAdd = false;
  isOrderUpdate = false;

  orderCode: Array<Code> = [];
  
  sortValue: string | null = null;
  sortKey: string | null = null;

  filter = {
    order_type:'',
    address: '',
  };

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
  }

  constructor(private codeService: CodeService,
              private orderService: OrderService) {
                this.getCodes();
                this.getOrderFilter();
  }

  ngOnInit() {
  }

  getOrderFilter() {
    this.orderService.getOrdersFilter(this.orders, this.filter).subscribe(data => {
      console.log(data);
      data.data = data.data.map(v => {
        v.check = false;
        return v;
      });

      this.orders = data;
      this.orderLoading = false;
      this.selectedOrder = new Order();
    });
  }

  getCodes() {
    this.codeService.getCodes('order_type').subscribe(data => {
      this.orderCode = data;
    })
  }

  selectOrder(params) {
    this.selectedOrder = params;
  }

  orderAdd() {
    this.popupOrder = new Order();
    this.isOrderAdd= true;
  }

  orderAddOk() {
    console.log(this.popupOrder)
  }

  orderUpdate() {
    this.popupOrder = new Order();
    this.popupOrder.order_id = this.selectedOrder.order_id;
    this.popupOrder.order_date = this.selectedOrder.order_date;
    this.popupOrder.order_price = this.selectedOrder.order_price;
    this.isOrderUpdate = true;
  }

  orderUpdateOk() {

  }

  orderDelete() {

  }

  popupCancel(): void {
    this.isOrderAdd = false;
    this.isOrderUpdate = false;
  }

}
