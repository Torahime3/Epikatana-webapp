interface Order {
  id: number;
  totalPrice: number;
  creationDate: Date;
  products: [];

}

const Order = (order: Order) => {

  console.log(order);
    return (
        <div key={order.id} className="order-card">
            <h2>{order.id}</h2>
            <p>Creation Date : {order.creationDate.toString()}</p>
            {order.products}
            <p>Total Price : {order.totalPrice}</p>
        </div>
    )
}

export default Order;
