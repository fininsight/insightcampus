import { Component, OnInit } from '@angular/core';
import { DataTable } from '../core/models/datatable';
import { CodeService } from '../core/services/code.service';
import { OrderService } from '../core/services/order.service';
import { ClassService } from '../core/services/class.service';
import { TeacherService } from '../core/services/teacher.service';
import { Order } from '../core/models/order';
import { OrderItem } from '../core/models/order-item';
import { Code } from '../core/models/code';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderData } from '../core/models/order-data';

@Component({
  selector: 'app-page-order-manage',
  templateUrl: './page-order-manage.component.html',
  styleUrls: ['./page-order-manage.component.css']
})
export class PageOrderManageComponent implements OnInit {
  
  orders = new DataTable();
  classes = new DataTable();

  listOfTeacher: Array<{ value: number; text: string }> = [];
  
  selectedOrder: Order = new Order();
  
  popupOrder: Order = new Order();
  popupOrderItem : OrderItem = new OrderItem();
  popupOrderItemList: Array<OrderItem> = [];

  orderData = new OrderData();
  
  orderLoading = true;
  orderItemLoading = true;

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
              private orderService: OrderService,
              private classService: ClassService,
              private teacherService: TeacherService,
              private modal: NzModalService,
              private message: NzMessageService) {
                this.classes.pageNumber = 1;
                this.classes.size = 100;
                this.getClasses();
                this.getCodes();
                this.getOrderFilter();
                this.searchTeachers('ALL');
  }

  ngOnInit() {
  }

  currencyFormatter = (value: string) => {
    if (value === null) {
      return null;
    } else if (value === undefined) {
      return undefined;
    } else {
      value = value + '';
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
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

  getOrder() {
    this.orderService.getOrders(this.orders).subscribe(data => {
      this.orders = data;
      this.orderLoading = false;
      this.selectedOrder = new Order();
    });
  }

  getOrderItems(order_id) {
    this.orderService.getOrderItems(order_id).subscribe(data => {
      this.popupOrderItemList = data.slice();
      this.orderItemLoading = false;
    });
  }

  getCodes() {
    this.codeService.getCodes('order_type').subscribe(data => {
      this.orderCode = data;
    })
  }

  getClasses() {
    this.classService.getClasses(this.classes).subscribe(data => {
      this.classes = data;
    })
  }

  searchTeachers(value: string) {
    this.teacherService.searchTeacher(value).subscribe(data => {
      this.listOfTeacher = [];
      data.forEach(item => {
        this.listOfTeacher.push({
          value: item.teacher_seq,
          text: item.name
        });
      });
    });
  }

  selectTeacher(value: string): void {
    this.searchTeachers(value);
  }

  selectOrder(params) {
    this.selectedOrder = params;
  }

  orderAdd() {
    this.popupOrder = new Order();
    this.isOrderAdd = true;
    this.popupOrderItem = new OrderItem();
    this.popupOrderItemList = [];
  }

  orderAddOk() {
    this.orderData.order = this.popupOrder;
    this.orderData.orderItem = this.popupOrderItemList;
    this.orderService.addOrder(this.orderData).subscribe(data => {
      this.getOrder();
      this.isOrderAdd = false;
      this.message.create('success', '사용자 추가가 완료되었습니다.');
    })
  }

  orderUpdate() {
    this.popupOrderItemList = [];
    this.orderItemLoading = true;
    this.getOrderItems(this.selectedOrder.order_id);

    this.popupOrder = new Order();
    this.popupOrderItem = new OrderItem();
    this.popupOrder.order_id = this.selectedOrder.order_id;
    this.popupOrder.order_date = this.selectedOrder.order_date;
    this.popupOrder.order_price = this.selectedOrder.order_price;
    this.popupOrder.order_type = this.selectedOrder.order_type;
    this.popupOrder.order_user_seq = this.selectedOrder.order_user_seq;
    this.popupOrder.address = this.selectedOrder.address;
    this.isOrderUpdate = true;
  }

  orderUpdateOk() {
    this.orderData.order = this.popupOrder;
    this.orderData.orderItem = this.popupOrderItemList;
    console.log(this.orderData);
    console.log(this.popupOrder.order_id);
    this.orderService.updateOrder(this.orderData, this.popupOrder.order_id).subscribe(data => {
      this.getOrder();
      this.isOrderUpdate = false;
      this.message.create('success', '사용자 수정이 완료되었습니다.');
    })
  }

  orderDelete() {
    this.modal.confirm({
      nzTitle: '사용자를 삭제하시겠습니까?',
      nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.orderService.deleteOrder(this.selectedOrder.order_id).subscribe(data => {
          this.getOrder();
          this.message.create('success', '사용자 삭제가 완료되었습니다.');
        })
      }
    });
  }

  orderItemAdd() {
    const pushData: OrderItem = new OrderItem();
    pushData.class_seq = this.popupOrderItem.class_seq;
    pushData.price = this.popupOrderItem.price;
    
    const tempList = this.popupOrderItemList.slice();
    this.popupOrderItemList = [...tempList, pushData];
    this.popupOrderItem = new OrderItem();
    console.log(this.popupOrderItemList)
  }

  orderItemDelete(seq) {
    const tempList = this.popupOrderItemList.filter(data => data.class_seq !== seq);
    this.popupOrderItemList = tempList;
  }

  popupCancel(): void {
    this.isOrderAdd = false;
    this.isOrderUpdate = false;
  }

  getClassName(seq): string {
    const class_nm = this.classes.data.find(data => data.class_seq === seq).class_nm;
    return class_nm;
  }

  getFullDate(target: string) {
    const date = new Date(target);
    let year: string | number = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();

    const result = [year, month, day].join('-');
    return result;
  }

  getCodeName(codeId: string) {
    const findCode = this.orderCode.find(code => code.code_id === codeId);
    return findCode.code_nm;
  }

}
