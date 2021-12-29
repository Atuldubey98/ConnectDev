import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DashBoared from './pages/DashBoared';
import PrivateRoute from './pages/PrivateRoute';
import SignInSide from './pages/SignInSide';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                    <DashBoared/>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<SignInSide/>} />
        </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;
