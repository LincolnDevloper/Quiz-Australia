import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import Result from './Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;