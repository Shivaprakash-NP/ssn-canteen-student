import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { FiArrowLeft } from 'react-icons/fi';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'orders'), where('studentId', '==', auth.currentUser.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      ordersData.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  if (loading) {
    return <p className="text-center p-10 text-slate-500">Loading your order history...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800">My Order History</h1>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-600 hover:underline font-semibold">
          <FiArrowLeft />
          <span>Back to Menu</span>
        </button>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-700">No orders yet!</h2>
          <p className="text-slate-500 mt-2">Place your first order to see it here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm text-slate-500 font-mono">ID: {order.id.substring(0, 8)}</p>
                    <p className="font-semibold text-slate-700">Date: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
                </div>
                <span className={`px-4 py-1 text-sm font-bold rounded-full border ${getStatusClass(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <ul className="space-y-1 text-slate-600">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                        <span>{item.name} <span className="text-slate-400">x</span> {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 pt-4 border-t border-slate-200 font-bold text-right text-xl text-slate-800">Total: ₹{order.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;