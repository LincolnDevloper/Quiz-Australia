// src/components/HomeScreen.jsx
import { Link } from "react-router-dom"; // Usando o Link do React Router para navegação
import kangoroo from "../assets/images/Kango_holding_a_flag-removebg.png";
import ponte from "../assets/images/sydneybridge.jpg";

const HomeScreen = () => {
	return (
		<div
			style={{ backgroundImage: `url(${ponte})` }}
			className="bg-cover bg-fixed w-full h-screen overflow-hidden font-poppins flex flex-col justify-around"
		>
			<div className="absolute inset-0 bg-[#083763]/40"></div>

			<div className=" z-10 text-white text-center">
				<h1 className="text-2xl font-semibold">2º Ano L</h1>
				<p className="text-xl font-normal tracking-[5px]">Apresenta</p>
			</div>

			<div className="relative flex flex-col items-center">
				<div className="text-white flex text-center pb-4">
					<img
						className="w-[110px] h-[117.64px] absolute transform -translate-y-[38px]"
						src={kangoroo}
						alt="Canguru"
					/>
					<h4 className="text-5xl flex-col items-center justify-center">
						Quiz da
						<h4 className="font-semibold text-7xl flex items-center">
							Austrália
						</h4>
					</h4>
				</div>
				<Link to="/setup">
					<button className="text-1xl px-20 py-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-500">
						Iniciar
					</button>
				</Link>
			</div>

			<div className="z-10 text-white text-center">
				<h1 className="text-2xl font-medium mb-2">CEMEIT - 2024</h1>
				<Link to="/credits">
					<button className="bg-blue-600 hover:bg-blue-500 p-3 rounded-xl">Creditos</button>
				</Link>
			</div>
		</div>
	);
};

export default HomeScreen;
