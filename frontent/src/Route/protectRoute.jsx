import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = {'token':false}
const tok = localStorage.getItem('token')
    console.log(tok,"tokkkkkkkk")
    if(tok){
        auth.token = true
    }
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes