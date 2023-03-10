import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from 'axios';

export default function GraficoLinhas() {

    const [dados, setDados] = useState([]);

    const dadosGrafico = () => {
        axios.get('https://localhost:7270/api/Totalizadores/GraficoLinha')
            .then((response) => {
                setDados(response.data);
            })
    }

    const gerarGrafico = () => {
        var config = {
            type: "line",
            data: {
                labels: dados.map(value => new Date(value.diaSemana).toLocaleDateString()),
                datasets: [
                    {
                        label: "Quantidade",
                        backgroundColor: "#3182ce",
                        borderColor: "#3182ce",
                        data: dados.map(value => value.quantidade),
                        fill: false,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Sales Charts",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "gray",
                    },
                    align: "center",
                    position: "top",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "rgb(95, 116, 141)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "rgb(95, 116, 141)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(95, 116, 141, 0.2)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
    }



    React.useEffect(() => {
        
        dadosGrafico();

        
    }, []);

    useEffect(() => {
        console.log(dados.map(value => value.diaSemana));
        gerarGrafico();
    }, dados)

    return (
        <div className="bg-white flex flex-col w-full ">
            <div className="px-4 pt-3 pb-5 border-b">
                <h1 className="font-bold text-base uppercase">Quantidade de ve??culos que deram entrada</h1>
                <h2 className="font-semibold text-sm">Dados dos ??ltimos 7 dias</h2>
            </div>

            <canvas className="my-5 max-h-64" id="line-chart"></canvas>
        </div>
    );
}