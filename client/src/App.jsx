import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './SignUp';
import Login from './Login';
import RoomId from './RoomId';


function App() {
 
  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/room/:roomId' element={<RoomId />} />

      </Routes>
      </BrowserRouter>
    </div>

    </>
  );
}

export default App;
