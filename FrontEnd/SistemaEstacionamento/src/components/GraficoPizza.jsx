import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from 'axios';

function GraficoPizza(props) {

  const gerarGrafico = () => {
    var config = {
      type: "doughnut",
      data: {
        labels: props.dados.map(value => value.tipoVeiculo),
        datasets: [{
          label: 'My First Dataset',
          data: props.dados.map(value => value.quantidade),
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
    var ctx = document.getElementById(props.titulo).getContext("2d");
    window.myLine = new Chart(ctx, config);
  }

  React.useEffect(() => {
    gerarGrafico();
  }, []);

  return (
    <canvas className="my-3" id={props.titulo}></canvas>
  )
}

export default GraficoPizza;