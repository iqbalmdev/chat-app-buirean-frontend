import React from 'react'
import  {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Register,Login,Chat,SetAvatar } from '../pages/index'
const Router = () => {
  return (
<BrowserRouter>



<Routes>
    <Route path ='/register' element={<Register/>}/>
    <Route path ='/login' element={<Login/>}/>
    <Route path ='/' element={<Chat/>}/>
    <Route path ='/setAvatar' element={<SetAvatar/>}/>
</Routes>

</BrowserRouter>
  )
}

export default Router