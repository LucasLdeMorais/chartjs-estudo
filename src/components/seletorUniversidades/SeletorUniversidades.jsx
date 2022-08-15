
import { Box } from '@mui/system';
import { Autocomplete, TextField, CircularProgress, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AddTwoTone } from '@mui/icons-material';
import { useListState } from '@mantine/hooks';

function SeletorUniversidades(listaUniversidades, handleSelecionarUniversidade) {

    const [ valorAutocomplete, setValorAutocomplete ] = useState()
    const [ universidades, setUniversidades ] = useListState([])
    const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)
    const loading = autocompleteAberto && listaUniversidades.length === 0;
    
    function handleSetAutocompleteAberto(value) {
        setAutocompleteAberto(value);
    }

    useEffect(() => {
        if(listaUniversidades && listaUniversidades.length > 0){
            setUniversidades.setState(listaUniversidades)
        }
    })
    

    return <Box style={{width: "100%"}}>
    <Autocomplete
        id="combo-box-universidades"
        style={{float: "left", width: "94%"}}
        value={ valorAutocomplete }
        onChange={ (event, newValue) => setValorAutocomplete(newValue) }
        loading={ loading }
        options={ universidades }
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
      <IconButton style={{float: "right", marginTop: "8px"}} onClick={() => { handleSelecionarUniversidade(valorAutocomplete) }}>
          <AddTwoTone></AddTwoTone>
      </IconButton>
    </Box>
}

export default SeletorUniversidades;