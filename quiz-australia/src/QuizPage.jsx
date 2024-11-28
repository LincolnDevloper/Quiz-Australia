import { useState} from 'react';

const QuizPage = () => {
  const [questions] = useState([
    { question: "Qual é a capital da Austrália?", options: ["Sydney", "Canberra", "Melbourne", "Brisbane"], answer: "Canberra" },
    { question: "Qual animal é símbolo da Austrália?", options: ["Canguru", "Koala", "Kangaroo", "Emu"], answer: "Canguru" },
    // Adicione mais perguntas aqui para teste
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].answer) {
      setIsAnswerCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setIsAnswerCorrect(null);
    } else {
      // Redirecionar para a página de resultados
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-4">
        <div className="h-2 bg-gray-300 rounded-full">
          <div className="h-2 bg-orange-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">{questions[currentQuestionIndex].question}</h2>
        <div className="space-y-4 mt-6">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full p-4 rounded-lg border-2 ${isAnswerCorrect === null ? 'border-gray-400' : isAnswerCorrect && option === questions[currentQuestionIndex].answer ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'}`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={nextQuestion}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
          Próxima Pergunta
        </button>
      </div>
    </div>
  );
};

export default QuizPage;