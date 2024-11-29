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
		localStorage.getItem("avatar") || "https://via.placeholder.com/150";

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
			{/* Exibe o avatar e nome do usuário */}
			<div>
				<img
					src={userAvatar}
					alt="Avatar do usuário"
					style={{ width: "150px", height: "150px" }}
				/>
				<p>{userName}</p>
			</div>

			{/* Barra de Progresso */}
			<progress
				value={progress}
				max="100"
				className="w-full h-3 bg-gray-200 rounded-lg mb-5"
			></progress>

			<h2>{shuffledQuestions[currentQuestion]?.question}</h2>

			<div>
				{shuffledQuestions[currentQuestion]?.options.map((option, index) => (
					<button
						key={index}
						onClick={() => handleAnswerSelect(option)}
						disabled={isAnswered}
						style={{
							padding: "10px 20px",
							margin: "5px",
							border: "1px solid blue",
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

			{/* Feedback após a resposta */}
			{isAnswered && <p>{feedback}</p>}

			{/* Botão para ir para a próxima pergunta */}
			{isAnswered && (
				<button onClick={goToNextQuestion}>Próxima Pergunta</button>
			)}

			{/* Botão de Sair */}
			<button onClick={handleExitQuiz} style={{ marginTop: "10px" }}>
				Sair
			</button>

			{/* Modal de confirmação */}
			{showModal && (
				<div
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "white",
						padding: "20px",
						border: "1px solid #ccc",
						borderRadius: "10px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
					}}
				>
					<h3>Você tem certeza que quer sair?</h3>
					<div>
						<button onClick={confirmExit} style={{ marginRight: "10px" }}>
							Sim
						</button>
						<button onClick={closeModal}>Não</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default QuizScreen;
