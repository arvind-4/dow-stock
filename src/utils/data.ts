import { baseUrl } from '@src/config';

async function fetchData(start: string, end: string) {
  const res = await fetch(`${baseUrl}/api/stocks?start=${start}&end=${end}`);

  const json = await res.json();
  if (res.status !== 200) {
    return json['detail'];
  }
  const symbol = Object.keys(json.data)[0];

  const stockData = json.data[symbol];
  const labels = Object.keys(stockData).map((date) => date.slice(0, 10));
  const values = Object.values(stockData).map((val) => Number(val));
  return {
    labels,
    datasets: [
      {
        label: 'Dow 30',
        data: values,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };
}

export { fetchData };
