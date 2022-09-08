
import { Box } from '@mui/system';
import { Autocomplete, TextField, CircularProgress, IconButton } from '@mui/material';
import React from 'react';
import { AddTwoTone } from '@mui/icons-material';

function SeletorUniversidades({listaUniversidades, handleSelecionarUniversidade, valorAutocomplete, autocompleteAberto, setValorAutocomplete, handleSetAutocompleteAberto}) {

    const loading = autocompleteAberto && listaUniversidades.length === 0;

    return <Box style={{width: "100%"}}>
    <Autocomplete
            id="combo-box-universidades"
            style={{float: "left", width: "94%"}}
            onOpen={handleSetAutocompleteAberto(true)}
            onClose={handleSetAutocompleteAberto(false)}
            value={ valorAutocomplete }
            onChange={ (event, newValue) => setValorAutocomplete(newValue) }
            loading={ loading }
            options={ listaUniversidades }
            getOptionLabel={(option) => option.nome}
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