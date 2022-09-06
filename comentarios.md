## Ajustes feitos: 
  chamadas http , se vc usa async entao vc precisa dos awaits, troquei os then pra awaits
  troque alguns hooks de ListState , para Usestate apenas
  component APP
   por conta de vc usar uma versao do react que implementa o strics mode, ele duplica as chamdas do usseEffect, coloquei um if com useRef pra garantir q ela so vai ser chamada 1 vez
   
   dentro do app pra garantir que uam variavel undefined n seja enviada pro grafico e quebre, coloquei uma verificação 
   
  
 ##  componente LinhaHorizontal
  	usei desestruturação pra pegar cada atributo especifico dos propos, como "anos" e "universidades"
  	Esse componente precisa ser "Reconstruido" sempre q novos dados entrarem, entao dentro do useEffect doi preciso colocar nos parametros a variavel emendasUniversidades, sempre q chegar valores novos , ela sera chamada fazendo com q o grafico seja reconstruido
  	
  	
## 	Obs : 
    Tive q mexer em uns detalhes na hroa de vc formar o objeto de emendas, eu n estava entendendo certo como alguns dados eram formados então dei uma mexida pra pegar a sigla da universidade.
  	
  	
  	
  	
## Conselhos: 
	Use typescript, demorei mt pra achar os problemas do codigo q na maioria das vezes eram variaveis ou tipos de variaveis.
	
## Maiores problemas: 
    Formatação dos dados, não consegui entender a coorelação dos dados com faculdades, se realmente existe, então fiz um grafico usando os dados sendo apenas de 1 faculdade, se existe uma coorelação , é necessario fazer um map pra separar os nomes de faculdades, depois disso vc sepera os valores pra cada
