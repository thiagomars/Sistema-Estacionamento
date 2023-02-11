import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from 'axios';

function GraficoPizza() {

  const [dados, setDados] = useState([]);

  const dadosGrafico = () => {
    axios.get('https://localhost:7270/api/Totalizadores/GraficoPizza')
      .then((response) => {
        setDados(response.data);
      })
  }

  const gerarGrafico = () => {
    var config = {
      type: "doughnut",
      data: {
        labels: dados.map(value => value.tipoVeiculo),
        datasets: [{
          label: 'My First Dataset',
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
          hoverOffset: 9
        }],
      },
    };
    var ctx = document.getElementById("pizza-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }

  React.useEffect(() => {
    dadosGrafico();
  }, []);

  useEffect(() => {
    gerarGrafico();
  }, dados)

  return (
    <div className="bg-white flex flex-col w-full min-w-full h-min ">
      <div className="px-4 pt-3 pb-5 border-b">
        <h1 className="font-bold text-base uppercase">Quantidade de veículos cadastrados</h1>
        <h2 className="font-semibold text-sm">Dados organizados pelo tipo</h2>
      </div>
      <canvas className="my-3" id="pizza-chart"></canvas>
    </div>
  )
}

export default GraficoPizza;