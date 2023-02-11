import Totalizador from '../components/Totalizador';
import GraficoLinhas from '../components/GraficoLinhas';
import MenuRapido from '../components/MenuRapido';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import GraficoBarras from '../components/GraficoBarras';
import GraficoPizza from '../components/GraficoPizza';

function App() {

    const [totalizadores, setTotalizadores] = useState("");

    useEffect(() => {
        axios.get('https://localhost:7270/api/Totalizadores')
            .then((response) => {
                setTotalizadores(response.data);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    }, [])

    const trasnformarPorcentagem = (valor) => {
        return ((valor / 50) * 100).toFixed(1).replace(".",",") + "% oculpado";
    }

    return (
        <section className='w-full grid grid-cols-12 gap-6'>
            <div className='col-span-12 w-full h-min flex md:flex-col flex-col-reverse'>
                <div className='hidden sm:flex flex-wrap gap-5 gap-y-1 h-min w-full '>
                    <Totalizador titulo="Oculpado (50 vagas)" quantidade={totalizadores.oculpado != null ? trasnformarPorcentagem(totalizadores.oculpado) : "carregando..."} icone='RiPercentFill' backIcon='bg-orange-50' styleIcon='text-orange-300'/>
                    <Totalizador titulo="Entrada/Saída (hoje)" quantidade={totalizadores.entradaSaida != null ? totalizadores.entradaSaida + " veículos" : "carregando..."} icone='AiOutlineBlock' backIcon='bg-sky-100' styleIcon='text-sky-600'/>
                    <Totalizador titulo="Cadastrados" quantidade={totalizadores.clientes != null ? totalizadores.clientes + " Clientes" : "carregando..."} icone='BsPersonBoundingBox' backIcon='bg-purple-100' styleIcon='text-purple-600'/>
                    <Totalizador titulo="Cadastrados" quantidade={totalizadores.veiculos != null ? totalizadores.veiculos + " Veículos" : "carregando..."} icone='GiCarWheel' backIcon='bg-pink-100' styleIcon='text-pink-500'/>
                </div>

                <div className='flex flex-wrap gap-5 h-min w-full'>
                    <MenuRapido />
                </div>
            </div>
            
            <div className='shadow-md col-span-12 md:col-span-6 flex flex-wrap gap-5 gap-y-1 h-min py-3 px-2 rounded-lg bg-white'>
                <GraficoBarras />
            </div>
            
            <div className='shadow-md col-span-12 md:col-span-6 flex flex-wrap gap-5 gap-y-1 h-min py-3 px-2 rounded-lg bg-white'>
                <GraficoPizza />
            </div>

            <div className='shadow-md col-span-12 flex flex-wrap gap-5 gap-y-1 h-min py-3 px-2 rounded-lg bg-white'>
                <GraficoLinhas />
            </div>

            <div className='shadow-md col-span-12 bg-white text-center py-3 mb-3 px-3 rounded-lg font-medium'>
                <p>Site criado por Thiago Mars · 2022 ©</p>
            </div>
        </section>
        
        
  )
}

export default App
