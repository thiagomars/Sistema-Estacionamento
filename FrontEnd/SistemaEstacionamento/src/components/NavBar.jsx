import 'flowbite';

import { BiHome } from "react-icons/bi"
import { BsPeople } from "react-icons/bs";
import { GiTyre } from "react-icons/gi";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { RiRoadMapLine, RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineSettings } from 'react-icons/md';

function NavBar(props) {

    return (
        <ul class="space-y-2 mt-3">
            <li>
                <a href="/" className='flex items-center w-full p-2 text-base rounded-lg group hover:bg-gray-100'>
                    <BiHome className='text-xl' />
                    <p className="flex-1 ml-3 text-left whitespace-nowrap">Início</p>
                </a>
            </li>
            <li>
                <a href="/ListagemCliente" className='flex items-center w-full p-2 text-base rounded-lg group hover:bg-gray-100'>
                    <BsPeople className='text-xl' />
                    <p className="flex-1 ml-3 text-left whitespace-nowrap">Clientes</p>
                </a>
            </li>
            <li>
                <a href="/ListagemVeiculos" className='flex items-center w-full p-2 text-base rounded-lg group hover:bg-gray-100 '>
                    <GiTyre className='text-xl' />
                    <p className="flex-1 ml-3 text-left whitespace-nowrap">Veículos</p>
                </a>
            </li>
            <li>
                <a href="/ListagemEnderecos" className='flex items-center w-full p-2 text-base rounded-lg group hover:bg-gray-100 '>
                    <RiRoadMapLine className='text-xl' />
                    <p className="flex-1 ml-3 text-left whitespace-nowrap">Endereços</p>
                </a>
            </li>
            <li>
                <button type="button" class="flex items-center w-full p-2 text-base rounded-lg group hover:bg-gray-100 " aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <MdOutlineMonetizationOn className="text-xl" />
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Financeiro</span>
                    <RiArrowDropDownLine className='text-2xl' />
                </button>

                <ul id="dropdown-example" class="hidden py-2 space-y-2">
                    <li>
                        <a href="/ListagemRegistros" class="flex items-center w-full p-2 text-base rounded-lg pl-11 group hover:bg-gray-100 ">Registros</a>
                    </li>
                    <li>
                        <a href="/DashboardFinanceiro" class="flex items-center w-full p-2 text-base rounded-lg pl-11 group hover:bg-gray-100 ">Dashboard</a>
                    </li>
                    <li>
                        <a href="/RelatoriosFinanceiro" class="flex items-center w-full p-2 text-base rounded-lg pl-11 group hover:bg-gray-100 ">Financeiro</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/ListagemEnderecos" className='flex items-center w-full p-2 text-base rounded-lg group hover:bg-gray-100 '>
                    <MdOutlineSettings className='text-xl' />
                    <p className="flex-1 ml-3 text-left whitespace-nowrap">Configurações</p>
                </a>
            </li>
            <li>
                <a href="/ListagemEnderecos" className='flex items-center w-full p-2 text-base rounded-lg group hover:bg-red-500 hover:text-white'>
                    <HiOutlineLogout className='text-xl' />
                    <p className="flex-1 ml-3 text-left whitespace-nowrap">Sair</p>
                </a>
            </li>
        </ul>
    )
}

export default NavBar;