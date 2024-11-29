// src/components/ResultScreen.jsx

const ResultScreen = () => {
	const score = parseInt(localStorage.getItem("score")) || 0; // Obtém a pontuação do localStorage e força a conversão para número
	const questions = JSON.parse(localStorage.getItem("questions")) || []; // Obtém as perguntas do localStorage
	const totalQuestions = questions.length; // Número total de perguntas
	const userName = localStorage.getItem("userName") || "Usuário";
	const userAvatar =
		localStorage.getItem("avatar") || "https://via.placeholder.com/150";

	// Função para reiniciar o quiz
	const restartQuiz = () => {
		// Limpa a pontuação e as questões no localStorage
		localStorage.removeItem("score");
		localStorage.removeItem("currentQuestion");

		// Redireciona para o quiz
		window.location.href = "/quiz"; // Reinicia o quiz
	};

	return (
		<div>
			{/* Lógica para exibir a mensagem dependendo do número de acertos */}
			{score === 0 ? (
				<h2>Tente novamente, {userName}!</h2> // Exibe mensagem personalizada se não acertou nada
			) : (
				<h2>Parabéns, {userName}!</h2> // Exibe "Parabéns" se o usuário acertou alguma coisa
			)}

			{/* Verificação de gabaritar e mensagens motivacionais */}
			{score === totalQuestions ? (
				<div>
					<p>Parabéns, você gabaritou o quiz!</p>{" "}
					{/* Mensagem para quem gabaritou */}
					<p>Venha receber sua lembrancinha na feira de ciências! 🎉</p>{" "}
					{/* Mensagem sobre o prêmio */}
				</div>
			) : score === 0 ? (
				<p>NÃO Desista!!! Por favor, eu te peço que tente de novo!!</p> // Exibe se o usuário acertou 0 perguntas
			) : (
				<p>
					Você acertou {score} {score === 1 ? "pergunta" : "perguntas"}!{" "}
					{/* Correção de pluralidade */}
				</p> // Exibe o número de perguntas acertadas
			)}

			<div>
				<img
					src={userAvatar}
					alt="Avatar do usuário"
					style={{ width: "150px", height: "150px" }}
				/>
				<p>{userName}</p>
			</div>

			{/* Botão para tentar novamente */}
			<button onClick={restartQuiz}>Tentar Novamente</button>

			{/* Link para Google Forms */}
			<a
				href="https://forms.gle/YOUR_GOOGLE_FORM_LINK"
				target="_blank"
				rel="noopener noreferrer"
			>
				<button>Conte para nós o que você achou clicando neste botão</button>
			</a>
		</div>
	);
};

export default ResultScreen;
