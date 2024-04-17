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
import ProfileUpdate from "../pages/ProfileUpdate"




const AppRouter = () => {
const routes = [
  {name: <Homepage/>, path:'/'},
  {name: <AllUsers/>, path:'/allusers'},
  {name: <Favourites/>, path:'/favourites'},
  {name: <FlatView/>, path:'/flat-view'},
  {name: <Login/>, path:'/login'},
  {name: <Register/>, path:'/register'},
  {name: <MyFlats/>, path:'/my-flats'},
  {name: <NewFlat/>, path:'/new-flat'},
  {name: <Profile/>, path:'/profile'},
  {name: <ProfileUpdate/>, path:'/profile-update'}
]


  return (
   <BrowserRouter>
   <Routes>
    {routes.map(({name, path})=> (<Route path={path} element={name} />))}
    
   </Routes>
   
   
   </BrowserRouter>
  )
}

export default AppRouter