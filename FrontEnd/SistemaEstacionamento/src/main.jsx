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
import ListagemRegistros from './pages/ListagemRegistros';
import DashboardFinanceiro from "./pages/DashboardFinanceiro";
import RelatoriosFinanceiro from './pages/RelatoriosFinanceiro';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutDashboard />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home titulo="Início" subtitulo="Menu Rápido"/>,
            },
            {
                path: "/CadastrarCliente",
                element: <CadastrarCliente titulo="Cliente" subtitulo="Listagem" subsubtitulo="Cadastrar"/>,
            },
            {
                path: "/CadastrarVeiculo",
                element: <CadastrarVeiculo titulo="Veículo" subtitulo="Listagem" subsubtitulo="Cadastrar"/>,
            },
            {
                path: "/CadastrarEnderecos",
                element: <CadastrarEndereco titulo="Endereço" subtitulo="Listagem" subsubtitulo="Cadastrar"/>,
            },
            {
                path: "/ListagemCliente",
                element: <ListagemCliente titulo="Cliente" subtitulo="Listagem"/>,
            },
            {
                path: "/ListagemVeiculos",
                element: <ListagemVeiculos titulo="Veículo" subtitulo="Listagem"/>,
            },
            {
                path: "/ListagemEnderecos",
                element: <ListagemEnderecos titulo="Endereço" subtitulo="Listagem"/>,
            },
            {
                path: "/ListagemRegistros",
                element: <ListagemRegistros titulo="Financeiro" subtitulo="Registros"/>,
            },
            {
                path: "/DashboardFinanceiro",
                element: <DashboardFinanceiro titulo="Financeiro" subtitulo="Dashboard"/>
            },
            {
                path: "/RelatoriosFinanceiro",
                element: <RelatoriosFinanceiro titulo="Financeiro" subtitulo="Relatórios"/>
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
