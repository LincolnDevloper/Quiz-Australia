// src/components/HomeScreen.jsx
import { Link } from "react-router-dom"; // Usando o Link do React Router para navegação
import kangoroo from "../assets/images/Kango_holding_a_flag-removebg.png";
import backgroundImage from "../assets/images/sydneybridge.jpg";

const HomeScreen = () => {
	return (
			<div
				style={{ backgroundImage: `url(${backgroundImage})` }}
				className="relative bg-cover w-full h-screen font-poppins flex flex-col justify-center items-center"
			>
				<div className="absolute inset-0 bg-[#083763]/50"></div>

				<div className="flex flex-col z-10 text-white text-center">
					<h1 className="text-2xl font-semibold">2º Ano L</h1>
					<p className="text-xl font-normal tracking-[5px]">Apresenta</p>
				</div>

				<div className="relative flex p-32 flex-col items-center">
					<div className="flex z-10 text-white text-center">
						<h4 className="flex flex-col text-center text-5xl mb-4">
							Quiz da <p className="font-semibold text-7xl">Austrália</p>
						</h4>
						<img
							className="block w-[110px] h-[117.64px] relative left-[-335px] top-[-38px]"
							src={kangoroo}
							alt="Canguru"
						/>
					</div>
					<Link to="/setup">
						<button className="z-10 text-1xl px-20 py-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-500">
							Iniciar
						</button>
					</Link>
				</div>

				<div className="z-10 text-white text-center">
					<h1 className="text-2xl font-medium">CEMEIT - 2024</h1>
					<Link to="/credits">
						<button className="bg-blue-600 p-3 m-3 rounded-xl">Creditos</button>
					</Link>
				</div>
			</div>
	);
};

export default HomeScreen;
