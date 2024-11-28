import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold text-center mb-4">Quiz da Austrália</h1>
      <button 
        onClick={handleStart} 
        className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-600 transition">
        Iniciar
      </button>
    </div>
  );
};

export default Home;