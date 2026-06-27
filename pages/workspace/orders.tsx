import Protected from "@components/layout/protected";
import Orders from "@containers/workspace/orders";

const OrdersPage = () => {
  return (
    <Protected>
      <Orders />
    </Protected>
  );
};

export default OrdersPage;
