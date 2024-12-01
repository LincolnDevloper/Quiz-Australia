// src/utils.js
export const generateUniqueId = () => {
	return Array(5)
	.fill(0)
	.map(() => Math.random().toString(36).charAt(2))
	.join(""); // Gera um ID único curto de 10 caracteres
  };
