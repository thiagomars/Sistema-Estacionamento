import Totalizador from '../components/Totalizador';
import GraficoLinhas from '../components/GraficoLinhas';
import MenuRapido from '../components/MenuRapido';
import { RiArrowDropRightLine } from 'react-icons/ri';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import GraficoBarras from '../components/GraficoBarras';
import GraficoPizza from '../components/GraficoPizza';

function App(props) {

    const [totalizadores, setTotalizadores] = useState("");
    const [dadosGraficoBarras, setDadosGraficoBarras] = useState(null);
    const [dadosGraficoLinhas, setDadosGraficoLinhas] = useState(null);
    const [dadosGraficoPizza, setDadosGraficoPizza] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:7270/api/Totalizadores')
            .then((response) => {
                setTotalizadores(response.data);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })

        dadosGrafico();
    }, [])

    const dadosGrafico = () => {
        axios.get('https://localhost:7270/api/Totalizadores/GraficoLinha')
            .then((response) => {
            setDadosGraficoBarras(response.data);
            })

        axios.get('https://localhost:7270/api/Totalizadores/GraficoLinha')
            .then((response) => {
                setDadosGraficoLinhas(response.data);
            })

        axios.get('https://localhost:7270/api/Totalizadores/GraficoPizza')
            .then((response) => {
                setDadosGraficoPizza(response.data);
            })
      }

    const trasnformarPorcentagem = (valor) => {
        return ((valor / 50) * 100).toFixed(1).replace(".",",") + "% oculpado";
    }

    return (
        <section className='w-full grid grid-cols-12 gap-6'>
            <div className='flex flex-row items-baseline col-span-12 px-1 pt-3'>
                <h1 className='font-semibold text-2xl'>{props.titulo}</h1>
                <div className='flex flex-row px-2 items-center'>
                    <p className='italic text-sm'>{props.subtitulo}</p>
                    {props.subsubtitulo != null
                    ? <><RiArrowDropRightLine className='text-lg'/> <p className='italic'>{props.subsubtitulo}</p></>
                    : null
                    }
                    
                </div>
            </div>

            <div className='col-span-12 w-full h-min flex md:flex-col flex-col'>
                <div className='flex flex-wrap gap-5 h-min w-full mb-5 shadow-md rounded-lg'>
                    <MenuRapido />
                </div>

                <div className='space-y-1 sm:flex flex-wrap gap-5 gap-y-1 h-min w-full'>
                    <Totalizador titulo="Oculpado (50 vagas)" quantidade={totalizadores.oculpado != null ? trasnformarPorcentagem(totalizadores.oculpado) : "carregando..."} icone='RiPercentFill' backIcon='bg-orange-50' styleIcon='text-orange-300'/>
                    <Totalizador titulo="Entrada/Saída (hoje)" quantidade={totalizadores.entradaSaida != null ? totalizadores.entradaSaida + " veículos" : "carregando..."} icone='AiOutlineBlock' backIcon='bg-sky-100' styleIcon='text-sky-600'/>
                    <Totalizador titulo="Cadastrados" quantidade={totalizadores.clientes != null ? totalizadores.clientes + " Clientes" : "carregando..."} icone='BsPersonBoundingBox' backIcon='bg-purple-100' styleIcon='text-purple-600'/>
                    <Totalizador titulo="Cadastrados" quantidade={totalizadores.veiculos != null ? totalizadores.veiculos + " Veículos" : "carregando..."} icone='GiCarWheel' backIcon='bg-pink-100' styleIcon='text-pink-500'/>
                </div>
            </div>
            
            <div className='shadow-md col-span-12 md:col-span-6 flex flex-wrap gap-5 gap-y-1 h-min py-3 px-2 rounded-lg bg-white'>
                <div className="bg-white flex flex-col w-full min-w-full h-min ">
                    <div className="px-4 pt-3 pb-5 border-b">
                        <h1 className="font-bold text-base uppercase">Quantidade de veículos que deram entrada</h1>
                        <h2 className="font-semibold text-sm">Dados dos últimos 7 dias</h2>
                    </div>
                    
                    {dadosGraficoBarras != null ? <GraficoBarras dadosGraficoBarras={dadosGraficoBarras} titulo="barrasHome"/> : null}
                </div>
            </div>

            <div className='shadow-md col-span-12 md:col-span-6 flex flex-wrap gap-5 gap-y-1 h-min py-3 px-2 rounded-lg bg-white'>
                <div className="bg-white flex flex-col w-full min-w-full h-min ">
                    <div className="px-4 pt-3 pb-5 border-b">
                        <h1 className="font-bold text-base uppercase">Quantidade de veículos que deram entrada</h1>
                        <h2 className="font-semibold text-sm">Dados dos últimos 7 dias</h2>
                    </div>
                    
                    {dadosGraficoPizza != null ? <GraficoPizza dados={dadosGraficoPizza} titulo="pizzaHome"/> : null}
                </div>
            </div>

            <div className='shadow-md col-span-12 flex flex-wrap gap-5 gap-y-1 h-min py-3 px-2 rounded-lg bg-white'>
                <div className="bg-white flex flex-col w-full ">
                    <div className="px-4 pt-3 pb-5 border-b">
                        <h1 className="font-bold text-base uppercase">Quantidade de veículos que deram entrada</h1>
                        <h2 className="font-semibold text-sm">Dados dos últimos 7 dias</h2>
                    </div>

                    {dadosGraficoLinhas != null ? <GraficoLinhas dados={dadosGraficoLinhas} titulo="linhasHome"/> : null}
                </div>
            </div>
        </section>
        
        
  )
}

export default App
