import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import GraficoBarras from '../components/GraficoBarras';
import InputMask from 'react-input-mask';
import GraficoLinhas from "../components/GraficoLinhas";
import Listagem from "../components/Listagem";

import { RiArrowDropRightLine } from 'react-icons/ri';

function DashboardFinanceiro(props) {

    const [graficoRecebido, setGraficoRecebido] = useState(null);
    const [titulo, setTitulo] = useState(null); 

    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState();

    const dadosGraficos = () => {
        axios.get('https://localhost:7270/api/Totalizadores/FinanceiroBarras?Inicial=2023-02-07&Final=2023-02-15')
            .then((response) => {
                setGraficoRecebido(response.data);
                setTitulo(response.data.map(value => new Date(value.diaSemana).toLocaleDateString()));
            });
        
    }

    useEffect(() => {
        dadosGraficos();
    }, [])

    return (
        <section className="grid grid-cols-12 gap-5 w-full">
            <div className='flex flex-row items-baseline px-1 pt-2 pb-4'>
                <h1 className='font-semibold text-2xl'>{props.titulo}</h1>
                <div className='flex flex-row px-2 items-center'>
                    <p className='italic text-sm'>{props.subtitulo}</p>
                    {props.subsubtitulo != null
                    ? <><RiArrowDropRightLine className='text-lg'/> <p className='italic'>{props.subsubtitulo}</p></>
                    : null
                    }
                    
                </div>
            </div>
            {/* Filtros aqui */}
            <div className="rounded-md col-span-12">
                <div className=' my-2 py-2 px-3 bg-white shadow-md rounded-md'>
                    <p className='font-bold pb-3'>FILTROS</p>
                    <div className='grid grid-cols-8 gap-6 pb-2'>
                        <div class="col-span-8 md:col-span-2">
                            <label for="nome" class="block text-sm font-medium text-gray-700">Data Inicial</label>
                            <InputMask
                                type="text"
                                name="data-inicial"
                                id="data-inicial"
                                mask="99\\99\\9999"
                                value={dataInicial}
                                onChange={e => setDataInicial(e.target.value)}
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-8 md:col-span-2">
                            <label for="nome" class="block text-sm font-medium text-gray-700">Data Final</label>
                            <InputMask
                                type="text"
                                name="data-inicial"
                                id="data-inicial"
                                mask="99\\99\\9999"
                                value={dataFinal}
                                onChange={e => setDataFinal(e.target.value)}
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-8 flex justify-end items-end">
                            <button class="block h-min justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráficos aqui */}
            <div className='h-full shadow-md flex 2xl:col-span-8 col-span-12 flex-wrap gap-5 py-3 px-4 rounded-lg bg-white'>
                <div className="bg-white flex flex-col w-full min-w-full h-min ">
                    <div className="px-2 pt-3 pb-5 border-b">
                        <h1 className="font-bold text-base uppercase">Quantidade de veículos que deram entrada</h1>
                        <h2 className="font-semibold text-sm">Dados dos últimos 7 dias</h2>
                    </div>

                    {graficoRecebido != null ? <GraficoLinhas dados={graficoRecebido} titulo="linhaFin1" /> : null}
                </div>
            </div>
            <div className='h-full shadow-md flex 2xl:col-span-4 xl:col-span-6 lg:col-span-8 col-span-12 flex-wrap gap-5 py-3 px-4 rounded-lg bg-white'>
                <div className="bg-white flex flex-col w-full min-w-full h-min ">
                    <div className="px-2 pt-3 pb-5 border-b">
                        <h1 className="font-bold text-base uppercase">Valor Recebido no Período</h1>
                        <h2 className="font-semibold text-sm">{dataInicial.replace(/\D/g, '').length > 7 ? `Entre ${dataInicial} e ${dataFinal}` : "ok"}</h2>
                    </div>

                    {graficoRecebido != null ? <GraficoBarras dadosGraficoBarras={graficoRecebido} titulo="barrasFin1" /> : null}
                </div>
            </div>
            <div className='h-full shadow-md flex 2xl:col-span-4 xl:col-span-6 lg:col-span-8 col-span-12 flex-wrap gap-5 py-3 px-4 rounded-lg bg-white'>
                <div className="bg-white flex flex-col w-full min-w-full h-min ">
                    <div className="px-2 pt-3 pb-5 border-b">
                        <h1 className="font-bold text-base uppercase">Quantidade de veículos que deram entrada</h1>
                        <h2 className="font-semibold text-sm">Dados dos últimos 7 dias</h2>
                    </div>

                    {graficoRecebido != null ? <GraficoBarras dadosGraficoBarras={graficoRecebido} titulo="barrasFin2" /> : null}
                </div>
            </div>

            <div className='h-full shadow-md flex 2xl:col-span-8 col-span-12 flex-wrap gap-5 py-3 px-4 rounded-lg bg-white'>
                <div className="bg-white flex flex-col w-full min-w-full h-min ">
                    <div className="px-2 pt-3 pb-5 border-b">
                        <h1 className="font-bold text-base uppercase">Quantidade de veículos que deram entrada</h1>
                        <h2 className="font-semibold text-sm">Dados dos últimos 7 dias</h2>
                    </div>

                    {titulo != null ? <Listagem tabela="Cliente" titulos={titulo} dados={""}/> : null}
                </div>
            </div>

        </section>
    )
}

export default DashboardFinanceiro;