
import { Paper, Typography, Box } from '@mui/material';
import Painel from './../../paineis/Painel';
import GraficoEmendasAcao from '../../graficos/GraficosPequenos/GraficoEmendasAcao/GraficoEmendasAcao';
import GraficoEmendasPartido from '../../graficos/GraficosPequenos/GraficoEmendasPartido';
import SeletorAnos from '../../seletorAnos/SeletorAnos';

// ? Filtragem por ano deve ser feita no componente pai e passar o array filtrado no emendasUniversidade

const PainelDetalhesUniversidade = ({titulo, handleRemover, indice, emendasUniversidade}) => {
    const totalPago = emendasUniversidade.reduce((acc, obj) => {
        return acc + obj.pago
    }, 0)

    const totalEmpenhado = emendasUniversidade.reduce((acc, obj) => {
        return acc + obj.empenhado
    }, 0)

    return (
        <Painel titulo={ titulo } header removivel removerItem={handleRemover} tamanho={ "grande" } componente={ 
            <>
                {/** <SeletorAnos setAnoSelecionado={} anoSelecionado={} anos={[]}/> */}
                <GraficoEmendasAcao emendasUniversidade={emendasUniversidade} styleGrafico={{maxHeight: "200px", maxWidth: "max-content"}} styleBox={{marginLeft: '10px' ,marginBottom: "25px"}}/>
                <GraficoEmendasPartido emendasUniversidade={emendasUniversidade} styleGrafico={{maxHeight: "200px"}} styleBox={{marginBottom: "25px"}}/>
                <Box style={{float: "right", marginRight: "2%", marginTop: "3%"}}>
                    {
                    /**
                     * ! fazer componente separado e colocar um indicador de com ano ou sem ano especificado
                    */
                    }
                    <Paper elevation={2} style={{padding: "10px", width: "max-content"}}>
                        <Typography variant="h7" style={{}}>Total empenhado: {totalEmpenhado.toLocaleString()}</Typography>
                    </Paper>
                    <Paper elevation={2} style={{float: "right",padding: "10px", marginTop: "25px", width: "max-content"}}>
                        <Typography variant="h7" style={{}}>Total pago: {totalPago.toLocaleString()}</Typography>
                    </Paper>
                </Box>
            </>
        } indice={ indice } style={{height: "max-content"}} />
    )
}

export default PainelDetalhesUniversidade;