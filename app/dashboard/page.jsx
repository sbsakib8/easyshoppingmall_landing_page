import { getOrders } from "@/action/order";
import DashboardHome from "@/components/Dashboard/DashboardHome/DashboardHome";

const DashboardPage = async() => {
  const data = await getOrders();
   const orders = data?.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }));
    return (
        <DashboardHome orders = {orders} />
    );
};

export default DashboardPage;