import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const StudentHome = () => {
  const { canteens, setSelectedCanteen } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCanteenSelect = (canteen) => {
    setSelectedCanteen(canteen);
    navigate('/menu');
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Welcome to SSN Canteens</h1>
      <p className="text-lg text-gray-600 mb-10">Please select a canteen to view the menu and place your order.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {canteens.map((canteen) => (
          <div
            key={canteen.id}
            onClick={() => handleCanteenSelect(canteen)}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-blue-600">{canteen.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
