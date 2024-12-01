// src/components/SetupScreen.jsx
import { useState } from "react"; // Importação do useState para gerenciar o estado local
import { useNavigate } from "react-router-dom"; // Importação do useNavigate para navegação

// Lista de avatares disponíveis
const avatars = [
	{
		id: 1,
		name: "Canguru",
		image:
			"https://img.freepik.com/premium-photo/i-want-beauty-red-eastern-kangaroo-i-need-avatar_943281-55907.jpg",
	},
	{ id: 2, name: "Koala", image: "https://buywallart.ca/cdn/shop/products/240_F_633516157_7esm9acEIKw3VJlWHouLpwk0hzxH4hxW.jpg?v=1700069380" },
	{ id: 3, name: "Emu", image: "https://icons.iconarchive.com/icons/iconarchive/incognito-animal-2/512/Emu-icon.png" },
	{
		id: 4,
		name: "Wombat",
		image: "https://avatars.githubusercontent.com/u/571379?v=4",
	},
	{
		id: 5,
		name: "Tasmanian Tiger",
		image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmAviT_jgOi3wWxQIjBbaZLwj3bCCcSysNZEMSOJPxCM3RmGEXUd98cO1qNAQStTiRpmOHcJdHvt9D3lvwmRlVMiXuQzlb8CTNHZEYqar2QNKlQyiN0YX1PwtlCi9B5cp3TRv2Ow/s2000/THYLACINE-PORTRAIT-02.jpg",
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
			<h2 className="text-2xl text-center font-semibold py-16">Digite seu nome e escolha um avatar</h2>
		<div className="flex justify-center p-4">
			{/* Campo para o usuário digitar seu nome */}
			<input
				type="text"
				placeholder="Digite seu nome"
				value={name}
				onChange={(e) => setName(e.target.value)} // Atualiza o nome conforme o usuário digita
				className="text-xl capitalize border-solid border-black border-[1px] rounded-full p-4"
			/>
		</div>

			{/* Grid de avatares */}
			<div
				className="avatar-grid grid grid-cols-3 gap-3 overflow-x-auto"
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
							className="w-auto h-20 rounded-full"
							style={{
								border:
									selectedAvatar?.id === avatar.id ? "4px solid green" : "none", // Destaca o avatar selecionado
							}}
						/>
						<p>{avatar.name}</p>
					</div>
				))}
			</div>

			{/* Botão para confirmar a escolha e iniciar o quiz */}
			<button className="bg-green-600 w-full h-auto p-4 text-white font-bold text-2xl" onClick={handleStartQuiz}>Confirmar</button>
		</div>
	);
};

export default SetupScreen;
