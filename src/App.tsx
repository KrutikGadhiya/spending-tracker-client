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
  return <h1 className="text-2xl">{title}</h1>;
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
          <Route index element={<Dummy title="Home" />} />
          <Route path="transactions" element={<Dummy title="Transactions" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
