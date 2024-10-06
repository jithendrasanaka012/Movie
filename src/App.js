import { BrowserRouter,Route,Routes } from "react-router-dom";
import Bs from "./Component.jsx/Bs";
import Particularmovie from "./pages/Particularmovie";
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Bs/>}/>
        <Route path='/movieDetails' element={<Particularmovie/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
