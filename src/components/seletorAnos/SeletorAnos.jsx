import "./seletorAnos.css";
import { Grid, Paper, CardActionArea, Typography, CardContent } from '@mui/material';


const SeletorAnos = ({anos, setAnoSelecionado, anoSelecionado}) => {
    return ( anos.map((Ano, index) => (
        <Grid item xs={1} key={index}>
            <Paper className='seletorAnos' elevation={3}>
                <CardActionArea style={{height: 50, width: '100%', padding: '10px'}} onClick={(event) => {
                    event.preventDefault()
                    if (Ano === anoSelecionado) {
                        setAnoSelecionado(0)
                    } else {
                        setAnoSelecionado(Ano)
                    }
                }}>
                    <CardContent style={{padding: 0, textAlign:'center'}}>
                        <Typography component="h3" variant="h6">{Ano}</Typography>
                    </CardContent>
                </CardActionArea>
            </Paper>
        </Grid>
    )))
}

export default SeletorAnos;
