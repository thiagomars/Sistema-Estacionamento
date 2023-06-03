import React, { useEffect, useState } from "react";
import Chart from "chart.js";

function GraficoBarras(props) {

  var config = {
    type: "bar",
    data: {
      labels: props.dadosGraficoBarras.map(value => new Date(value.diaSemana).toLocaleDateString()),
      datasets: [{
        label: "Quantidades",
        data: props.dadosGraficoBarras.map(value => value.quantidade),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          '#D15A9D',
          'rgb(255, 205, 86)',
          '#54A870',
          '#625D96',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          '#F9F871',
          'rgb(201, 203, 207)',
          '#93220C'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          '#D15A9D',
          'rgb(255, 205, 86)',
          '#54A870',
          '#625D96',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          '#F9F871',
          'rgb(201, 203, 207)',
          '#93220C'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  }

  const gerarGrafico = () => {
    var ctx = document.getElementById(props.titulo).getContext("2d");
    window.myLine = new Chart(ctx, config);
  }

  useEffect(() => {
    gerarGrafico();
  }, [])

  return (
    <canvas className="my-3" id={props.titulo}></canvas>
  )
}

export default GraficoBarras;