import axios from 'axios';
import TotalizadorFianceiro from '../components/TotalizadorFinanceiro';

import { RiArrowDropRightLine } from 'react-icons/ri';

function RelatoriosFinanceiro(props){

    return (
        <section>
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
            
            <article className="shadow-md rounded-lg sm:flex flex-wrap gap-y-1 h-min w-full">
                    <TotalizadorFianceiro style="rounded-l-lg" titulo="Total da Semana" content="R$ 326,97" subinfo="R$ 53,74 a mais" icone="FaArrowUp" diferenca="12%" />
                    <TotalizadorFianceiro style="" titulo="Total do Dia" content="R$ 24,51" subinfo="esperado mais R$ 30,00" icone="FaArrowUp" diferenca="6%" />
                    <TotalizadorFianceiro style="rounded-r-lg" titulo="Relação com Média Semanal" content="R$ 411,34" subinfo="esperado mais R$ 575,28" icone="FaArrowDown" diferenca="23%" />
            </article>

            <article>

            </article>
        </section>
    )
}

export default RelatoriosFinanceiro;