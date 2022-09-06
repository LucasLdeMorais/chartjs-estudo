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
import { Box, IconButton, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
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

function randomPastelColorRGB(){
    var r = (Math.round(Math.random()* 127) + 127);
    var g = (Math.round(Math.random()* 127) + 127);
    var b = (Math.round(Math.random()* 127) + 127);
    return [r,g,b]
}

function getRgbString(rgb, translucido) {
    let r = rgb[0]
    let g = rgb[1]
    let b = rgb[2]
    if(translucido){
        return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5 )';
    }
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}



function LinhaHorizontal({emendasUniversidades, anos}) {
    
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        console.log('use effect',emendasUniversidades,anos);
        if(emendasUniversidades && emendasUniversidades.emendas && emendasUniversidades.emendas.length > 0){
            if(emendasUniversidades.emendas !== datasets){
                console.log('aff');
                getDatasets(emendasUniversidades)
            }
        }
    },[emendasUniversidades])

    function getDatasets(emendasUniversidades) {
        const datasets = []
        console.log('emendas1 ', emendasUniversidades);
        const values = [...new Set(emendasUniversidades.emendas)]
            const colorRgb = randomPastelColorRGB()
            const color = getRgbString(colorRgb, false)

            datasets.push({
                label: emendasUniversidades.universidade,
                data: values,
                borderColor: color,
                backgroundColor: color,
                tension: 0.2,
                fill: false
            })
        setDatasets(datasets);
    }
    return(<Box className='container-grafico'>
            {
                datasets.length === 0 ? <CircularProgress color="inherit" size={40} /> : <Line data={{
                    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
                    datasets: datasets
                }} options={options}/>
            }
         </Box>)
}
export default LinhaHorizontal;