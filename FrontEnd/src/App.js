import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";


import Home from './Pages/Home'
import Login from './Components/Logreg/Login'
import Register from './Components/Logreg/Register'
import Userupcomingevents from './Pages/Userupcomingevents'
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Components/Logreg/ContactUs";




const queryClient = new QueryClient()
function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path ="/aboutUs" element ={<AboutUs/>}></Route>
          <Route path="/upcomingevents" element={<Userupcomingevents />} />
          <Route path="/contactUs" element={<ContactUs/>}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
