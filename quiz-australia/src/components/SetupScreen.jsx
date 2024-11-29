// src/components/SetupScreen.jsx
import { useState } from "react"; // Importação do useState para gerenciar o estado local
import { useNavigate } from "react-router-dom"; // Importação do useNavigate para navegação

// Lista de avatares disponíveis
const avatars = [
	{
		id: 1,
		name: "Canguru",
		image: "https://via.placeholder.com/150?text=Canguru",
	},
	{ id: 2, name: "Koala", image: "https://via.placeholder.com/150?text=Koala" },
	{ id: 3, name: "Emu", image: "https://via.placeholder.com/150?text=Emu" },
	{
		id: 4,
		name: "Wallaby",
		image: "https://via.placeholder.com/150?text=Wallaby",
	},
	{
		id: 5,
		name: "Tasmanian Tiger",
		image: "https://via.placeholder.com/150?text=Tasmanian+Tiger",
	},
];

const SetupScreen = () => {
	const [name, setName] = useState(""); // Nome do usuário
	const [selectedAvatar, setSelectedAvatar] = useState(null); // Avatar selecionado
	const navigate = useNavigate(); // Navegação entre as telas

	// Função para iniciar o quiz
	const handleStartQuiz = () => {
		if (name && selectedAvatar) {
			// Salva nome e avatar no localStorage
			localStorage.setItem("userName", name);
			localStorage.setItem("avatar", selectedAvatar.image);
			navigate("/quiz"); // Redireciona para a tela de quiz
		} else {
			alert("Por favor, insira seu nome e escolha um avatar.");
		}
	};

	return (
		<div>
			<h2>Digite seu nome e escolha um avatar</h2>

			{/* Campo para o usuário digitar seu nome */}
			<input
				type="text"
				placeholder="Digite seu nome"
				value={name}
				onChange={(e) => setName(e.target.value)} // Atualiza o nome conforme o usuário digita
			/>

			{/* Grid de avatares */}
			<div
				className="avatar-grid"
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: "10px",
					overflowX: "auto",
				}}
			>
				{avatars.map((avatar) => (
					<div
						key={avatar.id}
						onClick={() => setSelectedAvatar(avatar)} // Atualiza o avatar selecionado ao clicar
						style={{ cursor: "pointer", margin: "10px" }}
					>
						{/* Exibe a imagem do avatar */}
						<img
							src={avatar.image}
							alt={avatar.name}
							style={{
								width: "150px",
								height: "150px",
								border:
									selectedAvatar?.id === avatar.id ? "3px solid blue" : "none", // Destaca o avatar selecionado
								borderRadius: "10px",
							}}
						/>
						<p>{avatar.name}</p>
					</div>
				))}
			</div>

			{/* Botão para confirmar a escolha e iniciar o quiz */}
			<button onClick={handleStartQuiz}>Confirmar</button>
		</div>
	);
};

export default SetupScreen;
