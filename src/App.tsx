import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

// Pages & Components
import { Login, SignUp } from "./pages";
import LoaderScreen from "./components/LoaderScreen";
import { Dashboard, Overview, Transactions } from "./pages/Dashboard";
// Context
import { LoaderContext } from "./context/LoaderContext";
import { ToggleDarkMode } from "./context/ToggleDarkMode";

import "./App.css";

const Dummy = ({ title }: { title: string }) => {
  return <h1 className="text-2xl">{title}</h1>;
};

function App() {
  const { isLoading } = useContext(LoaderContext);
  const { darkMode } = useContext(ToggleDarkMode);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      {isLoading && <LoaderScreen />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="groups" element={<Dummy title="Groups" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
