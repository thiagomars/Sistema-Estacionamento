import axios from 'axios';
import { useState } from 'react';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import InputMask from 'react-input-mask';

function CadastrarVeiculo() {

    const [tipoVeiculo, setTipoVeiculo] = useState();
    const [placa, setPlaca] = useState();
    const [cpf, setCpf] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let dados = {
            "tipo": parseInt(tipoVeiculo),
            "placa": placa,
            "cpf": parseInt(cpf),
        }

        function LimparCampos(){
            setTipoVeiculo("0");
            setPlaca("");
            setCpf("");
        }

        axios({
            method: 'POST',
            url: 'https://localhost:7270/api/Veiculo',
            headers: {},
            data: dados
        }).then(response => {
            toast.success('Veículo cadastrado com sucesso!');
            LimparCampos();
        }).catch(error => 
            toast.error(error.response.data)
        )
    }

    return (
        <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-1 md:gap-6">
                <div class="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" onSubmit={handleSubmit} method="POST">
                        <div class="overflow-hidden shadow sm:rounded-md">
                            <div class="bg-white px-4 py-5 sm:p-6">
                                <h1 className='text-2xl font-bold mb-3'>Cadastrar veículo</h1>
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="tipo-veiculo" class="block text-sm font-medium text-gray-700">Tipo de Veículo</label>
                                        <select 
                                            id="tipo-veiculo" 
                                            name="tipo-veiculo" 
                                            onChange={e => setTipoVeiculo(e.target.value)}
                                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            
                                            <option value='-1' select>Selecione...</option>
                                            <option value='0'>Ciclomotor ou Motoneta</option>
                                            <option value='1'>Motocicleta</option>
                                            <option value='2'>Quadriciclo</option>
                                            <option value='3'>Automovel</option>
                                            <option value='4'>Microonibus ou Onibus</option>
                                        </select>
                                    </div>

                                    <div class="col-span-6 md:col-span-2">
                                        <label for="sobrenome" class="block text-sm font-medium text-gray-700">PLACA</label>
                                        <input
                                            type="text"
                                            name="placa"
                                            id="placa"
                                            value={placa}
                                            onChange={e => setPlaca(e.target.value)}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 md:col-span-2">
                                        <label for="cpf" class="block text-sm font-medium text-gray-700">CPF responsável</label>
                                        <InputMask
                                            type="text"
                                            name="cpf"
                                            id="cpf"
                                            mask="999\.999\.999\-99"
                                            value={cpf}
                                            onChange={e => setCpf(e.target.value.replace(/\D/g, ''))}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    
                                </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Salvar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default CadastrarVeiculo;