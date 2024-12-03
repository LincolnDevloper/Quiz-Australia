// src/components/AdminPage.jsx
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const AdminPage = () => {
	const [users, setUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);

	useEffect(() => {
		const dbRef = ref(database, "users");

		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const usersList = Object.entries(data).map(([key, value]) => ({
					key,
					...value,
				}));

				// Atualiza a lista de usuários e o total de usuários
				setUsers(usersList);
				setTotalUsers(usersList.length);
			}
		});
	}, []);

	// Função para determinar o status do usuário
	const getUserStatus = (user) => {
		// Aqui pegamos o status que foi atualizado no Firebase
		return user.status || "Não Aprovado";
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
				Administração - Lista de Usuários
			</h1>

			{/* Exibe o número total de usuários */}
			<div className="mb-4 text-center">
				<span>Total de usuários: {totalUsers}</span>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
					<thead>
						<tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Nome</th>
							<th className="py-3 px-6 text-left">ID</th>
							<th className="py-3 px-6 text-left">Avatar</th>
							<th className="py-3 px-6 text-left">Status</th>{" "}
							{/* Coluna de Status */}
							<th className="py-3 px-6 text-left">Ações</th>
						</tr>
					</thead>
					<tbody className="text-gray-700 text-sm">
						{users.map((user, index) => (
							<tr
								key={user.key}
								className={`border-b border-gray-200 hover:bg-gray-100 ${
									index % 2 === 0 ? "bg-gray-50" : "bg-white"
								}`}
							>
								{/* Nome do Usuário */}
								<td
									className={`py-3 px-6 text-left ${
										user.checked
											? "line-through text-gray-400"
											: "text-gray-700"
									}`}
								>
									{user.name}
								</td>

								{/* ID */}
								<td className="py-3 px-6 text-left text-sm">{user.id}</td>

								{/* Avatar */}
								<td className="py-3 px-6">
									<div className="flex items-center">
										<img
											src={user.avatar || "https://via.placeholder.com/150"}
											alt={user.name}
											className="w-12 h-12 rounded-full mr-4"
										/>
										<span>{user.avatar ? "Com Avatar" : "Sem Avatar"}</span>
									</div>
								</td>

								{/* Status */}
								<td className="py-3 px-6 text-left">
									<span>{getUserStatus(user)}</span>
								</td>

								{/* Botões de Ação */}
								<td className="py-3 px-6 text-left">
									<button className="px-4 py-2 rounded-md font-semibold bg-green-500 text-white">
										Marcar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminPage;
