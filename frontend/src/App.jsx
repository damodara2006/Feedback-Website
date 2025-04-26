import {BrowserRouter, Routes , Route, } from "react-router-dom"
import Home from "./Home"
import Admin from "./Admin"
import FormView from "./FormView"
function App() {
  return(
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/form" element={<FormView/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
