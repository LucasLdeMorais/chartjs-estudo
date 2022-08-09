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
import { useEffect } from 'react';
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


/*
    [
        {
            universidade: UFRJ,
            emendas: [ 2000000, ... ]
        },
        ...
    ]
*/
function getDatasets(emendasUniversidades) {
    const datasets = []
    emendasUniversidades.forEach( universidade => {
        const colorRgb = randomPastelColorRGB()
        const color = getRgbString(colorRgb, false)
        datasets.push({
            label: universidade.universidade,
            data: universidade.emendas,
            borderColor: color,
            backgroundColor: color,
            tension: 0.1,
            fill: false
        })
    })
    return datasets
}

const LinhaHorizontal = (emendasUniversidades) => {
    
    const [datasets, setDatasets] = useListState([]);

    useEffect(() => {
        if(emendasUniversidades && emendasUniversidades.length > 0){
            if(emendasUniversidades !== datasets){
                setDatasets.setState(getDatasets(emendasUniversidades))
            }
        }
    })
   
    return(<Box className='container-grafico'>
            <Line data={{
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
                datasets: datasets
            }} options={options}/>
         </Box>)
}
export default LinhaHorizontal;