// src/components/HomeScreen.jsx
import { Link } from "react-router-dom"; // Usando o Link do React Router para navegação

const HomeScreen = () => {
	return (
		<div className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-16">
			<h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4">
				Bem-vindo ao Quiz da Austrália!
			</h1>
			<Link to="/setup">
				<button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
					Começar Quiz
				</button>
			</Link>
		</div>
	);
};

export default HomeScreen;
