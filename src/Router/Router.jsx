import React, { useState,useEffect } from 'react'
import  {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Register,Login,Chat,SetAvatar } from '../pages/index'
const Router = () => {
  const [user,setUser] = useState(null)
useEffect(() => {

  setUser(localStorage.getItem('chat-app-user'))
}, [user])

  console.log(user,"see here local")
  
  return (
<BrowserRouter>

<Routes>
    <Route path ='/register' element={<Register/>}/>
    <Route path ='/' element={ <Chat/>  }/>
    <Route path ='/setAvatar' element={<SetAvatar/>}/>
</Routes>

</BrowserRouter>
  )
}

export default Router