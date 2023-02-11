import { BsPersonPlus } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineAddRoad } from "react-icons/md";

function Submenu(props){

    const icones = (item) => {
        if(item == 'BsPersonPlus')
            return <BsPersonPlus className="text-xl"/>
        if(item == 'BiSearchAlt')
            return <BiSearchAlt className="text-xl"/>
        if(item == 'AiOutlinePlusCircle')
            return <AiOutlinePlusCircle className="text-xl"/>
        if(item == 'MdOutlineAddRoad')
            return <MdOutlineAddRoad className="text-xl"/>
    }

    return(
        <a href={props.link} className='list-none flex flex-row items-center hover:bg-slate-100 cursor-pointer py-2 px-2 sm:px-8 rounded-md'>
            {icones(props.icon)}
            <p className='hidden sm:block pl-2 text-base font-semibold'>{props.titulo}</p>
        </a>
    )
}

export default Submenu;