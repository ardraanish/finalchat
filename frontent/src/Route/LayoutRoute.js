

// import { createBrowserRouter } from "react-router-dom"; 
// import App from "../App";
// import RegisterPage from "../pages/userFrom";
// import LoginForn from "../pages/loginForn";
// import Home from "../pages/Home";
// import MessagePage from "../components/MessagePage";

// import ProtectRoute from "./protectRoute";

// const router = createBrowserRouter([
//   {
//     path :'/',
//     element :<App/>,
//     children :[
//       {
//         path:"/register",
//         element:<RegisterPage/>
//       },
//       {
//         path:"/login",
//         element:<LoginForn/>
//       },
     
      
//       {
//         path: "",
//         element: <ProtectRoute />,
//         children: [
//           {
//             path: "",
//             element: <Home />, 
//             children: [
//               {
//                 path: ":userId",
//                 element: <MessagePage /> 
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }

// ])

// export default router
import { createBrowserRouter } from "react-router-dom"; 
import App from "../App";
import RegisterPage from "../pages/userFrom";
import LoginForn from "../pages/loginForn";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";

import ProtectRoute from "./protectRoute";

const router = createBrowserRouter([
  {
    path :'/',
    element :<App/>,
    children :[
      {
        path:"/register",
        element:<RegisterPage/>
      },
      {
        path:"/login",
        element:<LoginForn/>
      },
     
      
      {
        path: "",
        element: <ProtectRoute />,
        children: [
          {
            path: "",
            element: <Home />, 
            children: [
              {
                path: ":userId",
                element: <MessagePage /> 
              }
            ]
          }
        ]
      }
    ]
  }

])

export default router