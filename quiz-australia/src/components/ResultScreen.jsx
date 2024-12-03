// src/components/ResultScreen.jsx
import { useEffect } from "react";
import parabens from "../assets/images/tela_final_premio.png";
import { ref, update } from "firebase/database"; // Importando o Firebase
import { database } from "../firebase"; // Importando o banco de dados

const TelaResultado = () => {
	const pontuacao = parseInt(localStorage.getItem("score")) || 0; // Obtém a pontuação
	const nomeDoUsuario = localStorage.getItem("userName") || "Usuário";
	const avatarDoUsuario = localStorage.getItem("avatar") || "https://via.placeholder.com/150";
	const idUnico = localStorage.getItem("uniqueId"); // ID único do usuário

	// Função para atualizar o status no Firebase
	const atualizarStatusNoFirebase = (idUnico, pontuacao) => {
		const userRef = ref(database, 'users/' + idUnico); // Referência do usuário no Firebase
		update(userRef, {
			status: pontuacao >= 8 ? "Aprovado" : "Não aprovado"
		});
	};

	// Atualizar o status assim que a tela for carregada
	useEffect(() => {
		if (idUnico) {
			atualizarStatusNoFirebase(idUnico, pontuacao); // Atualiza o status no Firebase
		}
	}, [pontuacao, idUnico]);

	// Função para reiniciar o quiz
	const reiniciarQuiz = () => {
		// Limpa a pontuação e as questões no localStorage
		localStorage.removeItem("score");
		localStorage.removeItem("currentQuestion");

		// Redireciona para o quiz
		window.location.href = "/quiz"; // Reinicia o quiz
	};

	return (
		<div className="bg-[#0E2431] w-full h-[122vh] text-white">
			<div className="flex justify-center p-6">
				<img
					src={parabens}
					alt="Troféu com bandeira da Austrália"
					className="w-[280px] h-auto sm:w-[200px] sm:h-auto relative transform translate-x-[25px]"
				/>
				<img
					src={avatarDoUsuario}
					alt="Avatar do usuário"
					className="w-[80px] h-auto rounded-full absolute transform translate-x-[100px] translate-y-[200px] sm:w-[60px] sm:h-[60px]"
				/>
			</div>

			{/* Lógica para exibir a mensagem dependendo do número de acertos */}
			{pontuacao === 0 ? (
				<h2 className="text-4xl capitalize font-bold text-center sm:text-3xl p-3">
					Tente novamente, {nomeDoUsuario}!
				</h2>
			) : (
				<h2 className="text-4xl capitalize font-bold text-center sm:text-3xl p-3">
					Parabéns, {nomeDoUsuario}!
				</h2>
			)}

			{/* Verificação de gabaritar e mensagens motivacionais */}
			{pontuacao >= 8 ? (
				<div className="p-4 w-auto h-30 flex flex-col bg-lime-700 sm:w-full sm:p-4 rounded-lg">
					<p className="text-xl capitalize font-bold">{`Você acertou ${pontuacao} ${pontuacao === 1 ? "questão" : "questões"}!`}</p>
					<div>
						<p>
							Seu <b>ID</b> para resgatar o prêmio:{" "}
							<strong className="uppercase">{idUnico}</strong>
						</p>
					</div>
					<p className="text-justify">
						Venha receber a sua <b>Lembrancinha</b> na banca do <b>2ºL</b>! 🎉
					</p>
					<p className="">
						<i className="fa-solid fa-triangle-exclamation text-yellow-500 text-xl"></i> Este é o seu comprovante para resgatar o seu prêmio, mostre na banca para resgatar
					</p>
				</div>
			) : pontuacao === 0 ? (
				<>
					<p className="text-justify mx-10 text-lg sm:text-md my-3">
						NÃO <b className="bg-amber-400/40 px-1">Desista!!!</b> <br />
						Por favor, eu te peço que <b className="underline">tente novamente!!</b>
					</p>
					<p className="text-center text-lg py-4">
						(Continue tentando para ganhar um prêmio! você precisa acertar no mínimo <i className="mx-1 px-1 py-1 font-bold bg-green-700 rounded">8</i> questões)
					</p>
				</>
			) : (
				<>
					<p className="flex justify-center m-4 text-2xl font-semibold sm:text-lg">
						Você acertou{" "}
						<i className="mx-1 px-1 bg-green-700 rounded transform -rotate-[15deg]">
							{pontuacao}
						</i>
						{pontuacao === 1 ? "pergunta" : "perguntas"}!{" "}
					</p>
					<p className="text-center text-lg py-4">
						(Continue tentando para ganhar um prêmio! você precisa acertar no mínimo <i className="mx-1 px-1 py-1 font-bold bg-green-700 rounded">8</i> questões)
					</p>
				</>
			)}

			<div className="flex justify-center">
				<button
					className="bg-[#33B249] text-2xl p-4 w-[250px] rounded-full cursor-pointer sm:w-full"
					onClick={reiniciarQuiz}
				>
					Tentar Novamente
				</button>
			</div>

			{/* Link para Google Forms */}
			<p className="mx-10 p-3 mt-5 text-center text-lg sm:text-sm">
				Conte para nós o que você achou do nosso projeto clicando aqui:
			</p>
			<a
				href="https://forms.gle/4QxoguNqrh6BTU1h8"
				target="_blank"
				rel="noopener noreferrer"
				className="flex justify-center"
			>
				<button className="bg-[#33B249] text-2xl p-4 w-[250px] rounded-full cursor-pointer sm:w-full">
					Formulário
				</button>
			</a>
		</div>
	);
};

export default TelaResultado;
