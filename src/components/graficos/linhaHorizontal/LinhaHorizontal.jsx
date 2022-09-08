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
import { Box, CircularProgress } from '@mui/material';
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
        console.log('useEffect LinhaHorizontal',emendasUniversidades, anos);
        if(emendasUniversidades && emendasUniversidades.emendas && emendasUniversidades.emendas.length > 0){
            if(emendasUniversidades.emendas !== datasets){
                console.log('gerar datasets');
                getDatasets(emendasUniversidades)
            }
        }
    },[emendasUniversidades])

    // ! Revisar
    // * function getDatasets
    /**
     * @param emendasUniversidades [ ..., {
     *      universidade: UFRJ
     *      emendasPorAno: [ ..., 2500000, 1500000 ]
     *    }
     *  ]
     * 
     * @return [ ...,
     *  {
     *    label: UFRJ,
     *    data: [ ..., 2500000, 1500000 ],
     *    borderColor: 'rgb('150','150','150')',
     *    backgroundColor: 'rgba('150', '150', '150', 0.5 )',
     *    tension: 0.2,
     *    fill: false
     *  }
     * ]
     */ 
    function getDatasets(emendasUniversidadesAnos) {
        const datasets = []
        emendasUniversidadesAnos.forEach( universidade => {
            const colorRgb = randomPastelColorRGB()
            const color = getRgbString(colorRgb, false)
            datasets.push({
                label: universidade.siglaUniversidade,
                data: universidade.emendasPorAno,
                borderColor: color,
                backgroundColor: color,
                tension: 0.2,
                fill: false
            })
        })
        return datasets
    }

    return(<Box className='container-grafico'>
            {
                datasets.length === 0 ? <CircularProgress color="inherit" size={40} /> : <Line data={{
                    labels: anos,
                    datasets: datasets
                }} options={options}/>
            }
         </Box>)
}
export default LinhaHorizontal;