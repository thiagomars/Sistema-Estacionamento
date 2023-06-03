import { BsPersonPlus, BsListNested } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineAddRoad, MdOutlineFormatListNumbered } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

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
        if(item == 'RxDashboard')
            return <RxDashboard className="text-xl"/>
        if(item == 'BsListNested')
            return <BsListNested className="text-xl"/>
        if(item == 'MdOutlineFormatListNumbered')
            return <MdOutlineFormatListNumbered className="text-xl"/>
    }

    return(
        <a href={props.link} className='list-none flex flex-row items-center hover:bg-slate-100 cursor-pointer py-2 px-2 sm:px-8 rounded-md'>
            {icones(props.icon)}
            <p className='hidden sm:block pl-2 text-base font-semibold'>{props.titulo}</p>
        </a>
    )
}

export default Submenu;