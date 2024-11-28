import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleStartQuiz = () => {
    if (userName && avatar) {
      navigate('/quiz');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Qual é o seu nome?</h2>
      <input 
        type="text" 
        className="px-4 py-2 mb-4 border rounded-lg" 
        placeholder="Digite seu nome"
        onChange={(e) => setUserName(e.target.value)}
      />

      <h2 className="text-2xl font-bold mb-4">Escolha um personagem</h2>
      <div className="flex space-x-4">
        <button onClick={() => setAvatar('kangaroo')} className="border-2 border-orange-500 rounded-full p-4">
          <img src="/kangaroo-avatar.jpg" alt="Kangaroo" className="w-16 h-16 rounded-full" />
        </button>
        <button onClick={() => setAvatar('koala')} className="border-2 border-orange-500 rounded-full p-4">
          <img src="/koala-avatar.jpg" alt="Koala" className="w-16 h-16 rounded-full" />
        </button>
      </div>

      <button
        onClick={handleStartQuiz}
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-600 transition">
        Começar Quiz
      </button>
    </div>
  );
};

export default Quiz;