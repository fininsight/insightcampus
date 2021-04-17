import { Order } from "./order";
import { OrderItem } from "./order-item";

export class OrderData {
  order: Order;
  orderItem: Array<OrderItem>;
}