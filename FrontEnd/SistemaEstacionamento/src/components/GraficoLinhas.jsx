import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from 'axios';

export default function GraficoLinhas(props) {

    const gerarGrafico = () => {
        var config = {
            type: "line",
            data: {
                labels: props.dados.map(value => new Date(value.diaSemana).toLocaleDateString()),
                datasets: [
                    {
                        label: "Quantidade",
                        backgroundColor: "#3182ce",
                        borderColor: "#3182ce",
                        data: props.dados.map(value => value.quantidade),
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
        var ctx = document.getElementById(props.titulo).getContext("2d");
        window.myLine = new Chart(ctx, config);
    }

    useEffect(() => {
        gerarGrafico();
    }, [])

    return (
        <canvas className="my-5 max-h-64" id={props.titulo}></canvas>
    );
}