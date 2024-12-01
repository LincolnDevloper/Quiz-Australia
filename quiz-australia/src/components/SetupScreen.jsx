// src/components/SetupScreen.jsx
import { useState } from "react"; // Importação do useState para gerenciar o estado local
import { useNavigate } from "react-router-dom"; // Importação do useNavigate para navegação
import { ref, set } from "firebase/database";
import { generateUniqueId } from "../utils/uniqueId";
import { logEvent, analytics, database } from "../firebase"; // Importando logEvent

// Lista de avatares disponíveis
const avatars = [
	{
		id: 1,
		name: "Canguru",
		image:
			"https://img.freepik.com/premium-photo/i-want-beauty-red-eastern-kangaroo-i-need-avatar_943281-55907.jpg",
	},
	{
		id: 2,
		name: "Coala",
		image:
			"https://buywallart.ca/cdn/shop/products/240_F_633516157_7esm9acEIKw3VJlWHouLpwk0hzxH4hxW.jpg?v=1700069380",
	},
	{
		id: 3,
		name: "Emu",
		image:
			"https://icons.iconarchive.com/icons/iconarchive/incognito-animal-2/512/Emu-icon.png",
	},
	{
		id: 4,
		name: "Vombate",
		image: "https://avatars.githubusercontent.com/u/571379?v=4",
	},
	{
		id: 5,
		name: "Tigre da Tasmânia",
		image:
			"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmAviT_jgOi3wWxQIjBbaZLwj3bCCcSysNZEMSOJPxCM3RmGEXUd98cO1qNAQStTiRpmOHcJdHvt9D3lvwmRlVMiXuQzlb8CTNHZEYqar2QNKlQyiN0YX1PwtlCi9B5cp3TRv2Ow/s2000/THYLACINE-PORTRAIT-02.jpg",
	},
	{
		id: 6,
		name: "Quokka",
		image:
			"https://i.pinimg.com/736x/59/ff/13/59ff13db0d3dc9faca473a386801d054.jpg",
	},
];

