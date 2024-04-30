import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/fetchOrders';
import '../styles/OrdersList.css';
import Order from '../components/Order';

const OrdersList = () => {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <h1>Liste de commandes</h1>
      <div className="order-container">
        {orders.map((order: Order) => (
          <Link key={order.id} to={`/order/${order.id}`} className="order-link">
            <Order {...order} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default OrdersList;
