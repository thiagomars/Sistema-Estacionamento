import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';

import { FaParking } from "react-icons/fa"
import { BsPrinterFill } from 'react-icons/bs';

function PagImpressao(props){

    const finalizado = <p className="w-min px-2 rounded-full">FINALIZADO</p>
    const estacionado = <p className="w-min px-2 rounded-full">ESTACIONADO</p>

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const formatarEndereco = (obj) => {
        const vetor = Object.values(obj);
        let endereco = "CEP: " + vetor[1] + " | " + vetor[5] + "/" + vetor[6] + " - " + vetor[2] + ", " + vetor[4] + ", Nº " + vetor[7] + " " + (vetor[3] ? "- Complemento: " + vetor[3] : "")
        return endereco;
    }

    useEffect(() => {
        handlePrint();
    }, [])

    return (
        <>
            <button onClick={handlePrint} className="bg-white border-2 border-gray-500 rounded-full p-1 fixed top-14 right-4 z-50 hover:bg-indigo-500 hover:border-indigo-600 hover:text-white">
                <BsPrinterFill className="text-lg"/>
            </button>

            <div ref={componentRef} className="mx-12 my-14 text-black">
                <div className="flex flex-row items-center w-full mb-8">
                    <div className="flex flex-col items-center border-r pr-2 mx-4">
                        <FaParking className="text-3xl mr-1"/>
                        <p className="text- font-semibold">PARKING</p>
                    </div>

                    <div>
                        <p className="font-bold text-lg">Listagem Clientes</p>
                        <p>Impressão em: {new Date().toLocaleString()}</p>
                    </div>
                </div>

                <table className='w-full text-xs text-left'>
                    <thead className='uppercase sticky top-0 bg-slate-100'>
                        <tr>
                            {
                                props.titulos.map(value => {
                                    return <th scope='col' className='text-center font-bold px-6 py-3 border'>{value}</th>
                                })
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            props.dados != "" ? props.dados.map((value, index) => {
                                return <tr className='border-b hover:bg-gray-50'>
                                    {
                                        Object.values(value).map((itens) => {
                                            return <th scope="row" className="font-normal border px-6 py-2">{typeof itens === 'object' && itens != null ? formatarEndereco(itens) : (typeof itens === "boolean" ? (itens == true ? finalizado : estacionado) : itens)}</th>
                                        })
                                    }
                                </tr>
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PagImpressao;