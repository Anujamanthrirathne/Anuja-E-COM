import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Forgotpassword from '../pages/Forgotpassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUser from '../pages/AllUser';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Carts'
import SearchsProduct from '../pages/SearchsProduct';
import Success from '../pages/Successs';
import Cancel from '../pages/Cancel';
import OrderPage from '../pages/OrderPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children:[
            {
                path:"",
                element: <Home/>
            },

            {
                path: "login",
                element:<Login/>
            },

            {
                path: "forgot-password",
                element: <Forgotpassword/>
            },

            {
                path: "sign-up",
                element : <SignUp/>
            },
            {
                path: "product-category",
                element : <CategoryProduct/>
            },
             
            {
                path : "product/:id",
                element : <ProductDetail/>
            },
            {
                  path : "cart",
                  element : <Cart/>
            },
            {  
                path : "success",
                element : <Success/>

            },

            {
                path : "cancel",
                element : <Cancel/>
            },

            {
                   path : "search",

                   element : <SearchsProduct/>
            },
            {
                    path: "order",
                    element : <OrderPage/>
            },

            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children: [
                    {
                      path: "all-users",
                      element : <AllUser/>
                },

                {
                    path: "all-products",
                    element : <AllProducts/>
              },


            ]
            }



        ]
    }
]);

export default router;
