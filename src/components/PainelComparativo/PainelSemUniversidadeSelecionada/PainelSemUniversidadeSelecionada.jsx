
import { Typography } from '@mui/material';
import Painel from '../../paineis/Painel';

const PainelSemUniversidadeSelecionada = () => {
    return (
        <Painel tamanho={ "grande" } componente={ <Typography variant='h4' style={{margin: "5% 5%", color: "grey"}}>
            Adicione uma Universidade ao gráfico para ver mais detalhes aqui
        </Typography>} style={{backgroundColor: "darkgrey"}}/>
    )
}

export default PainelSemUniversidadeSelecionada