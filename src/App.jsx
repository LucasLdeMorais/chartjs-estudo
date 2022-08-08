import './App.css';
import { Box, Container } from '@mui/system';
import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import LinhaHorizontal from './components/graficos/linhaHorizontal/LinhaHorizontal copy';

function App() {
  return (<>
    {/* <AppBar className="app-header" position="fixed" component={'header'}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton >
          <Menu style={{ color: 'white' }}/>
        </IconButton>
        <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              style={{ marginLeft: '10px' }}>
              Chart.js
        </Typography>
      </Toolbar>
    </AppBar> */}
    <Container className="app">
      <Container className='main-container' component={'main'}>
        <Grid container spacing={2} className='grid-principal'>
          <Grid item xs={12}>
            <Paper className='painel' elevation={3}>
              <Box className='header-painel' style={{ marginBottom: 10 }}>
                <Typography component='h3' variant='h5' style={{ padding: 15 }}>Gráfico</Typography>
              </Box>
              <LinhaHorizontal />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
    </>);
}

export default App;
