import './App.css';
import { Box, Container } from '@mui/system';
import { Autocomplete, CircularProgress, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { AddTwoTone } from '@mui/icons-material';
import LinhaHorizontal from './components/graficos/linhaHorizontal/LinhaHorizontal';
import api from './services/api'
import React, { useState, useEffect } from 'react';
import { useListState } from '@mantine/hooks';

const anos = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];

function App() {
  // const [ valorAutocomplete, setValorAutocomplete ] = useState()
  const [ universidade, setUniversidade ] = useState({})
  const [ listaUniversidades, setListaUniversidades ] = useListState([])
  const [ emendas, setEmendas ] = useListState([])
  const [ universidadesSelecionadas, setUniversidadesSelecionadas ] = useListState([{
    _id: "62bfa47e475cf2cc4e1ff3b3",
    nome: "Universidade Federal do Rio de Janeiro",
    sigla: "UFRJ",
    uo: 26245
  }])
  const [ totalAnosUniversidades, setTotalAnosUniversidades ] = useListState([])
  const loadingUniversidades = listaUniversidades.length === 0;
  const loadingEmendas = emendas.length === 0;
  const loadingTotalAnosUniversidades = totalAnosUniversidades.length === 0;
  
  // const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)
  // const loading = autocompleteAberto && listaUniversidades.length === 0;

  // function handleSelecionarUniversidade(universidade) {
  //   if(!(universidadesSelecionadas.includes(universidade)) && universidade !== null) {
  //       setUniversidadesSelecionadas.append(universidade)
  //       console.log(universidadesSelecionadas)
  //   }
  // }

  // function handleSetAutocompleteAberto(value) {
  //   if (value) {
  //     setListaUniversidades.setState(recuperaListaUniversidades())
  //   } 
  //   setAutocompleteAberto(value);
  // }

  async function recuperaListaUniversidades() {
    try {
      const arr = [] 
      await api.get('/universidades/uo?uo=26269').then((response) => { 
        console.log("UNI")
        arr.push(response.data) 
        setListaUniversidades.setState(arr)
        console.log(listaUniversidades)
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  async function recuperaListaEmendas() {
    try {
      await api.get('/emendas/uo?uo=26269').then((response) => {
        setEmendas.setState(response.data)
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  function handleSetTotalAnosUniversidades(){
    setTotalAnosUniversidades.setState(getTotalAnosUniversidades(emendas, listaUniversidades, anos))
  }

  function calculaTotalAnosUniversidade(emendas, universidade, anos) {
    console.log("calculaTotalAnosUniversidade")
    const emendasPorAnoUniversidade = []
    console.log(emendas)
    anos.forEach( ano => {
        let totalUniversidadeAno = 0
        emendas.forEach( emenda => {
          console.log(emenda)
          if (emenda.ano === ano && emenda.uo === universidade) {
            console.log('pago')
            console.log(emenda.pago)
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
    /*
    [
      {
        universidade: UFRJ,
        emendas: [ 2500000, ... ]
      },
      {
        universidade: UFF,
        emendas: [ 1250000, ... ]
      },
      ...
    ]
  */
    console.log('lel')
    console.log(emendasPorAnoUniversidades)
    return emendasPorAnoUniversidades
  }

  useEffect(() => {
    if (emendas.length === 0) {
      recuperaListaEmendas()
    }
    if (listaUniversidades.length === 0) {
      recuperaListaUniversidades()
    }
    if (emendas.length > 0 && listaUniversidades.length > 0 && totalAnosUniversidades.length === 0){
      handleSetTotalAnosUniversidades()
    }
  })

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
              <LinhaHorizontal emendasUniversidades={setTotalAnosUniversidades} anos={anos}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>);
}

export default App;
