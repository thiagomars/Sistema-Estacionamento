import { FaArrowUp, FaArrowDown, FaArrowRight } from 'react-icons/fa';

function TotalizadorFianceiro(props){

    const verificarIcone = (icon) => {
        if(icon == "FaArrowUp")
            return <FaArrowUp className='text-sm mr-1'/>
        if(icon == "FaArrowDown")
            return <FaArrowDown className='text-sm mr-1'/>
        else
            return <FaArrowRight className='text-sm mr-1'/>
    }

    return (
        <div className={props.style + " bg-white grow shrink-1 basis-64 px-5 py-4 flex flex-col items-start justify-center w-full border-r"}>
            <h1 className='font-semibold text-base'>{props.titulo}</h1>

            <div className='flex flex-row w-full'>
                <div className='w-full h-full flex flex-col items-start col-span-6 lg:col-span-2'>
                    <h2 className='text-indigo-600 text-3xl font-bold w-full'>
                        {props.content}
                    </h2>

                    <h3 className='text-sm w-full'>
                        {props.subinfo}
                    </h3>
                </div>
                
                <div className='w-min h-full flex items-end'>
                    <p className={' w-min h-min flex flex-row items-center px-2 py-0.5 rounded-full text-sm font-semibold text-white ' + (props.icone == "FaArrowUp" ? "bg-green-500" : "bg-red-500")}>
                        {verificarIcone(props.icone)}
                        {props.diferenca}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TotalizadorFianceiro;