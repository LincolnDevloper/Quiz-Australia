// src/components/CreditsPage.jsx
import { Link } from "react-router-dom";
const CreditsPage = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 className="text-2xl font-bold m-4">Créditos:</h1>
      <p className="m-4 text-justify">Este projeto do <a className="text-blue-500 hover:text-blue-400" href="/">Quiz da Austrália©</a> foi possível graças aos meus colegas de sala do organizadores do país da Austrália para a feira de ciências - CEMEIT(2024):</p>
      <br />
      <ul>
        <li><b>Bianca (sobrenome se quiser):</b> <br /> Organizadora Principal do 2º ano L</li>
        <li><b>Kamilly (sobrenome se quiser):</b> <br />Organizadora Principal do 2º ano L</li>
        <li><b>Adicione pessoas se vocês quiserem (entrar em contato comigo):</b> <br />O papel do encarregado</li>
        <li><b>Adicione pessoas se vocês quiserem (entrar em contato comigo):</b> <br />O papel do encarregado</li>
        <li><b>Adicione pessoas se vocês quiserem (entrar em contato comigo):</b> <br />O papel do encarregado</li>
        {/* Criador do Aplicativo e sim, esse sou eu kkkk */}<br />
        <li><b><i className="text-red-900">Lincoln</i> Soares</b> - Desenvolvedor & Designer do App</li>
      </ul>
      <br />
      <p>Obrigado por jogar e nos apoiar na Feira de Ciências!</p>
      <br />

      <Link to="/">
				<button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
					Voltar
				</button>
			</Link>
    </div>
  );
};

export default CreditsPage;
