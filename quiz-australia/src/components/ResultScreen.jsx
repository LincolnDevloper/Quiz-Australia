// src/components/ResultScreen.jsx
import parabens from "../assets/images/tela_final_premio.png";

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
		<div className="bg-[#0E2431] w-full h-screen text-white">
			<div className="flex justify-center">
				<img
					src={parabens}
					alt="Troféu com bandeira da Austrália"
					className="w-[280px] h-auto
					 relative transform translate-x-[25px]"
				/>
				<img
					src={userAvatar}
					alt="Avatar do usuário"
					className="w-[80px] h-auto rounded-full absolute transform translate-x-[100px] translate-y-[200px]"
				/>
			</div>
			{/* Lógica para exibir a mensagem dependendo do número de acertos */}
			{score === 0 ? (
				<h2 className="text-4xl capitalize font-bold flex justify-center">Tente novamente, {userName}!</h2> // Exibe mensagem personalizada se não acertou nada
			) : (
				<h2 className="text-4xl capitalize font-bold flex justify-center">
					Parabéns, {userName}!
				</h2> // Exibe "Parabéns" se o usuário acertou alguma coisa
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
				<p className="flex justify-center m-4 text-2xl font-semibold">
					Você acertou {score} {score === 1 ? "pergunta" : "perguntas"}!{" "}
					{/* Correção de pluralidade */}
				</p> // Exibe o número de perguntas acertadas
			)}
			<div className="flex flex-col justify-center">
			{/* Botão para tentar novamente */}
			<button className="bg-[#33B249] text-2xl p-3 w-[250px] rounded-full cursor-pointer" onClick={restartQuiz}>Tentar Novamente</button>

			{/* Link para Google Forms */}
			<p>Conte para nós o que você achou clicando neste botão</p>
			<a
				href="https://forms.gle/YOUR_GOOGLE_FORM_LINK"
				target="_blank"
				rel="noopener noreferrer"
			>
				<button className="bg-[#33B249] text-2xl p-3 rounded-full cursor-pointer">Formulário</button>
			</a>
			</div>
		</div>
	);
};

export default ResultScreen;
