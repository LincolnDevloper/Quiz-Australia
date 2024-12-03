// src/components/CreditsPage.jsx
import { Link } from "react-router-dom";

const CreditsPage = () => {
	return (
		<div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center py-8 px-4">
			<div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
				{/* Título da página */}
				<h1 className="text-3xl font-extrabold text-center text-blue-600">
					Créditos
				</h1>

				{/* Introdução */}
				<p className="text-lg text-gray-700 text-center">
					Este projeto do{" "}
					<a className="text-blue-500 hover:text-blue-400" href="/">
						Quiz da Austrália©
					</a>{" "}
					foi possível graças aos meus colegas de sala e aos organizadores do
					país da Austrália para a feira de ciências - CEMEIT(2024):
				</p>

				{/* Lista de créditos */}
				<ul className="space-y-4 text-left text-lg text-gray-800">
					<li>
						<b>Bianca:</b> <br /> Organizadora Principal do 2º ano L
					</li>
					<li>
						<b>Kamilly:</b> <br /> Organizadora Principal do 2º ano L
					</li>
					<li>
						<b>E todos os queridos alunos da turma do 2º Ano L | 2024</b> <br />{" "}
						Que fez as apresentações e ajudou em tudo na Feira para que tudo
						isso fosse possível ❤
					</li>
					{/* Criador do aplicativo */}
					<li>
						<b>
							<i className="text-red-600">Lincoln</i> Soares
						</b>{" "}
						- Desenvolvedor & Designer do App <br />{" "}
						<div className="flex space-x-4">
							<a
								href="https://github.com/LincolnDevloper/LincolnDevloper"
								target="_blank"
								className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
							>
								<i className="fa-brands fa-github"></i> GitHub
							</a>
							<a
								href="www.linkedin.com/in/lincolndev"
								target="_blank"
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
							>
								<i className="fa-brands fa-linkedin"></i> LinkedIn
							</a>
						</div>
					</li>
				</ul>

				{/* Mensagem de agradecimento */}
				<p className="text-lg text-gray-700 text-center">
					Obrigado por jogar e nos apoiar na Feira de Ciências!
				</p>

				{/* Botão de Voltar */}
				<div className="flex justify-center">
					<Link to="/">
						<button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
							Voltar
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CreditsPage;
