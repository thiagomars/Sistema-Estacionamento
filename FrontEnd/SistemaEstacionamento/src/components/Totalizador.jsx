import { RiPercentFill } from 'react-icons/ri';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { AiOutlineBlock } from 'react-icons/ai';
import { GiCarWheel } from 'react-icons/gi';

function Totalizador(props){

    const icones = (item) => {
        if(item == 'RiPercentFill')
            return <RiPercentFill className={props.styleIcon + ' text-2xl'}/>
        
        if(item == 'AiOutlineBlock')
            return <AiOutlineBlock className={props.styleIcon + ' text-2xl'}/>
        
        if(item == 'BsPersonBoundingBox')
            return <BsPersonBoundingBox className={props.styleIcon + ' text-2xl'}/>
        
        if(item == 'GiCarWheel')
            return <GiCarWheel className={props.styleIcon + ' text-2xl'}/>
    }

    return (
        <div className={'bg-white grow shrink-1 basis-48 p-5 flex items-center rounded-lg w-full shadow-md'}>
            <div className= {props.backIcon + ' rounded-full p-3 mr-3 min-h-max shadow-md'}>
                {icones(props.icone)}
            </div>
            <div>
                <p className='text-sm'>{props.titulo}</p>
                <p className='font-semibold text-lg'>{props.quantidade == null ? null : props.quantidade}</p>
            </div>
        </div> 
    )
}

export default Totalizador;