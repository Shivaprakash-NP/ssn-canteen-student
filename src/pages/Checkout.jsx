import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { db, auth } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import QRCode from 'qrcode';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const Checkout = () => {
  const { cart, canteen, setCart } = useContext(AppContext);
  const [orderQRCode, setOrderQRCode] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0 && !orderQRCode) {
        navigate('/');
    }
  }, [cart, navigate, orderQRCode]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const orderData = {
        studentId: auth.currentUser.uid,
        studentName: auth.currentUser.displayName || 'Student',
        canteenId: canteen.id,
        items: cart,
        totalAmount,
        status: 'pending',
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      const qrCodeDataURL = await QRCode.toDataURL(docRef.id, { width: 300, margin: 2 });
      setOrderQRCode(qrCodeDataURL);
      setCart([]);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to place order.");
    } finally {
        setProcessing(false);
    }
  };

  if (orderQRCode) {
    return (
      <div className="text-center max-w-md mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-slate-200 animate-fade-in">
        <FiCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="mb-6 text-slate-600">Show this QR code at the canteen to collect your order.</p>
        <div className="p-4 bg-slate-100 rounded-xl inline-block">
            <img src={orderQRCode} alt="Order QR Code" className="mx-auto rounded-lg" />
        </div>
        <button onClick={() => navigate('/history')} className="mt-8 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-all duration-300">
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-slate-200">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Confirm Order</h1>
        <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-blue-600 hover:underline font-semibold">
          <FiArrowLeft />
          <span>Back to Cart</span>
        </button>
      </div>
      <div className="bg-slate-50 p-6 rounded-lg mb-6 text-center">
        <p className="text-lg text-slate-600">Total Amount</p>
        <p className="text-4xl font-extrabold text-blue-600">₹{totalAmount}</p>
      </div>
      <button onClick={handlePayment} disabled={processing} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:bg-slate-400 disabled:shadow-none disabled:transform-none">
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default Checkout;