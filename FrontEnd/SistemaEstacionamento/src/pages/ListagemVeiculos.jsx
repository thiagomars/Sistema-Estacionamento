import axios from "axios";
import { useEffect, useState } from "react";
import Carregando from "../components/Carregando";
import Listagem from "../components/Listagem";

function ListagemVeiculos(){

    const titulo = ["placa", "nome completo", "cpf", "tipo de veículo"];

    const [carregando, setCarregando] = useState(true);

    const [placa, setPlaca] = useState("");
    const [tipo, setTipo] = useState("");
    const [nome, setNome] = useState("");

    const [lista, setLista] = useState("");

    useEffect(() => {
        listagemVeiculos();
    }, [])

    const listagemVeiculos = () => {
        axios.get('https://localhost:7270/api/Veiculo/Listagem?placa=' + placa + "&tipo=" + tipo + "&cliente=" + nome)
            .then(response => {
                setLista(response.data);
            })
            .finally(() => {
                setCarregando(false);
            });
    }

    return (
        <div className="bg-white p-4 rounded-md">
            {carregando ? <Carregando /> : null}
            <div className='py-3 px-3 bg-slate-100 rounded-md'>
                <p className='font-bold pb-3'>FILTROS</p>
                <div className='grid grid-cols-8 gap-6 pb-2'>
                    <div class="col-span-8 md:col-span-2">
                        <label for="placa" class="block text-sm font-medium text-gray-700">Placa</label>
                        <input
                            type="text"
                            id="placa"
                            name="placa"
                            autoComplete="off"
                            value={placa}
                            onChange={e => setPlaca(e.target.value)}
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        </input>
                    </div>

                    <div class="col-span-8 md:col-span-2">
                        <label for="cpf" class="block text-sm font-medium text-gray-700">Tipo de Veículo</label>
                        <select 
                            id="tipo" 
                            name="tipo" 
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            
                            <option value='' select>Selecione...</option>
                            <option value='Ciclomotor_Motoneta'>Ciclomotor ou Motoneta</option>
                            <option value='Motocicleta'>Motocicleta</option>
                            <option value='Quadriciclo'>Quadriciclo</option>
                            <option value='Automovel'>Automovel</option>
                            <option value='Microonibus_Onibus'>Microonibus ou Onibus</option>
                        </select>
                    </div>

                    <div class="col-span-8 md:col-span-3">
                        <label for="nome" class="block text-sm font-medium text-gray-700">Nome do Cliente</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            autoComplete="off"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        </input>
                    </div>

                    <div class="col-span-8 md:col-span-1 flex justify-end items-end">
                        <button onClick={() => listagemVeiculos()} class="block h-min justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            <Listagem titulos={titulo} dados={lista}/>
        </div>
    )
}

export default ListagemVeiculos;