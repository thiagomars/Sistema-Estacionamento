import { FaParking } from "react-icons/fa"
import { BiHome } from "react-icons/bi"
import { BsPeople } from "react-icons/bs";
import { GiTyre } from "react-icons/gi";
import { RiRoadMapLine } from "react-icons/ri";

import Submenu from "./Submenu";

function NavBar(props){

    return(
        <div className="">
            <div className="flex flex-col items-center w-full sm:mt-5">
                <FaParking className="text-3xl mt-4"/>
                <p className="text-sm font-semibold"><span className="hidden sm:block">PARKING</span></p>
            </div>

            <div className="mt-10 w-max font-medium">
                <a href="/" className='list-none flex flex-row items-center hover:bg-slate-100 cursor-pointer py-2 px-2 rounded-md group'>
                    <BiHome className='text-xl'/>
                    <p className="hidden text-base sm:block pl-2 sm:pr-7 font-semibold">Início</p>
                </a>

                <details>
                    <summary className='list-none flex flex-row items-center hover:bg-slate-100 cursor-pointer py-2 px-2 rounded-md w-full'>
                        <BsPeople className="text-xl"/>
                        <p className='hidden sm:block pl-2 text-base font-semibold'>Clientes</p>
                    </summary>
                        <Submenu icon='BsPersonPlus' titulo='Cadastrar' link='CadastrarCliente'/>
                        <Submenu icon='BiSearchAlt' titulo='Buscar' link='/ListagemCliente'/>
                </details>

                <details>
                    <summary className='list-none flex flex-row items-center hover:bg-slate-100 cursor-pointer py-2 px-2 rounded-md w-full'>
                        <GiTyre className="text-xl"/>
                        <p className='hidden sm:block pl-2 text-base font-semibold'>Veículos</p>
                    </summary>
                        <Submenu icon='AiOutlinePlusCircle' titulo='Cadastrar' link='CadastrarVeiculo'/>
                        <Submenu icon='BiSearchAlt' titulo='Buscar' link='/ListagemVeiculos'/>
                </details>
                
                <details>
                    <summary className='list-none flex flex-row items-center hover:bg-slate-100 cursor-pointer py-2 px-2 rounded-md w-full'>
                        <RiRoadMapLine className="text-xl"/>
                        <p className='hidden sm:block pl-2 text-base font-semibold'>Endereço</p>
                    </summary>
                        <Submenu icon='MdOutlineAddRoad' titulo='Cadastrar' link='CadastrarEnderecos'/>
                        <Submenu icon='BiSearchAlt' titulo='Buscar' link='/ListagemEnderecos'/>
                </details>
               
            </div>
            
        </div>
    )
}

export default NavBar;