import { RiLoader4Line } from 'react-icons/ri';

function Carregando(){
    
    
    return (
        <div className="absolute flex justify-center items-center top-0 left-0 z-40">
            <div className="h-screen w-screen bg-slate-200 opacity-5"></div>
            <div className="bg-white z-50 flex flex-row items-center fixed p-3 rounded-xl shadow-md animate-pulse">
                <div className='mr-4'>
                    <p className='text-2xl font-semibold '>Carregando...</p>
                </div>
                <RiLoader4Line className='animate-spin h-12 w-12 p-1 text-indigo-500 bg-indigo-50 rounded-full' viewBox="0 0 24 24" />
            </div>
        </div>
    )
}

export default Carregando;