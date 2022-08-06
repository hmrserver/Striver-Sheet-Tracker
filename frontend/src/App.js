import "./App.css";
import Hero from "./Hero";
import Stats from "./Routes/Stats";
import Day from "./pages/Day";
import Header from "./components/Header";
import { ApiContextProvider } from "./contexts/ApiContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <ApiContextProvider>
      <Router>
        <div class="min-h-screen text-white bg-slate-900">
          <Header />
          <div class="sm:container md:mx-auto px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
            <Routes>
              <Route exact path="/login" element={<Hero />} />
              <Route exact path="/" element={<Stats />} />
              <Route path="/stats/:id" element={<Day />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApiContextProvider>
  );
}

export default App;
