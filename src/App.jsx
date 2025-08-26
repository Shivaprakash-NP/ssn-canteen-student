import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import CanteenMenu from './pages/CanteenMenu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/" element={<ProtectedRoute><CanteenMenu /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;