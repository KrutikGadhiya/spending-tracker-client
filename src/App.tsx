import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

// Pages & Components
import { Login, SignUp } from "./pages";
import LoaderScreen from "./components/LoaderScreen";
import Dashboard from "./pages/Dashboard/Home";
// Context
import { LoaderContext } from "./context/LoaderContext";

import "./App.css";

const Dummy = ({ title }: { title: string }) => {
  return (
    <div className="h-screen bg-gray-200">
      <h1 className="tet-6xl">{title}</h1>
    </div>
  );
};

function App() {
  const { isLoading } = useContext(LoaderContext);

  return (
    <div className="App">
      {isLoading && <LoaderScreen />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="transactions" element={<Dummy title="Transactions" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
