import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"
import AllUsers from "../pages/AllUsers"
import Favourites from "../pages/Favourites"
import FlatView from "../pages/FlatView"
import Login from "../pages/Login"
import Register from "../pages/Register"
import MyFlats from "../pages/MyFlats"
import NewFlat from "../pages/NewFlat"
import Profile from "../pages/Profile"
import ResetPassword from '../pages/ResetPassword'
import Navbar from "../components/Navbar"
import NavMobile from "../components/NavMobile"
import Footer from "../components/Footer"




const AppRouter = () => {
  const routes = [
  {name: <Homepage/>, path:'/'},
  {name: <AllUsers/>, path:'/allusers'},
  {name: <Favourites/>, path:'/favourites'},
  {name: <FlatView/>, path:'/flat-view/:flatId'},
  {name: <Login/>, path:'/login'},
  {name: <Register/>, path:'/register'},
  {name: <MyFlats/>, path:'/my-flats'},
  {name: <NewFlat/>, path:'/new-flat'},
  {name: <Profile/>, path: '/profile/:uid'},
  {name: <ResetPassword/>, path:'/reset-password'}

]


  return (
   <BrowserRouter>
   <NavMobile/>
   <Navbar/>
   <Routes>
    {routes.map(({name, path})=> (<Route key={path} path={path} element={name} />))}
   </Routes>
   <Footer/>
   
   
   </BrowserRouter>
  )
}

export default AppRouter