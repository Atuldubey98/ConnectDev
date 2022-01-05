import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication';
import {AuthProvider} from './context/AuthContext';
import Posts from './pages/Posts';
import ProtectedRoute from './context/ProtectedRoute';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
            <Route path="/" element={ <ProtectedRoute><Posts/></ProtectedRoute>}/>
            <Route path="/login" element={<Authentication/>}/>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
