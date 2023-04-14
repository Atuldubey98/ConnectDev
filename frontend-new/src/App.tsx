import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./feature/loginpage";
import Header from "./feature/components/Header";
function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
