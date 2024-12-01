// src/components/QuizScreen.jsx
import { useState, useEffect } from "react";
import questoes from "../utils/questions"; // Importa as perguntas de utils/questions.js
import { logEvent, analytics } from "../firebase"; // Importando logEvent

// Função para embaralhar as questões
const embaralharQuestões = (questões) => {
	for (let i = questões.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[questões[i], questões[j]] = [questões[j], questões[i]]; // Troca os elementos
	}
	return questões;
};

const TelaQuiz = () => {
	const [questaoAtual, setQuestaoAtual] = useState(0);
	const [questaoSelecionada, setQuestaoSelecionada] = useState("");
	const [estaRespondido, setEstaRespondido] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [pontuacao, setPontuacao] = useState(0);
	const [progresso, setProgresso] = useState(0);
	const [mostrarModal, setMostrarModal] = useState(false); // Controle do modal de sair
	const [questoesEmbaralhadas, setQuestoesEmbaralhadas] = useState([]); // Perguntas embaralhadas

	const nomeDoUsuario = localStorage.getItem("userName") || "Usuário";
	const avatarDoUsuario =
		localStorage.getItem("avatar") || "https://via.placeholder.com/avatar";

	useEffect(() => {
		// Embaralha as perguntas sempre que o componente é montado
		setQuestoesEmbaralhadas(embaralharQuestões([...questoes])); // Faz uma cópia das perguntas e embaralha
	}, []);

	useEffect(() => {
		setProgresso(((questaoAtual + 1) / questoesEmbaralhadas.length) * 100); // Atualiza o progresso
	}, [questaoAtual, questoesEmbaralhadas]);

	useEffect(() => {
		// Inicializa a pontuação no localStorage quando o quiz começa
		localStorage.setItem("score", pontuacao);
		localStorage.setItem("questions", JSON.stringify(questoesEmbaralhadas)); // Salva as questões embaralhadas no localStorage
	}, [pontuacao, questoesEmbaralhadas]);

	const selecionarResposta = (resposta) => {
		setQuestaoSelecionada(resposta);
		setEstaRespondido(true);

		if (resposta === questoesEmbaralhadas[questaoAtual].answer) {
			setFeedback("✅ Correto!");
			setPontuacao(pontuacao + 1);

			// Logando evento de resposta correta
			logEvent(analytics, 'responder_questao', {
				questao_id: questaoAtual,
				correta: true,
			  });
		} else {
			setFeedback("❌ Errado!");

			 // Logando evento de resposta errada
			 logEvent(analytics, 'responder_questao', {
				questao_id: questaoAtual,
				correta: false,
			  });
		}
	};

	const irParaProximaQuestao = () => {
		if (questaoAtual < questoesEmbaralhadas.length - 1) {
			setQuestaoAtual(questaoAtual + 1);
			setQuestaoSelecionada("");
			setEstaRespondido(false);
			setFeedback("");
		} else {
			localStorage.setItem("score", pontuacao);
			window.location.href = "/result"; // Redireciona para a tela de resultado
			
			 // Logando evento de finalização do quiz
			 logEvent(analytics, 'finalizar_quiz', {
				pontuacao: pontuacao,
				total_questoes: questoes.length,
				nome_usuario: nomeDoUsuario,
			  });
		}
	};

	const sairDoQuiz = () => {
		setMostrarModal(true); // Exibe o modal
	};

	const fecharModal = () => {
		setMostrarModal(false); // Fecha o modal
	};

	const confirmarSaida = () => {
		setMostrarModal(false); // Fecha o modal
		window.location.href = "/"; // Redireciona para a tela inicial
	};

	return (
		<div>
			{/* Botão de Sair */}
			<button
				onClick={sairDoQuiz}
				className="text-2xl w-14 h-14 bg-red-700 text-white rounded-br-full"
			>
				<i className="fa-solid fa-arrow-right-from-bracket"></i>
			</button>
			<div className="flex flex-row justify-center h-10">
				{/* Exibe o avatar e nome do usuário */}
				<div className="flex flex-col items-center absolute transform -translate-y-[55px]">
					<img
						className="w-20 h-full rounded-full"
						src={avatarDoUsuario}
						alt="Avatar do usuário"
					/>
					<p className="text-lg font-semibold absolute transform capitalize
					translate-y-[68px] p-1 bg-red-400/50 w-auto h-auto text-center">
						{nomeDoUsuario}
					</p>
				</div>
			</div>
			{/* Barra de Progresso */}
			<progress
				value={progresso}
				max="100"
				className="w-full h-4 relative"
			></progress>

			<h2 className="text-2xl m-4 text-center font-bold text-[#333333]">
				{questoesEmbaralhadas[questaoAtual]?.question}
			</h2>

			{/* Exibe a imagem da pergunta */}
			<img
				src={questoesEmbaralhadas[questaoAtual]?.image}
				alt={`Imagem da pergunta ${questaoAtual + 1}`}
				className="p-4 w-max h-auto rounded-[32px]"
			/>

			{/* Feedback após a resposta */}
			{estaRespondido && (
				<p className="flex justify-center font-semibold">{feedback}</p>
			)}

			<div className="grid grid-cols-2 p-2">
				{questoesEmbaralhadas[questaoAtual]?.options.map((option, index) => (
					<button
						key={index}
						onClick={() => selecionarResposta(option)}
						disabled={estaRespondido}
						className="px-3 py-5 m-1 border-solid border-[1px] border-black rounded "
						style={{
							backgroundColor:
								questaoSelecionada === option
									? option === questoesEmbaralhadas[questaoAtual].answer
										? "green"
										: "red"
									: "white",
							color:
								questaoSelecionada === option
									? option === questoesEmbaralhadas[questaoAtual].answer
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
			{estaRespondido && (
				<button
					className="bg-green-400 p-4 w-full text-white text-2xl"
					onClick={irParaProximaQuestao}
				>
					Próxima Pergunta
				</button>
			)}

			{/* Modal de confirmação */}
			{mostrarModal && (
				<div
					className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-5 border-solid border-[1px] border-[#ccc] rounded-xl shadow-xl"
				>
					<h3 className="text-center font-semibold mb-5">Você tem certeza que quer sair?</h3>
					<div className="flex justify-center">
						<button
							onClick={confirmarSaida}
							className="mr-4 text-white bg-green-800 w-full h-auto rounded"
						>
							Sim
						</button>
						<button onClick={fecharModal} className="bg-red-800 text-white w-full h-auto rounded">
							Não
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default TelaQuiz;
