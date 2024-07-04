import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import Product from './components/Product/Product.jsx'
import Categories from './components/Category/Category.jsx'
import Order from './components/Order/Order.jsx'
import Register from './components/Register.jsx'
import AddCategory from './components/Category/AddCategory.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Login/>}/>
          <Route path="/products" element={<Product/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/categories" element={<Categories/>} />
          <Route path="/add-category" element={<AddCategory/>} />
          <Route path="/orders" element={<Order/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
