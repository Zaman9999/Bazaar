
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from './api/Api';
import Product from './Components/Product';
import Login from './Pages/Login';

const Layout = ()=>{
  return (
    <div>
      <Header/>
      <ScrollRestoration/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[{
      path:"/",
      element:<Home/>,
      loader:productsData
    },
    {
      path:"/product/:_id",
      element:<Product/>
    },
    {
      path:"/login",
      element:<Login/>
    },
  {
    path:'/cart',
    element:<Cart/>
  },],
}])

function App() {
  return (
    <div className='font-bodyFont' >
   <RouterProvider router={router}/>
    </div>
  );
}

export default App;
