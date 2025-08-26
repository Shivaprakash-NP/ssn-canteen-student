import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FiPlus, FiShoppingCart } from 'react-icons/fi';

const CanteenMenu = () => {
  const { menu, canteen, cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="pb-24">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-slate-800">Today's Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menu.map((item) => (
          <div 
            key={item.id} 
            className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 border border-slate-100"
          >
            <div>
              <h2 className="text-xl font-bold text-slate-700">{item.name}</h2>
              <p className="text-lg text-blue-600 font-bold">₹{item.price}</p>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold flex items-center gap-2"
            >
              <FiPlus />
              <span>Add</span>
            </button>
          </div>
        ))}
      </div>
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <span className="font-bold text-lg text-slate-700">{totalItems} item(s) in cart</span>
                    <p className="text-slate-500">Ready to checkout?</p>
                </div>
                <button
                onClick={() => navigate('/cart')}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                >
                    <FiShoppingCart />
                    <span>View Cart</span>
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default CanteenMenu;