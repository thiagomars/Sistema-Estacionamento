import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import ErrorPage from "./pages/error-page.jsx";
import LayoutDashboard from './components/LayoutDashboard';
import CadastrarCliente from "./pages/CadastrarCliente";
import CadastrarVeiculo from "./pages/CadastrarVeiculo";
import CadastrarEndereco from "./pages/CadastrarEndereco";
import ListagemCliente from './pages/ListagemCliente';
import ListagemEnderecos from './pages/ListagemEnderecos';
import ListagemVeiculos from './pages/ListagemVeiculos';
import PagImpressao from './pages/PagImpressao';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutDashboard />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/CadastrarCliente",
                element: <CadastrarCliente />,
            },
            {
                path: "/CadastrarVeiculo",
                element: <CadastrarVeiculo />,
            },
            {
                path: "/CadastrarEnderecos",
                element: <CadastrarEndereco />,
            },
            {
                path: "/ListagemCliente",
                element: <ListagemCliente />,
            },
            {
                path: "/ListagemVeiculos",
                element: <ListagemVeiculos />,
            },
            {
                path: "/ListagemEnderecos",
                element: <ListagemEnderecos />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
