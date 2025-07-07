import { FaCheckCircle, FaClock, FaDownload, FaFileInvoice, FaTimesCircle } from "react-icons/fa";
import { B2B_PRIMARY } from "../theme";

const orders = [
  {
    id: "ORD12345",
    date: "2024-06-01",
    quantity: "100g",
    total: "₹5,00,000",
    status: "Delivered",
    invoice: "invoice_ORD12345.pdf",
  },
  {
    id: "ORD12346",
    date: "2024-05-28",
    quantity: "50g",
    total: "₹2,50,000",
    status: "In Process",
    invoice: "invoice_ORD12346.pdf",
  },
  {
    id: "ORD12347",
    date: "2024-05-20",
    quantity: "20g",
    total: "₹1,00,000",
    status: "Cancelled",
    invoice: "invoice_ORD12347.pdf",
  },
];

function getStatusIcon(status: string) {
  if (status === "Delivered")
    return <FaCheckCircle className="text-green-500 mr-1" title="Delivered" />;
  if (status === "In Process")
    return <FaClock className="text-yellow-500 mr-1" title="In Process" />;
  if (status === "Cancelled")
    return <FaTimesCircle className="text-red-500 mr-1" title="Cancelled" />;
  return null;
}

export default function OrderHistory() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6" style={{ color: B2B_PRIMARY }}>Order History</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 border border-[#fbeaf0] hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#7a1335] text-lg">{order.id}</span>
              <span className="text-xs text-gray-400">{order.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Quantity:</span>
              <span className="text-[#7a1335] font-bold">{order.quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Total:</span>
              <span className="text-[#7a1335] font-bold">{order.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Status:</span>
              <span className="flex items-center font-semibold">
                {getStatusIcon(order.status)}
                <span
                  className={
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "In Process"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {order.status}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <FaFileInvoice className="text-[#7a1335]" />
              <a
                href={`#`}
                download={order.invoice}
                className="flex items-center gap-1 text-sm text-blue-600 underline hover:text-blue-800"
              >
                <FaDownload /> Download Invoice
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
