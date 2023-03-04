import * as Chart from 'chart.js';
import { CovidData, get_covid_data } from './rust_lib';

async function loadWasm() {
  const response = await fetch('rust_lib_bg.wasm');
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes);
  return instance.exports;
}

async function renderChart() {
  const wasm = await loadWasm();
  const covidData = wasm.__wbindgen_deserialize(get_covid_data());

  const chartData = {
    labels: covidData.map((d) => d.date),
    datasets: [
      {
        label: 'COVID-19 Cases',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: covidData.map((d) => d.cases),
      },
    ],
  };

  const chartConfig = {
    type: 'line',
    data: chartData,
    options: {},
  };

  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  new Chart(ctx, chartConfig);
}

renderChart();