import axios from "axios";
import { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { toast } from "react-toastify";

function Pagamento(props) {

    //PAGAMENTO
    const [formasPagamento, setFormasPagamento] = useState([]);

    //DADOS
    const [entrada, setEntrada] = useState(null);
    const [saida, setSaida] = useState(new Date().toLocaleString());
    const [placa, setPlaca] = useState(null);
    const [cor, setCor] = useState(null);
    const [documento, setDocumento] = useState(null);
    const [numeroDocumento, setNumeroDocumento] = useState(null);

    //ADICIONAIS
    const [veiculoCadastrado, setVeiculoCadastrado] = useState(false);

    //DADOS DO CLIENTE
    const [cpf, setCpf] = useState(null);
    const [endereco, setEndereco]= useState(null);

    //DADOS FINALIZAR REGISTRO
    const [adiconalCliente, setAdicionalCliente] = useState(false);
    const [adicionalComprovante, setAdicionalComprovante] = useState(false);
    const [valorTotal, setValorTotal] = useState(null);
    const [desconto, setDesconto] = useState(null);
    const [valorReceber, setValorReceber] = useState(null);
    const [meioPagamento, setMeioPagamento] = useState(null);
    const [numeroparcelas, setNumeroParcelas] = useState(1);
    const [tempoEstacionado, setTempoEstacionado] = useState(null);
    const [idVeiculo, setIdVeiculo] = useState(null);

    const buscarEndereco = () => {
        axios.get('https://localhost:7270/api/Cliente/' + cpf.replace(/[^0-9]/g,''))
            .then(response => {
                setEndereco(response.data);
                setAdicionalCliente(true);
            })
            .catch(error => {
                setEndereco(null);
            })
    }

    const dadosBuscarCalcular = () => {
        axios.get('https://localhost:7270/api/Registro/Encerrar?id='+ props.id +'&cliente=' + adiconalCliente + (veiculoCadastrado != null ? '&veiculo=' + veiculoCadastrado : ""))
            .then(response => {
                setEntrada(new Date(response.data.registro.entrada).toLocaleString());
                setCor(response.data.registro.cor);
                setDocumento(response.data.registro.tipoDocumento);
                setNumeroDocumento(response.data.registro.documento);
                setValorTotal(response.data.valorTotal);
                setDesconto(response.data.desconto);
                setValorReceber(response.data.valorReceber);
                setTempoEstacionado(response.data.tempoEstacionado.split(":"));
                setPlaca(response.data.registro.placa);
                setIdVeiculo(response.data.idVeiculoCadastrado);
            })
            .catch(error => {
                toast.error(error.response.data);
            })
    }

    useEffect(() => {
        //Popular SELECT com as formas de pagamento
        axios.get('https://localhost:7270/api/Filtros/Pagamento')
            .then(response => {
                setFormasPagamento(response.data);
            })
            .catch(error => {
                toast.error(error);
            })

        axios.get('https://localhost:7270/api/Veiculo/' + props.placa)
            .then((response) => {
                setVeiculoCadastrado(true);
            })

    }, [])

    useEffect(() => {
        dadosBuscarCalcular();
    }, [adiconalCliente])

    useEffect(() => {
        dadosBuscarCalcular();
    }, [veiculoCadastrado])

    const finalizar = () => {
        const obs = `Desconto Cliente Cad = ${endereco != null ? endereco.endereco : "nada consta"},
            Desconto Veiculo Cad = ${veiculoCadastrado},
            Valor Total = ${valorTotal},
            Desconto = ${desconto},
            Valor a Receber = ${valorReceber},
            QTD Parcelas = ${numeroparcelas},
            Forma de Pagamento = ${meioPagamento}`;

        let dados = {
            "idRegistro": props.id,
            "formaPagamento": meioPagamento,
            "valor": valorReceber,
            "observacao": obs,
            "idCliente": endereco != null ? endereco.id : null,
            "idVeiculo": idVeiculo
        }

        axios.put('https://localhost:7270/api/Registro', dados)
            .then(response => {
                toast.success("Saída de Veículo Finalizada! Registro encerrado.")
            })
            .catch(error => {
                toast.error(error.response.data.title);
            })
    }

    return (
        <div className='max-h-full'>
            <div className='flex flex-col sm:flex-row justify-between items-center pb-3 text-center sm:text-right'>
                <h1 className='text-2xl font-medium'>Registrar Saída</h1>
            </div>
            
            <div className=' bg-slate-100 px-3 rounded-md'>
                <h2 className='w-full font-bold pt-3 pb-4'>DADOS</h2>

                <div className="grid grid-cols-1 sm:grid-cols-6 h-min w-full text-sm pb-2">
                    <div class="col-span-3 md:col-span-2 flex flex-row mb-1">
                        <h3 className="font-medium">Placa: </h3>
                        <p className="mx-1">{placa}</p>
                    </div>

                    <div class="col-span-3 md:col-span-2 flex flex-row mb-1">
                        <h3 className="font-medium">Documento: </h3>
                        <p className="mx-1">{documento}</p>
                    </div>

                    <div class="col-span-3 md:col-span-2 flex flex-row mb-1">
                        <h3 className="font-medium">Entrada: </h3>
                        <p className="mx-1">{entrada}</p>
                    </div>

                    <div class="col-span-3 md:col-span-2 flex flex-row mb-1">
                        <h3 className="font-medium">Cor: </h3>
                        <p className="mx-1">{cor}</p>
                    </div>

                    <div class="col-span-3 md:col-span-2 flex flex-row mb-1">
                        <h3 className="font-medium">Número: </h3>
                        <p className="mx-1">{numeroDocumento}</p>
                    </div>

                    <div class="col-span-3 md:col-span-2 flex flex-row mb-1">
                        <h3 className="font-medium">Saída: </h3>
                        <p className="mx-1">{saida}</p>
                    </div>
                </div>
            </div>

            <div className='px-3 pb-4 pt-3'>
                <div className="grid grid-cols-6 h-min w-full text-sm py-2">
                    <div className="col-span-6 grid grid-cols-1 md:grid-cols-2">
                        <div className="mb-2 pb-2">
                            <p className="font-medium mb-3 h-fit">ADICIONAIS</p>

                            <div class="flex items-center mb-2">
                                <div class="flex h-5 items-center">
                                    {endereco != null && endereco != ""
                                    ? <input onChange={e => setAdicionalCliente(e.target.checked)} id="cliente-cadastro" checked name="cliente-cadastro" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                    : <input onChange={e => setAdicionalCliente(e.target.checked)} id="cliente-cadastro" name="cliente-cadastro" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>}
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="cliente-cadastro" class="font-medium text-gray-700">Desconto de Cliente Cadastrado</label>
                                    <p class="text-gray-500">Clientes com cadastro possuem desconto de 10%.</p>
                                </div>
                            </div>

                            <div class="flex items-center mb-2">
                                <div class="flex h-5 items-center">
                                    {veiculoCadastrado 
                                    ? <input onChange={e => setVeiculoCadastrado(e.target.checked)} checked id="desconto" name="desconto" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                    : <input onChange={e => setVeiculoCadastrado(e.target.checked)} id="desconto" name="desconto" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>}
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="desconto" class="font-medium text-gray-700">Desconto de Veículo Cadastrado</label>
                                    <p class="text-gray-500">Veículos cadastrados possuem desconto de 7%.</p>
                                </div>
                            </div>

                            <div class="flex items-center mb-2">
                                <div class="flex h-5 items-center">
                                    <input onClick={e => setAdicionalComprovante(e.target.checked)} id="comprovante" checked name="comprovante" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="comprovante" class="font-medium text-gray-700">Imprimir comprovante</label>
                                    <p class="text-gray-500">Ao finalizar pagamento, imprimir comprovante do cliente.</p>
                                </div>
                            </div>

                            
                        </div>

                        <div className="sm:border-l sm:pl-4 grid grid-cols-4">
                            <div className="col-span-4 grid grid-cols-4">
                                <p className="col-span-4 h-min font-medium mb-3">DADOS DO CLIENTE</p>

                                <div class="sm:col-span-3 col-span-4">
                                    <label for="cpf" class="block text-sm font-medium text-gray-700">Buscar pelo CPF</label>
                                    <InputMask
                                        mask="999\.999\.999\-99"
                                        type="text"
                                        name="cpf"
                                        id="cpf"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                        autocomplete = "off"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                </div>

                                <div className="col-span-4 sm:col-span-1 flex items-center justify-center mb-4 sm:mb-0">
                                    <button onClick={() => buscarEndereco()} class="mt-4 sm:mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        Buscar
                                    </button>
                                </div>
                            </div>

                            <div class="col-span-4 mt-4 bg-slate-100 p-3 rounded-md">
                                <div class="grid grid-cols-4 mb-2">
                                    <h3 className="col-span-1 font-medium flex items-center">Nome Completo: </h3>
                                    <p className="col-span-3 flex items-center border-l pl-1">{endereco ? endereco.nome + " " + endereco.sobrenome : "..."}</p>
                                </div>

                                <div class="grid grid-cols-4">
                                    <h3 className="col-span-1 font-medium flex items-center">Endereço: </h3>
                                    <div className="col-span-3 border-l pl-1">
                                        <p className="">{endereco ? "CEP " + endereco.endereco.cep : "..."}</p>
                                        <p className="">{endereco ? endereco.endereco.cidade + " - " + endereco.endereco.uf : null}</p>
                                        <p className="">{endereco ? endereco.endereco.logradouro + ", " + endereco.endereco.numero : null}</p>
                                        <p className="">{endereco ? endereco.endereco.bairro : null}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className='w-full font-bold pt-3 pb-4 border-t'>PAGAMENTO</h2>

                <div className="grid grid-cols-6 gap-6 text-sm pb-2 mb-3">
                    <div class="col-span-6 sm:col-span-2">
                        <label for="tempo-estacionado" class="block text-sm font-medium text-gray-700">Tempo Estacionado</label>
                        <input
                            type="text" disabled
                            name="tempo-estacionado"
                            id="tempo-estacionado"
                            autocomplete = "off"
                            value={tempoEstacionado != null ? tempoEstacionado[0] + " horas e " + tempoEstacionado[1] + " minutos" : "0"}
                            class="bg-slate-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label for="valor-total" class="block text-sm font-medium text-gray-700">Valor total</label>
                        <input
                            type="text" disabled
                            name="valor-total"
                            id="valor-total"
                            autocomplete = "off"
                            value={valorTotal ? valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "R$ 0,00"}
                            class="bg-slate-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label for="descontos" class="block text-sm font-medium text-gray-700">Desconto em R$</label>
                        <input
                            type="text" disabled
                            name="descontos"
                            id="descontos"
                            autocomplete = "off"
                            value={desconto ? desconto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "R$ 0,00"}
                            class="bg-slate-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label for="valor-receber" class="block text-sm font-medium text-gray-700">Valor a receber</label>
                        <input
                            type="text" disabled
                            name="valor-receber"
                            id="valor-receber"
                            autocomplete = "off"
                            value={valorReceber ? valorReceber.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "R$ 0,00"}
                            class="bg-slate-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
            
                    <div class="col-span-6 sm:col-span-2">
                        <label for="tipo-pagamento" class="block text-sm font-medium text-gray-700">Meio de Pagamento</label>
                        <select
                            id="tipo-pagamento"
                            name="tipo-pagamento"
                            onChange={e => setMeioPagamento(e.target.value)}
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option value='-1' select>Selecione...</option>
                            {formasPagamento.map((value, index) => <option key={"tipoPagamento"+value} value={index}>{value}</option>)}
                        </select>
                    </div>

                    <div class="col-span-6 md:col-span-2">
                        <label for="qtd-parcelas" class="block text-sm font-medium text-gray-700">Número de Parcelas</label>
                        <select 
                            id="qtd-parcelas" 
                            name="qtd-parcelas"
                            onChange={e => setNumeroParcelas(e.target.value)}
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option key="parcela1" value='1' select>1</option>
                            <option key="parcela2" value='2'>2</option>
                            <option key="parcela3" value='3'>3</option>
                            <option key="parcela4" value='4'>4</option>
                            <option key="parcela5" value='5'>5</option>
                        </select>
                    </div>

                    <div className="col-span-6 flex items-center justify-end">
                        <button onClick={() => finalizar()} class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Finalizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pagamento;