const SetupScreen = () => {
	const [name, setName] = useState(""); // Nome do usuário
	const [selectedAvatar, setSelectedAvatar] = useState(null); // Avatar selecionado
	const navigate = useNavigate(); // Navegação entre as telas

	const forbiddenWords = [
		// Palavras relacionadas a ditadores, figuras históricas negativas e insultos
		"hitler",
		"stalin",
		"mussolini",
		"franco",
		"mao",
		"polpot",
		"nazi",
		"fascista",
		"dictador",

		// Termos relacionados a violência e assassinato
		"assassino",
		"matar",
		"morte",
		"mortea",
		"mutilação",
		"sangue",
		"faca",
		"facada",
		"cortar",

		// Palavras 18+ e termos sexuais explícitos
		"sexo",
		"buceta",
		"xereca",
		"peitos",
		"pussy",
		"cum",
		"mia khalifa",
		"xvideos",
		"porn",
		"porno",
		"pornogay",
		"bunda",
		"cock",
		"pênis",
		"furry",
		"pelada",
		"pelado",
		"genital",
		"penis",
		"vagina",
		"clitóris",
		"pornografia",
		"adulto",
		"masturbação",
		"fetiche",
		"safado",
		"punição sexual",
		"xvidros",

		// Palavras que denotam agressão ou insultos
		"merda",
		"porra",
		"caralho",
		"bosta",
		"vaca",
		"imbecil",
		"idiota",
		"burro",
		"mermão",
		"buceta",
		"cacete",
		"puta",
		"foda-se",
		"desgraçado",
		"fodasse",
		"foda",
		"fudido",

		// Insultos racistas
		"preto",
		"negro",
		"nigger",
		"macaco",
		"escravo",
		"monstro",
		"negrada",
		"cabelo ruim",
		"zumbi",
		"pardo",
		"mulato",

		// Insultos homofóbicos
		"viado",
		"viadinho",
		"bicha",
		"boiola",
		"sapatão",
		"lésbica",
		"gayzinho",
		"bichona",
		"fresco",
		"sapatão",
		"traveco",

		// Insultos relacionados à religião e crenças
		"satanás",
		"diabo",
		"porra de deus",
		"cristão lixo",
		"ateu",
		"fundamentalista",
		"herege",

		// Termos associados a drogas e substâncias ilícitas
		"crack",
		"cocaína",
		"maconha",
		"ecstasy",
		"heroína",
		"drogado",
		"viciado",
		"skank",
		"traficante",
		"157",
		"cria",

		// Termos violentos ou de incitação ao ódio
		"assalto",
		"roubo",
		"explosivo",
		"terrorismo",
		"bomba",
		"tiroteio",
		"golpe",

		// Termos homofóbicos e racistas (associados a grupos de ódio)
		"kike",
		"chink",
		"spic",
		"wop",
		"gook",
		"gipsy",
		"kafir",
		"abomination",
		"hate",
		"towelhead",
		"macaca",
		"monkey",

		// Outros insultos e palavras provocativas
		"cabeludão",
		"piranha",
		"porra",
		"fudeu",
		"sem futuro",
		"vagabundo",
		"feia",
		"bastarda",
		"imbecil",
		"escória",
		"aborto",
		"covarde",
		"lixo",
		"burra",
		"ferrado",
		"vagabunda",
		"arrombado",
		"cagalhão",
		"otário",

		// Palavras relacionadas a crimes e atividades ilícitas
		"sequestro",
		"extorsão",
		"fraude",
		"crime",
		"bandido",
		"estuprador",
		"traficante",
		"assaltante",
		"comando vermelho",
		"CV",
		"cv",

		// Palavras que incitam violência ou suicídio
		"suicídio",
		"auto-mutilação",
		"matar-se",
		"enforcar-se",
		"cortar-se",
		"corte",
		"sangramento",
		"faca no pescoço",
		"tirar a própria vida",

		// Termos pejorativos e de bullying
		"feio",
		"gordo",
		"magrela",
		"besta",
		"mentiroso",
		"fraquinho",
		"burro",
		"sem noção",
		"pobre",
		"rico",
		"mendigo",
		"bichado",

		// Outras palavras provocativas e racistas
		"alien",
		"abduzido",
		"boca suja",
		"desgraçado",
		"bêbado",
		"quebrado",
		"falido",
	];

	const isNameValid = (name) => {
		return !forbiddenWords.some((word) => name.toLowerCase().includes(word));
	};

	// Função para iniciar o quiz
	const handleStartQuiz = () => {
		if (!isNameValid(name)) {
			alert("Por favor, insira um nome válido sem palavras proibidas.");
			return;
		}

		if (name && selectedAvatar) {
			// Se o nome for novo, gera um novo ID único
			let userId = localStorage.getItem("uniqueId");

			// Logando o evento de início do quiz
			logEvent(analytics, "start_quiz", {
				user_name: name, // Nome do usuário
			});

			if (!userId || localStorage.getItem("userName") !== name) {
				// Se não houver ID ou o nome mudou, gera um novo ID
				userId = generateUniqueId();
				localStorage.setItem("uniqueId", userId); // Salva o novo ID no localStorage
			}

			localStorage.setItem("userName", name);
			localStorage.setItem("avatar", selectedAvatar.image);

			// Salva os dados no Firebase
			set(ref(database, `users/${userId}`), {
				name: name,
				id: userId,
				avatar: selectedAvatar.image,
			});

			navigate("/quiz"); // Redireciona para a tela de quiz
		} else {
			alert("Por favor, insira seu nome e escolha um avatar.");
		}
	};

	return (
		<div>
			<h2 className="text-2xl text-center font-semibold py-16">
				Digite seu nome e escolha um avatar
			</h2>
			<div className="flex justify-center p-4">
				{/* Campo para o usuário digitar seu nome */}
				<input
					type="text"
					placeholder="Digite seu nome"
					value={name}
					onChange={(e) => {
						const nome = e.target.value;

						// Verifica se contém números
						if (/[^a-zA-Z\s]/.test(nome)) {
							alert("O nome não pode conter números ou caracteres especiais.");
							return;
						}

						setName(nome);
					}} // Atualiza o nome conforme o usuário digita
					className="text-xl capitalize border-solid border-black border-[1px] rounded-full p-4"
					maxLength="30" // Limita a 25 caracteres
					onBlur={() => {
						if (name.length > 30) {
							alert("O nome deve ter no máximo 30 caracteres.");
							setName(name.slice(0, 30)); // Trunca o nome para 25 caracteres
						}
					}}
				/>
			</div>

			{/* Grid de avatares */}
			<div className="avatar-grid grid grid-cols-3 gap-3 overflow-x-auto">
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
			<button
				className="bg-green-600 w-full h-auto p-4 text-white font-bold text-2xl"
				onClick={handleStartQuiz}
			>
				Confirmar
			</button>
		</div>
	);
};

export default SetupScreen;
