// src/components/QuizScreen.jsx
import { useState, useEffect } from "react";
import questions from "../utils/questions"; // Importa as perguntas de utils/questions.js

// Função para embaralhar as questões
const shuffleQuestions = (questions) => {
	for (let i = questions.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[questions[i], questions[j]] = [questions[j], questions[i]]; // Troca os elementos
	}
	return questions;
};

const QuizScreen = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [isAnswered, setIsAnswered] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [score, setScore] = useState(0);
	const [progress, setProgress] = useState(0);
	const [showModal, setShowModal] = useState(false); // Controle do modal de sair
	const [shuffledQuestions, setShuffledQuestions] = useState([]); // Perguntas embaralhadas

	const userName = localStorage.getItem("userName") || "Usuário";
	const userAvatar =
		localStorage.getItem("avatar") || "https://via.placeholder.com/avatar";

	useEffect(() => {
		// Embaralha as perguntas sempre que o componente é montado
		setShuffledQuestions(shuffleQuestions([...questions])); // Faz uma cópia das perguntas e embaralha
	}, []);

	useEffect(() => {
		setProgress(((currentQuestion + 1) / shuffledQuestions.length) * 100); // Atualiza o progresso
	}, [currentQuestion, shuffledQuestions]);

	useEffect(() => {
		// Inicializa a pontuação no localStorage quando o quiz começa
		localStorage.setItem("score", score);
		localStorage.setItem("questions", JSON.stringify(shuffledQuestions)); // Salva as questões embaralhadas no localStorage
	}, [score, shuffledQuestions]);

	const handleAnswerSelect = (answer) => {
		setSelectedAnswer(answer);
		setIsAnswered(true);

		if (answer === shuffledQuestions[currentQuestion].answer) {
			setFeedback("✅ Correto!");
			setScore(score + 1);
		} else {
			setFeedback("❌ Errado!");
		}
	};

	const goToNextQuestion = () => {
		if (currentQuestion < shuffledQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedAnswer("");
			setIsAnswered(false);
			setFeedback("");
		} else {
			localStorage.setItem("score", score);
			window.location.href = "/result"; // Redireciona para a tela de resultado
		}
	};

	const handleExitQuiz = () => {
		setShowModal(true); // Exibe o modal
	};

	const closeModal = () => {
		setShowModal(false); // Fecha o modal
	};

	const confirmExit = () => {
		setShowModal(false); // Fecha o modal
		window.location.href = "/"; // Redireciona para a tela inicial
	};

	return (
		<div>
			{/* Botão de Sair */}
			<button
				onClick={handleExitQuiz}
				className="text-2xl w-14 h-14 bg-red-700 text-white rounded-full"
			>
				<i className="fa-solid fa-arrow-right-from-bracket"></i>
			</button>
			<div className="flex flex-row justify-center h-10">
				{/* Exibe o avatar e nome do usuário */}
				<div className="flex flex-col items-center absolute transform -translate-y-[55px]">
					<img
						className="w-20 h-full rounded-full"
						src={userAvatar}
						alt="Avatar do usuário"
					/>
					<p className="text-lg font-semibold absolute transform translate-y-[68px] p-1 bg-red-400/50 w-auto h-auto text-center">
						{userName}
					</p>
				</div>
			</div>
			{/* Barra de Progresso */}
			<progress
				value={progress}
				max="100"
				className="w-full h-4 relative"
			></progress>

			<h2 className="text-2xl m-4 text-center font-bold text-[#333333]">
				{shuffledQuestions[currentQuestion]?.question}
			</h2>

			{/* Exibe a imagem da pergunta */}
			<img
				src={shuffledQuestions[currentQuestion]?.image}
				alt={`Imagem da pergunta ${currentQuestion + 1}`}
				className="p-4 w-max h-auto rounded-[32px]"
			/>

			{/* Feedback após a resposta */}
			{isAnswered && (
				<p className="flex justify-center font-semibold">{feedback}</p>
			)}

			<div className="grid grid-cols-2 p-2">
				{shuffledQuestions[currentQuestion]?.options.map((option, index) => (
					<button
						key={index}
						onClick={() => handleAnswerSelect(option)}
						disabled={isAnswered}
						className="px-3 py-5 m-1 border-solid border-[1px] border-black rounded "
						style={{
							backgroundColor:
								selectedAnswer === option
									? option === shuffledQuestions[currentQuestion].answer
										? "green"
										: "red"
									: "white",
							color:
								selectedAnswer === option
									? option === shuffledQuestions[currentQuestion].answer
										? "white"
										: "white"
									: "blue",
							borderRadius: "5px",
						}}
					>
						{option}
					</button>
				))}
			</div>

			{/* Botão para ir para a próxima pergunta */}
			{isAnswered && (
				<button
					className="bg-green-400 p-4 w-full text-white text-2xl"
					onClick={goToNextQuestion}
				>
					Próxima Pergunta
				</button>
			)}

			{/* Modal de confirmação */}
			{showModal && (
				<div
					className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-5 border-solid border-[1px] border-[#ccc] rounded-xl shadow-xl"
				>
					<h3 className="font-semibold">Você tem certeza que quer sair?</h3>
					<div className="flex justify-center">
						<button
							onClick={confirmExit}
							className="mr-4 bg-green-800 w-full h-auto"
						>
							Sim
						</button>
						<button onClick={closeModal} className="bg-red-800 w-full h-auto">
							Não
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default QuizScreen;
