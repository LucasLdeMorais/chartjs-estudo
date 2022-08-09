import './App.css';
import { Box, Container } from '@mui/system';
import { Autocomplete, CircularProgress, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { AddTwoTone } from '@mui/icons-material';
import LinhaHorizontal from './components/graficos/linhaHorizontal/LinhaHorizontal';
import api from './services/api'
import React, { useState, useEffect } from 'react';
import { useListState } from '@mantine/hooks';

const anos = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];

function calculaTotalAnosUniversidade(emendas, universidade, anos) {
  const emendasPorAnoUniversidade = []
  anos.forEach( ano => {
      let totalUniversidadeAno = 0
      emendas.forEach( emenda => {
          if (emenda.ano === ano && emenda.uo === universidade) {
            totalUniversidadeAno += emenda.pago
          }
      })
      emendasPorAnoUniversidade.push(totalUniversidadeAno)
  })
  /* [
      2500000,
        ...
      ]
  */
  return emendasPorAnoUniversidade
}


function getTotalAnosUniversidades(emendas, universidades, anos) {
  const emendasPorAnoUniversidades = []
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
  return emendasPorAnoUniversidades
}

function App() {
  const [ valorAutocomplete, setValorAutocomplete ] = useState()
  const [ universidade, setUniversidade ] = useState(null)
  const [ listaUniversidades, setListaUniversidades ] = useListState([])
  const [ emendas, setEmendas ] = useListState([])
  const [ universidadesSelecionadas, setUniversidadesSelecionadas ] = useListState([{
    _id: "62bfa47e475cf2cc4e1ff3b3",
    nome: "Universidade Federal do Rio de Janeiro",
    sigla: "UFRJ",
    uo: 26245
  }])
  const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)
  const loading = autocompleteAberto && listaUniversidades.length === 0;

  function handleSelecionarUniversidade(universidade) {
    if(!(universidadesSelecionadas.includes(universidade)) && universidade !== null) {
        setUniversidadesSelecionadas.append(universidade)
        console.log(universidadesSelecionadas)
    }
  }

  function handleSetAutocompleteAberto(value) {
    if (value) {
      setListaUniversidades.setState(recuperaListaUniversidades())
    } 
    setAutocompleteAberto(value);
  }

  async function recuperaListaUniversidades() {
    await api.get('/universidades').then((response) => { 
      console.log("UNI")
      console.log(response.data)
      setListaUniversidades.setState(response.data) 
    })
  }

  async function recuperaListaEmendas() {
    
    await api.get('/emendas').then((response) => { 
      console.log("emendas")
      console.log(response.data)
      setEmendas.setState(response.data)
    })
  }

  useEffect(() => {
    if (emendas.length === 0) {
      recuperaListaEmendas()
    }
    if (listaUniversidades.length === 0) {
      recuperaListaUniversidades()
    }
  })

  return (<>
    <Container className="app">
      <Container className='main-container' component={'main'}>
      <Box style={{width: "100%"}}>
        <Autocomplete
            id="combo-box-universidades"
            style={{float: "left", width: "94%", marginTop: "15px",marginLeft: "15px"}}
            value={ valorAutocomplete }
            onChange={ (event, newValue) => setValorAutocomplete(newValue) }
            loading={ loading }
            options={ listaUniversidades }
            getOptionLabel={(option) => `${option.nome}`}
            noOptionsText="Vazio"
            renderInput={(params) => <TextField {...params} 
                label="Universidades Federais"
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                    <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                    ),
                }}
            />}
            renderOption={(props, listaUniversidades) => (
                <Box component="li" {...props} key={listaUniversidades._id}>
                    {listaUniversidades.nome} - {listaUniversidades.sigla}
                </Box>
            )}
          />
          <IconButton style={{float: "right", marginTop: "22px"}} onClick={() => { handleSelecionarUniversidade(valorAutocomplete) }}>
              <AddTwoTone></AddTwoTone>
          </IconButton>
        </Box>
        <Grid container spacing={2} className='grid-principal'>
          <Grid item xs={12}>
            <Paper className='painel' elevation={3}>
              <Box className='header-painel' style={{ marginBottom: 10 }}>
                <Typography component='h3' variant='h5' style={{ padding: 15 }}>Gráfico</Typography>
              </Box>
              <LinhaHorizontal emendasUniversidades={getTotalAnosUniversidades(emendas, universidadesSelecionadas, anos)} anos={anos}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
    </>);
}

export default App;
