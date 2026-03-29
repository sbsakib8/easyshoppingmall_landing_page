import { getOrders } from "@/action/order";
import CustomersComponent from "@/components/Dashboard/CustomersComponent/CustomersComponent";

export default async function CustomersPage() {
  const orders = await getOrders();
  
  // Aggregate orders by email to extract unique customers
  const customersMap = {};
  
  orders?.forEach(order => {
    const key = order.email; // Grouping by email as the primary unique identifier for customers
    if (!key) return; // Skip if no email
    
    if (!customersMap[key]) {
      customersMap[key] = {
        _id: order._id.toString(), // Store first order ID to use as a display ref
        name: order.customerName || order.name || "Unknown Customer",
        email: order.email || "N/A",
        phone: order.phone,
        location: order.district ? `${order.city || ""}, ${order.district}` : order.address || "Unknown",
        totalOrders: 0,
        spent: 0,
      };
    }
    
    customersMap[key].totalOrders += 1;
    customersMap[key].spent += Number(order.totalPrice) || 0;
    
    // Update missing email if a newer order has it
    if (customersMap[key].email === "N/A" && order.email) {
      customersMap[key].email = order.email;
    }
  });

  const uniqueCustomers = Object.values(customersMap).sort((a, b) => b.spent - a.spent);

  return (
    <CustomersComponent customers={uniqueCustomers} />
  );
}