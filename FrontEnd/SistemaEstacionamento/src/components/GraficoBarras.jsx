import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from 'axios';

function GraficoBarras() {

  const [dados, setDados] = useState([]);

  const dadosGrafico = () => {
    axios.get('https://localhost:7270/api/Totalizadores/GraficoLinha')
      .then((response) => {
        setDados(response.data);
      })
  }

  const gerarGrafico = () => {
    var config = {
      type: "bar",
      data: {
        labels: dados.map(value => new Date(value.diaSemana).toLocaleDateString()),
        datasets: [{
          label: "Quantidades",
          data: dados.map(value => value.quantidade),
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
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
    };
    var ctx = document.getElementById("bar-chart").getContext("2d");
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
    <div className="bg-white flex flex-col w-full min-w-full h-min ">
      <div className="px-4 pt-3 pb-5 border-b">
        <h1 className="font-bold text-base uppercase">Quantidade de veículos que deram entrada</h1>
        <h2 className="font-semibold text-sm">Dados dos últimos 7 dias</h2>
      </div>
      
      <canvas className="my-3" id="bar-chart"></canvas>
    </div>
  )
}

export default GraficoBarras;