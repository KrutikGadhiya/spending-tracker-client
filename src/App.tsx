import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Pages & Components
import { Login, SignUp } from "./pages";
import LoaderScreen from "./components/LoaderScreen";
import { Dashboard, Overview, Transactions } from "./pages/Dashboard";
// Context
import { LoaderContext } from "./context/LoaderContext";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const Dummy = ({ title }: { title: string }) => {
  return <h1 className="text-2xl">{title}</h1>;
};

function App() {
  const { isLoading } = useContext(LoaderContext);

  // useEffect(() => {
  //   toast("Hello World", {
  //     type: "success",
  //     position: "top-center",
  //     theme: "dark",
  //     autoClose: 2000,
  //   });
  // }, []);

  return (
    <div className="App">
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
      <ToastContainer toastClassName="text-gray-900 bg-gray-100 shadow-md drop-shadow-md rounded-lg dark:text-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export default App;
