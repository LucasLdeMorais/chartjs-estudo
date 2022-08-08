import { useListState } from '@mantine/hooks';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineController,
    LineElement,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';
import { Box, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineController, 
    LineElement,
    Title,
    Tooltip,
    Legend
);
const options = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        tooltip: {
            position: 'nearest'
        },
        title: {
            display: false,
            text: 'Chart.js Horizontal Bar Chart',
        },
    },
};

function addDataset(setDatasets) {
    setDatasets.append(
        {
            label: 'UFPA',
            data: [500000, 62200, 250000, 356677, 423000, 323330, 20000, 10000],
            borderColor:'rgb(201, 60, 60)',
            backgroundColor: 'rgba(201, 60, 60, 0.5)',
            tension: 0.1,
            fill: false
        }
    )
}

const LinhaHorizontal =() => {
    
    const [datasets, setDatasets] = useListState([
            {
                label: 'UFRJ',
                data: [100000, 22200, 350000, 456677, 123000, 123330, 30000, 200000],
                borderColor:'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.1,
                fill: false
            },
            {
                label: 'UFF',
                data: [140000, 12200, 650000, 256677, 423000, 223330, 30000, 200000],
                borderColor:'rgb(71, 188, 159)',
                backgroundColor: 'rgba(71, 188, 159, 0.5)', 
                tension: 0.1,
                fill: false
            }
        ]
    );
   
    return(<Box className='container-grafico'>
            <IconButton onClick={
                (event) => { 
                    event.preventDefault(); 
                    addDataset(setDatasets)
                }
            }>
                <Add style={{ color: 'gray' }}/>
            </IconButton>
            <Line data={{
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
                datasets: datasets
            }} options={options}/>
         </Box>)
}
export default LinhaHorizontal;