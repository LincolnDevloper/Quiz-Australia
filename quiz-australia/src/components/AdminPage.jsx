import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "../firebase";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dbRef = ref(database, "users");

    // Recupera os dados do Firebase
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersList = Object.entries(data).map(([key, value]) => ({
          key, // Chave única do Firebase
          ...value,
        }));
        setUsers(usersList);
      }
    });
  }, []);

  // Função para alternar o estado de `checked`
  const toggleCheck = (userKey, currentStatus) => {
    const userRef = ref(database, `users/${userKey}`);
    update(userRef, { checked: !currentStatus }); // Atualiza o status no Firebase
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Administração - Lista de Usuários</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nome</th>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Avatar</th>
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
                    user.checked ? "line-through text-gray-400" : "text-gray-700"
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

                {/* Botões de Ação */}
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => toggleCheck(user.key, user.checked)}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                      user.checked
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {user.checked ? "Desmarcar" : "Check"}
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
