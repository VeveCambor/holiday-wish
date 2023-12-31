import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ChallangePage from './components/ChallangePage';
import ChristmasPage from './components/ChristmasPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChallangePage />} />
        <Route path="/christmas" element={
          <DndProvider backend={HTML5Backend}>
            <ChristmasPage />
          </DndProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;