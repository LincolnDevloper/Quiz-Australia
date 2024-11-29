// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import SetupScreen from "./components/SetupScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import CreditsPage from "./components/CreditsPage";

const App = () => {
  return (
    <Router> {/* Certificando-se de que o Router está envolto em toda a aplicação */}
      <Routes>
        <Route path="/" element={<HomeScreen />} /> {/* Tela inicial */}
        <Route path="/setup" element={<SetupScreen />} /> {/* Tela de setup */}
        <Route path="/quiz" element={<QuizScreen />} /> {/* Tela do quiz */}
        <Route path="/result" element={<ResultScreen />} /> {/* Tela de resultados */}
        <Route path="/credits" element={<CreditsPage />} /> {/* Tela de resultados */}
      </Routes>
    </Router>
  );
};

export default App;
