
import axios from 'axios';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'; 

function CadastrarEndereco(){

    const [cep, setCep] = useState("");
    const [uf, setUf] = useState();
    const [cidade, setCidade] = useState();
    const [bairro, setBairro] = useState();
    const [logradouro, setLogradouro] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState();

    const [listaEstados, setListaEstados] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dados = {
            "cep": parseInt(cep),
            "logradouro": logradouro,
            "complemento": complemento,
            "bairro": bairro,
            "cidade": cidade,
            "uf": uf,
            "numero": parseInt(numero)
        }

        axios.post('https://localhost:7270/api/Endereco', dados)
            .then(response => {
                toast.success("Endereço cadastrado com sucesso!");
                limparCampos();
            })
            .catch(error => {
                toast.error(error.response.data);
            })
    }

    const limparCampos = () => {
        setCep("");
        setUf("");
        setCidade("");
        setBairro("");
        setLogradouro("");
        setNumero("");
        setComplemento("");
    }

    function buscarCep(e){
        axios.get('http://viacep.com.br/ws/' + cep +'/json/', ).then(response => {
            setUf(response.data.uf);
            setCidade(response.data.localidade);
            setBairro(response.data.bairro);
            setLogradouro(response.data.logradouro);
        })
    }

    useEffect(() => {
        cep.length > 7 ? buscarCep() : null;
    }, [cep])

    const popularSelectEstado = () => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
            .then(response => {
                setListaEstados(response.data);
            })
            .catch(error => {
                toast.error(error);
            })
    }

    useEffect(() => {
        popularSelectEstado();
    }, [])

    return (
        <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-1 md:gap-6">
                <div class="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" onSubmit={handleSubmit} method="POST">
                        <div class="overflow-hidden shadow sm:rounded-md">
                            <div class="bg-white px-4 py-5 sm:p-6">
                                <h1 className='text-2xl font-bold mb-3'>Cadastrar Endereço</h1>
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
                                        <InputMask
                                            type="text"
                                            name="cep"
                                            id="cep"
                                            mask="99\.999\-999"
                                            value={cep}
                                            onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
                                        <select
                                            name="estado"
                                            id="estado"
                                            onChange={e => setUf(e.target.value)}
                                            value={uf}
                                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option value="Selecione">Selecione...</option>
                                            {
                                                listaEstados.map((value, index) => {
                                                    return <option key={"UF_" + value.id} value={value.sigla}>{value.nome}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="cidade" class="block text-sm font-medium text-gray-700">Cidade</label>
                                        <input
                                            type="text"
                                            name="cidade"
                                            id="cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="bairro" class="block text-sm font-medium text-gray-700">Bairro</label>
                                        <input
                                            type="text"
                                            name="bairro"
                                            id="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="rua" class="block text-sm font-medium text-gray-700">Logradouro</label>
                                        <input
                                            type="text"
                                            name="rua"
                                            id="rua"
                                            value={logradouro}
                                            onChange={e => setLogradouro(e.target.value)}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="numero" class="block text-sm font-medium text-gray-700">Numero</label>
                                        <input
                                            type="text"
                                            name="numero"
                                            id="numero"
                                            value={numero}
                                            onChange={e => setNumero(e.target.value)}
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    <div class="col-span-6 md:col-span-4">
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

export default CadastrarEndereco;