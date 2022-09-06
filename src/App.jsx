import './App.css';
import { Box, Container } from '@mui/system';
import { Autocomplete, CircularProgress, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { AddTwoTone, SpaRounded } from '@mui/icons-material';
import LinhaHorizontal from './components/graficos/linhaHorizontal/LinhaHorizontal';
import api from './services/api'
import React, { useState, useEffect, useRef } from 'react';
import { useListState } from '@mantine/hooks';

const anos = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];

function App() {
  // const [ valorAutocomplete, setValorAutocomplete ] = useState()
  const [ universidade, setUniversidade ] = useState({})
  const [ aff, setAff ] = useState('teset')
  const [ listaUniversidades, setListaUniversidades ] = useState([])
  const [ emendasList, setEmendasList ] = useState([])
  const shoudLog = useRef(true)
  const [ universidadesSelecionadas, setUniversidadesSelecionadas ] = useListState([{
    _id: "62bfa47e475cf2cc4e1ff3b3",
    nome: "Universidade Federal do Rio de Janeiro",
    sigla: "UFRJ",
    uo: 26245
  }])
  const [ totalAnosUniversidades, setTotalAnosUniversidades ] = useState([])

  // const loadingUniversidades = listaUniversidades.length === 0;
  // const loadingEmendas = emendas.length === 0;
  // const loadingTotalAnosUniversidades = totalAnosUniversidades.length === 0;
  
  useEffect(() => {
    if(shoudLog.current){

      if (emendasList.length === 0) {
        recuperaListaEmendas()
      }
      if (listaUniversidades.length === 0) {
        recuperaListaUniversidades()
      }
      if (emendasList.length > 0 && listaUniversidades.length > 0 && totalAnosUniversidades.length === 0){
        console.log('e maior');
        handleSetTotalAnosUniversidades()
      }
      shoudLog.current = false;
      console.log('hello')
    }
  })

  function handleSetTotalAnosUniversidades(){
    setTotalAnosUniversidades(getTotalAnosUniversidades(emendasList, listaUniversidades, anos))
  }

  function getTotalAnosUniversidades(emendas, universidades, anos) {
    const emendasPorAnoUniversidades = []
    if(emendas.length === 0 || universidades.length === 0) {
      return
    }
    universidades.forEach( universidade => {
      let emendasAnosUniversidade = {
        universidade: universidade.sigla,
        emendas: []
      }
      emendasAnosUniversidade['emendas'] = calculaTotalAnosUniversidade(emendas, universidade, anos)
      emendasPorAnoUniversidades.push(emendasAnosUniversidade)
    })
    return emendasPorAnoUniversidades
  }

  function calculaTotalAnosUniversidade(emendas, universidade, anos) {
    const emendasPorAnoUniversidade = []
    anos.forEach( ano => {
        let totalUniversidadeAno = 0
        emendas.forEach( emenda => {
          if (emenda.ano === ano && emenda.uo === universidade) {
            totalUniversidadeAno = totalUniversidadeAno + emenda.pago
          }
        })
        emendasPorAnoUniversidade.push(totalUniversidadeAno)
    })
    /* [
        2500000,
          ...
        ]
    */
    console.log(emendasPorAnoUniversidade)
    return emendasPorAnoUniversidade
  }
  async function recuperaListaUniversidades() {
    try {
      const arr = [] 
     const {data} = await api.get('/universidades/uo?uo=26269')
        arr.push(data) 
        setListaUniversidades([...listaUniversidades, data])
    } catch (e) {
      console.log(e.message)
    }
  }

  async function recuperaListaEmendas() {
    try {
     const {data} =  await api.get('/emendas/uo?uo=26269')
     let mapData = {
        total:data.total,
        universidade: universidadesSelecionadas[0].sigla,
        emendas:data.emendas.map(v=>v.pago)
      }
      setEmendasList(mapData)
      console.log('chegamos', mapData);
    } catch (e) {
      console.log(e.message)
    }
  }
  function handleAdicionarUniversidade() {

  }
      return (<Container className="app">
      <Container className='main-container' component={'main'}>
        <Box style={{width: "100%"}}>
          <IconButton style={{float: "right", marginTop: "22px"}} onClick={() => { handleAdicionarUniversidade() }}>
              <AddTwoTone></AddTwoTone>
          </IconButton>
        </Box>
        <Grid container spacing={2} className='grid-principal'>
          <Grid item xs={12}>
            <Paper className='painel' elevation={3}>
              <Box className='header-painel' style={{ marginBottom: 10 }}>
                <Typography component='h3' variant='h5' style={{ padding: 15 }}>Gráfico</Typography>
              </Box>
              <LinhaHorizontal emendasUniversidades={emendasList} anos={anos}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>);
}

export default App;
