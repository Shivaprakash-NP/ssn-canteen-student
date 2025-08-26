import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';

const Cart = () => {
  const { cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  const updateQuantity = (itemId, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + amount;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean); // Removes null items
    });
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800">Your Cart</h1>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-600 hover:underline font-semibold">
          <FiArrowLeft />
          <span>Back to Menu</span>
        </button>
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-700">Your cart is empty!</h2>
          <p className="text-slate-500 mt-2">Looks like you haven't added anything yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-lg flex justify-between items-center border border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-700">{item.name}</h2>
                  <p className="text-slate-500">₹{item.price} x {item.quantity} = <span className="font-bold text-slate-800">₹{item.price * item.quantity}</span></p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateQuantity(item.id, -1)} className="bg-slate-200 text-slate-800 h-10 w-10 rounded-full font-bold text-xl flex items-center justify-center hover:bg-slate-300 transition-all duration-300">-</button>
                  <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="bg-slate-200 text-slate-800 h-10 w-10 rounded-full font-bold text-xl flex items-center justify-center hover:bg-slate-300 transition-all duration-300">+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-lg sticky top-28 border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 mb-4">Summary</h2>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-600 text-lg">Subtotal</span>
                    <span className="font-bold text-lg text-slate-800">₹{totalAmount}</span>
                </div>
                <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold"
                >
                Proceed to Payment
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;