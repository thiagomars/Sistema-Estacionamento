import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { RiDeleteBinLine, RiEditFill } from 'react-icons/ri';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'; 

function MenuDropdown(props) {

    const deletarItem = () => {
        axios.delete('https://localhost:7270/api/' + props.tabela + '/' + props.cpf)
        .then((response) => {
            toast.success(props.tabela + " deletado com sucesso!");
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <Menu>
            <Menu.Button>
                <FaEllipsisV 
                className="text-slate-500 hover:bg-violet-200 p-2 text-3xl rounded-full hover:text-violet-600"
                aria-hidden="true"
                />
          </Menu.Button>

          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute p-1 flex flex-col right-4 sm:right-16 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 font-normal ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    {({ active }) => (
                    <button className={`${ active ? 'bg-violet-500 text-white' : 'text-gray-600' } group flex w-full items-center rounded-md px-2 py-2 text-sm`} >
                        {active ? (
                        <RiEditFill
                            className="mr-2 h-5 w-5 "
                            aria-hidden="true"
                        />
                        ) : (
                        <RiEditFill
                            className="mr-2 h-5 w-5 text-violet-600"
                            aria-hidden="true"
                        />
                        )}
                        Editar {props.id}
                    </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                    <button onClick={deletarItem} className={`${ active ? 'bg-red-500 text-white' : 'text-gray-600' } group flex w-full items-center rounded-md px-2 py-2 text-sm`} >
                        {active ? (
                        <RiDeleteBinLine
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        ) : (
                        <RiDeleteBinLine
                            className="mr-2 h-5 w-5 text-violet-600 bg-vio"
                            aria-hidden="true"
                        />
                        )}
                        Excluir
                    </button>
                    )}
                </Menu.Item>
                
                        
            </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default MenuDropdown;