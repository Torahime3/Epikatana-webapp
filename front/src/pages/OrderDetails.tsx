import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  interface Order {
    id: number;
    creationDate: string;
    idUser: number;
    products: Product[];
  }

  interface Product {
    id: number;
    name: string;
    price: number;
  }

  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        return response.json();
      })
      .then((data: Order) => setOrder(data))
      .catch(error => console.error('Error fetching order:', error));
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Details - {order.id}</h1>
      <p>Creation Date: {order.creationDate}</p>
      <p>User: {order.idUser}</p>
      <h2>Products:</h2>
      <ul>
        {order.products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails;
