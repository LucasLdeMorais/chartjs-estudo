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
import { useListState } from '@mantine/hooks';

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
    
    const [datasets, setDatasets] = useListState([]);

    useEffect(() => {
        console.log('useEffect LinhaHorizontal',emendasUniversidades, anos);
        if(emendasUniversidades && emendasUniversidades.length > 0){
            emendasUniversidades.forEach(universidade => {
                if(!datasets.includes(dataset => universidade.siglaUniversidade === dataset.label)){
                    const dataset = getDataset(universidade)
                    setDatasets.append(dataset)
                }
            })
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
    function getDataset(universidade) {
        const colorRgb = randomPastelColorRGB()
        const color = getRgbString(colorRgb, false)
        return {
            label: universidade.siglaUniversidade,
            data: universidade.pagoEmendasAno,
            borderColor: color,
            backgroundColor: color,
            tension: 0.2,
            fill: false
        }
    }

    return(<Box className='container-grafico'>
                { datasets.length > 0 ? <Line data={{
                    labels: anos,
                    datasets: datasets
                }} options={options}/> : <></>}
         </Box>)
}
export default LinhaHorizontal;