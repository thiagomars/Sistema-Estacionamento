import axios from 'axios';
import { useState } from 'react';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'; 

import InputMask from 'react-input-mask';

function CadastrarCliente(){
    
    const [nome, setNome] = useState();
    const [sobreNome, setSobrenome] = useState();
    const [cpf, setCpf] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [cidade, setCidade] = useState();
    const [bairro, setBairro] = useState();
    const [logradouro, setLogradouro] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState();
    
    function buscarCep(e){
        axios.get('http://viacep.com.br/ws/' + e.target.value.replace(/\D/g, '') +'/json/', ).then(response => {
            setUf(response.data.uf);
            setCidade(response.data.localidade);
            setBairro(response.data.bairro);
            setLogradouro(response.data.logradouro);
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        
        let dados = {
            "nome": nome,
            "sobrenome": sobreNome,
            "cpf": parseInt(cpf),
            "createEnderecoDTO" : {
                "cep": parseInt(cep),
                "uf": uf,
                "cidade": cidade,
                "bairro": bairro,
                "logradouro": logradouro,
                "numero": parseInt(numero),
                "complemento": complemento
            }
        }

        function LimparCampos(){
            setNome("");
            setSobrenome("");
            setCpf("");
            setCep("");
            setUf("");
            setCidade("");
            setBairro("");
            setLogradouro("");
            setNumero("");
            setComplemento("");
        }

        axios({
            method: 'POST',
            url: 'https://localhost:7270/api/Cliente',
            headers: {},
            data: dados
        }).then(response => {
            toast.success('Usuário cadastrado com sucesso!');
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
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="primeiro-nome" class="block text-sm font-medium text-gray-700">Primeiro nome</label>
                                        <input 
                                            type="text" 
                                            name="primeiro-nome" 
                                            id="primeiro-nome" 
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="sobrenome" class="block text-sm font-medium text-gray-700">Sobrenome</label>
                                        <input 
                                            type="text" 
                                            name="sobrenome" 
                                            id="sobrenome" 
                                            value={sobreNome}
                                            onChange={e => setSobrenome(e.target.value)}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-1">
                                        <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
                                        <InputMask 
                                            type="text" 
                                            name="cpf" 
                                            id="cpf" 
                                            value={cpf}
                                            mask="999\.999\.999\-99"
                                            onChange={e => setCpf(e.target.value.replace(/\D/g, ''))}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    
                                    <div class="col-span-6 sm:col-span-3 lg:col-span-1">
                                        <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
                                        <InputMask 
                                            type="text" 
                                            name="cep" 
                                            id="CEP" 
                                            mask="99.999\-999"
                                            value={cep}
                                            onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onBlur={(e) => buscarCep(e)}/>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
                                        <input 
                                            type="text" 
                                            name="estado" 
                                            id="estado" 
                                            onChange={e => setUf(e.target.value)}
                                            value={uf} 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    
                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="cidade" class="block text-sm font-medium text-gray-700">Cidade</label>
                                        <input 
                                            type="text" 
                                            name="cidade" 
                                            id="cidade" 
                                            onChange={e => setCidade(e.target.value)}
                                            value={cidade} 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    
                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="bairro" class="block text-sm font-medium text-gray-700">Bairro</label>
                                        <input 
                                            type="text" 
                                            name="bairro" 
                                            id="bairro" 
                                            onChange={e => setBairro(e.target.value)}
                                            value={bairro} 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    
                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="rua" class="block text-sm font-medium text-gray-700">Rua</label>
                                        <input 
                                            type="text" 
                                            name="rua" 
                                            id="rua" 
                                            onChange={e => setLogradouro(e.target.value)}
                                            value={logradouro} 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="numero-casa" class="block text-sm font-medium text-gray-700">Número</label>
                                        <input 
                                            type="number" 
                                            name="numero-casa" 
                                            id="numero-casa" 
                                            value={numero}
                                            onChange={e => setNumero(e.target.value)}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="complemento" class="block text-sm font-medium text-gray-700">Complemento</label>
                                        <input 
                                            type="text" 
                                            name="complemento" 
                                            id="complemento" 
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)}
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

export default CadastrarCliente;

