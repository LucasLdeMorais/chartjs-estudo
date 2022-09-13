import './App.css';
import { Box, Container } from '@mui/system';
import { Autocomplete, CircularProgress, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { AddTwoTone } from '@mui/icons-material';
import LinhaHorizontal from './components/graficos/linhaHorizontal/LinhaHorizontal';
import api from './services/api'
import React, { useState, useEffect, useRef } from 'react';
import { useListState } from '@mantine/hooks';
import SeletorUniversidades from './components/seletorUniversidades/SeletorUniversidades';
  // TODO: Olhar no figma exemplos de dashboard
  // TODO: Fazer ajustes relacionados ao desempenho da aplicação em redes mais lentas
    // * CHECK! TODO: Baixar emendas de acordo com as universidades selecionadas 
  // TODO: Separar emendas obtidas apartir das respectivas universidades
  // TODO: Gerar os datasets com base nas emendas obtidas
  // TODO: Passar os datasets pro componente de gráfico
  // TODO: Documentar todas as funções e só manter o que está sendo utilizado de fato

function App() {
  const [ universidade, setUniversidade ] = useState({})
  const [ listaUniversidades, setListaUniversidades ] = useListState([])
  const [ emendas, setEmendas ] = useListState([])
  const [ datasets, setDatasets ] = useListState([]);
  const [ universidadesSelecionadas, setUniversidadesSelecionadas ] = useListState([])
  const [ emendasAnoUniversidades, setEmendasAnoUniversidades ] = useListState([])
  const shoudLog = useRef(true)
  const loadingUniversidades = listaUniversidades.length === 0;
  const loadingEmendas = emendas.length === 0;
  const loadingEmendasAnoUniversidades = emendasAnoUniversidades.length === 0;
  const [ valorAutocomplete, setValorAutocomplete ] = useState()
  const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)
  const loading = autocompleteAberto && listaUniversidades.length === 0;
  const anos = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']

  async function recuperaListaUniversidades() {
    try {
      const {data} = await api.get('/universidades')
      setListaUniversidades.setState(data)
      console.log(listaUniversidades)
    } catch (e) {
      console.log(e.message)
    }
  }

  async function recuperaListaEmendas() {
    try {
      const {data} = await api.get('/emendas')
      setEmendas.setState(data)
      console.log(emendas)
    } catch (e) {
      console.log(e.message)
    }
  }

  //! COM PROBLEMA
  async function getEmendasUniversidade(universidade) {
    console.log(`========== Inicio getEmendasUniversidade ==========`)
    try {
      if (emendas.length === 0 || emendas.filter(value => value.sigla === universidade.sigla).length > 0) {
        console.log("já tem")
        return
      }
      console.log(`/emendas/uo?uo=${universidade.uo}`)
      const {data} = await api.get(`/emendas/uo?uo=${universidade.uo}`)
      console.log(data)
      setEmendas.append({
        siglaUniversidade: universidade.sigla,
        emendas: data.emendas
      })
      console.log(`========== Final getEmendasUniversidade COMPLETO ==========`)
    } catch(e) {
      console.log(e.message)
      console.log(`========== Final getEmendasUniversidade ERRO ==========`)
    }
  }

  // TODO: Revisar necessidade
  function handleSetTotalAnosUniversidades(universidades){
    universidades.forEach(universidade => calculaTotalAnosUniversidade(emendas, universidade, anos))
  }

  // TODO: Revisar se está certinho
  // * function calculaTotalAnosUniversidade
  /**
   * @param Emendas [..., {
   *  _id: "62c3b7fd152066fdca6c35b3"
   *  acao: "20GK - Fomento às Ações de Graduação, Pós-Graduação, Ensino, Pesquisa e Extensão"
   *  ​​​​​ano: 2022
   *  ​​​​autor: "Chiquinho Brazão"
   *  ​​​​autor_id: "62c3a6e9152066fdca6928fa"
   *  ​​​​dotacaoAtualEmenda: 2100000
   *  ​​​​dotacaoInicialEmenda: 2100000
   *  ​​​​empenhado: 0
   *  ​​​​gnd: "3 - Outras Despesas Correntes"
   *  ​​​​liquidado: 0
   *  ​​​​localizador: "0033 - No Estado do Rio de Janeiro"
   *  ​​​​modalidade: "90 - Aplicações Diretas"
   *  ​​​​naturezaDespesa: "33900000 - Aplicações Diretas"
   *  ​​​​nro: 39410011
   *  ​​​​nroUo: 26269
   *  ​​​​orgao: "26000 - Ministério da Educação"
   *  ​​​​pago: 0
   *  ​​​​partido: "AVANTE"
   *  ​​​​rp: "6 - Emendas Individuais"
   *  ​​​​tipoAutor: "Deputado Federal"
   *  ​​​​uo: "26269 - Fundação Universidade do Rio de Janeiro"
   *  ​​​​uo_id: "62bfa47e475cf2cc4e1ff39f"
   * }]
   * 
   * @param Universidade {
   *  uo: 26269,
   *  sigla: UFRJ
   * }
   * 
   * @param Anos [..., 2021, 2022]
   * 
   * @return pagoEmendasAno {
   *   siglaUniversidade: UFRJ,
   *   emendasPorAno: [100000, 22200, 350000, 456677, 123000, 123330, 30000, 200000]
   * }
   * 
  */
   function calculaTotalAnosUniversidade(emendas, universidade, anos) {
    console.log("calculaTotalAnosUniversidade")
    let pagoEmendasAno = []
    anos.forEach( ano => {
        let totalAno = 0
        emendas.forEach( emenda => {
          if (emenda.ano === ano && emenda.nroUo === universidade.uo) {
            totalAno = totalAno + emenda.pago
          }
        })
        pagoEmendasAno.push(totalAno)
    })
    console.log(pagoEmendasAno)
    return {
      siglaUniversidade: universidade.sigla,
      pagoEmendasAno: pagoEmendasAno
    }
  }
  
  // * function getTotalAnosUniversidades
  /**
   * 
    @returns  emendasPorAnoUniversidades [
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
    console.log('lel')
    console.log(emendasPorAnoUniversidades)
    return emendasPorAnoUniversidades
  }

  function handleSetAutocompleteAberto(value) {
    setAutocompleteAberto(value);
  }

  // ! ESTÁ COM PROBLEMA POR CONTA DO getEmendasUniversidade
  // * handleAdicionarUniversidade
  /**
   * * Inclui uma universidade na lista de universidades selecionadas, que serão exibidas no grafico
   * @param universidade { 
   *   _id: 1278as5d786as5d,
   *   sigla: UFRJ,
   *   uo: 26269
   * }
   * @returns emendasAnoUniversidades [
   *  {
   *    siglaUniversidade: UFRJ,
   *    emendasPorAno: [100000, 22200, 350000, 456677, 123000, 123330, 30000, 200000]
   *  }
   * ]
   */
  function handleAdicionarUniversidade(universidade) {
    try {
      console.log("==== início do handleAdicionarUniversidade ====")
      
      // Caso já tenha na lista, não faz nada
      // ? Poderia mostrar um feedback visual de erro
      if (universidadesSelecionadas.find(element => element === universidade)) {
        console.log("já tem")
        return
      }
      
      // Adiciona universidade selecionada na lista de selecionadas
      setUniversidadesSelecionadas.append(universidade)
      
      // Recupera a lista de emendas daquela universidade e adiciona na lista geral de emendas
      //! não está atualizando o valor do state de emendas a tempo
      getEmendasUniversidade(universidade)

      // Recupera a lista de emendas daquela universidade e salva em uma variável
      const emendasUniversidade = emendas.find(emenda => emenda.siglaUniversidade === universidade.sigla).emendas

      // Calcula o total pago em cada ano e adiciona na lista de valores pagos por ano (contém todas universidades selecionadas)
      let TotalAnosUniversidade = calculaTotalAnosUniversidade(emendasUniversidade, universidade, anos)
      setEmendasAnoUniversidades.append(TotalAnosUniversidade)
      console.log(emendasAnoUniversidades)
      console.log("==== final do handleAdicionarUniversidade ====")
    } catch (e) {
      console.log(e.message)
    }
  }

  // TODO: utilizar essa função de remoção da lista de universidadesSelecionadas no gráfico
  // * handleRemoverUniversidade
  /**
   * * Remove uma universidade do vetor de universidades selecionadas e suas respectivas emendas para fins de performance
   * @param universidade { 
   *   _id: 1278as5d786as5d,
   *   sigla: UFRJ,
   *   uo: 26269
   * }
   */
  function handleRemoverUniversidade(universidade) {
    try {
      console.log("==== início do handleRemoverUniversidade ====")
      
      // Caso não tenha na lista, não faz nada
      // ? Poderia mostrar um feedback de erro
      if (!universidadesSelecionadas.find(element => element === universidade)) {
        return
      }
      
      // filtra a universidade selecionada da lista de selecionadas e atribui a nova lista ao state (sem a universidade que seria removida)
      const selecionadasFiltered = universidadesSelecionadas.filter((value, index, arr) => { 
        return value !== universidade;
      });
      setUniversidadesSelecionadas.setState(selecionadasFiltered)
      console.log(universidadesSelecionadas)
      
      // filtra as emendas da universidade selecionada da lista geral de emendas
      const emendasFiltered = emendas.filter((value, index, arr) => { 
        return value.siglaUniversidade !== universidade;
      });
      setEmendas.setState(emendasFiltered)
      console.log(emendas)

      // filtra as emendas da universidade selecionada da lista de valores pagos por ano
      const emendasAnoUniversidadesFiltered = emendasAnoUniversidades.filter((value, index, arr) => { 
        return value.siglaUniversidade !== universidade;
      });
      setEmendasAnoUniversidades.setState(emendasAnoUniversidadesFiltered)
      console.log(emendasAnoUniversidades)

      console.log("==== final do handleRemoverUniversidade ====")
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    if (shoudLog.current) {
      if (listaUniversidades.length === 0) {
        recuperaListaUniversidades()
      }

      // if (universidadesSelecionadas.length > 0 && emendas.length > 0) {
      //   setTotalAnosUniversidades.setState(getTotalAnosUniversidades(emendas, universidadesSelecionadas, anos))
      // }
      // if (emendas.length > 0 && listaUniversidades.length > 0 && totalAnosUniversidades.length === 0){
      //   handleSetTotalAnosUniversidades()
      // }
    }
  })

  return (<Container className="app">
    <Container className='main-container' component={'main'}>
      <Box style={{width: "100%"}}>
        <SeletorUniversidades listaUniversidades={listaUniversidades} handleSelecionarUniversidade={handleAdicionarUniversidade} valorAutocomplete={valorAutocomplete} autocompleteAberto={autocompleteAberto} setValorAutocomplete={setValorAutocomplete} handleSetAutocompleteAberto={handleSetAutocompleteAberto}></SeletorUniversidades>
      </Box>
      <Grid container spacing={2} className='grid-principal'>
        <Grid item xs={12}>
          <Paper className='painel' elevation={3}>
            <Box className='header-painel' style={{ marginBottom: 10 }}>
              <Typography component='h3' variant='h5' style={{ padding: 15 }}>Gráfico</Typography>
            </Box>
            <LinhaHorizontal emendasUniversidades={emendasAnoUniversidades} anos={anos}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Container>);
}

export default App;
