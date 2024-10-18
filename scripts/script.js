// Função para calcular EPU (Espessura do Filme Úmido)

function calcularEPU() {
    // Obtenha os valores inseridos
    const epsSeca = parseFloat(document.getElementById("eps-seca").value);
    const sv = parseFloat(document.getElementById("sv").value);
    const diluicao = parseFloat(document.getElementById("diluicao").value);
    
    // Verifique se os valores são válidos
    if (isNaN(epsSeca) || isNaN(sv) || isNaN(diluicao)) {
        alert("Por favor, insira valores válidos.");
        return;
    }
        
    // Calculo Solido por volume Corrigido = (sv*100)/(100+diluicao)
    const svCorrigido = (sv*100)/(100+diluicao)


    // Calcule a EPU com a fórmula EPU = EPS x (100 + %DIL) / SV
    let epuUmida = (epsSeca * (100 + diluicao)) / svCorrigido;
        
    // Arredondar para o número inteiro mais próximo
    epuUmida = Math.round(epuUmida);

    // Exiba o resultado na caixa de texto "epu-umida"
    document.getElementById("epu-umida").value = epuUmida.toFixed(2);
}

function limpar() {
    // Limpar todos os campos de entrada
    document.getElementById("eps-seca").value = '';
    document.getElementById("sv").value = '';
    document.getElementById("diluicao").value = '';
    document.getElementById("epu-umida").value = ''; // Limpa a caixa de resultado também
}

/// Função para calcular a espessura da película seca (EPS)
function calcularEPS() {

    // Obter os valores dos campos de entrada
    var epuUmida = parseFloat(document.getElementById("epu-umida-seca").value);
    var sv = parseFloat(document.getElementById("sv-seca").value);
    var diluicao = parseFloat(document.getElementById("diluicao-seca").value);

    // Verificar se os valores são válidos (não vazios ou NaN)
    if (isNaN(epuUmida) || isNaN(sv) || isNaN(diluicao)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Calcular EPS com a fórmula: EPS = (EPU * SV) / (100 + %DIL)
    let epsSeca = (epuUmida * sv) / (100 + diluicao);

      // Arredondar para o número inteiro mais próximo
      epsSeca = Math.round(epsSeca);

    // Exibir o resultado no campo de texto "eps-seca" arredondado para 2 casas decimais
    document.getElementById("eps-seca-umida").value = epsSeca.toFixed(2);
}

// Função para limpar os campos de entrada e o resultado
function limparEPS() {
    // Limpar todos os campos de entrada e o campo de resultado
    document.getElementById("epu-umida-seca").value = "";
    document.getElementById("sv-seca").value = "";
    document.getElementById("diluicao-seca").value = "";
    document.getElementById("eps-seca-umida").value = ""; // Limpar o campo de resultado
}

// Função para calcular Relação de Mistura

function calcularMistura() {
    var relacaoA = parseFloat(document.getElementById("relacaoA").value);
    var relacaoB = parseFloat(document.getElementById("relacaoB").value);
    var volumeDesejado = parseFloat(document.getElementById("volumeDesejado").value);
    var proporcaoDiluente = parseFloat(document.getElementById("proporcaoDiluente").value);
    
    // Calcular volumes de A, B e diluente
    var totalComponenteA = (relacaoA / (relacaoA + relacaoB)) * volumeDesejado;
    var totalComponenteB = (relacaoB / (relacaoA + relacaoB)) * volumeDesejado;
    var totalDiluente = (totalComponenteA + totalComponenteB) * (proporcaoDiluente / 100);

    // Verificar e ajustar as unidades de medida
    var unidadeA = "L", unidadeB = "L", unidadeDiluente = "L";
    
    if (totalComponenteA < 1) {
        totalComponenteA *= 1000;
        unidadeA = "ml";
    }
    if (totalComponenteB < 1) {
        totalComponenteB *= 1000;
        unidadeB = "ml";
    }
    if (totalDiluente < 1) {
        totalDiluente *= 1000;
        unidadeDiluente = "ml";
    }

     // Arredondar para o número inteiro mais próximo
     totalComponenteA = Math.round(totalComponenteA);
     totalComponenteB = Math.round(totalComponenteB);
     totalDiluente = Math.round(totalDiluente);



    // Exibir o resultado com cada componente em linhas separadas
    document.getElementById("resultado-mistura").innerHTML = 
        "Componente A: " + totalComponenteA.toFixed(2) + unidadeA + "<br>" + 
        "Componente B: " + totalComponenteB.toFixed(2) + unidadeB + "<br>" + 
        "Diluente: " + totalDiluente.toFixed(2) + unidadeDiluente;
}

function limparMistura() {
    document.getElementById("relacaoA").value = "";
    document.getElementById("relacaoB").value = "";
    document.getElementById("volumeDesejado").value = "";
    document.getElementById("proporcaoDiluente").value = "";
    document.getElementById("resultado-mistura").innerHTML = "";
}

// Função para atualizar automaticamente o campo de Perda (%) baseado no método de aplicação
function atualizarPerda() {
    var metodoAplicacao = document.getElementById("metodo-aplicacao").value;
    var perdaInput = document.getElementById("perda-01");
    
    if (metodoAplicacao === "pincel") {
        perdaInput.value = 15; // média entre 10 a 20%
    } else if (metodoAplicacao === "rolo") {
        perdaInput.value = 20; // média entre 10 a 30%
    } else if (metodoAplicacao === "pistola-convencional") {
        perdaInput.value = 40; // média entre 30 a 50%
    } else if (metodoAplicacao === "pistola-airless") {
        perdaInput.value = 20; // média ajustada para obter RP correto
    } else {
        perdaInput.value = ""; // Limpa o campo se não houver método selecionado
    }
}


// Função para calcular Rendimento Teórico e Prático
function calcularRendimento() {
    // Obtém os valores dos campos de entrada usando os IDs corretos
    var epsSeca = parseFloat(document.getElementById("eps-seca-01").value);
    var sv = parseFloat(document.getElementById("sv-01").value);
    var perda = parseFloat(document.getElementById("perda-01").value);
    var diluente = parseFloat(document.getElementById("diluente-01").value);
    var metodoAplicacao = document.getElementById("metodo-aplicacao").value;

    // Corrige o cálculo do SV corrigido e arredonda para 71%
    var svCorrigido = (sv * 100) / (100 + diluente);
    svCorrigido = Math.round(svCorrigido); // Arredonda o valor para 71%
    
    // Calcula o rendimento teórico (RT) usando a nova fórmula: (SV corrigido / EPS) * 10
    var rendTeorico = (svCorrigido / epsSeca) * 10;

     // Define o fator de aproveitamento (Fa) com base no método de aplicação
     
    var fatorAproveitamento = 0;
    if (metodoAplicacao === "pincel") {
        fatorAproveitamento = 0.85; // média entre 10 a 20%
    } else if (metodoAplicacao === "rolo") {
        fatorAproveitamento = 0.80; // média entre 10 a 30%
    } else if (metodoAplicacao === "pistola-convencional") {
        fatorAproveitamento = 0.60; // média entre 30 a 50%
    } else if (metodoAplicacao === "pistola-airless") {
        fatorAproveitamento = 0.80; // média entre 10 a 30%
    }

    // Define o fator de perdas com base no método de aplicação
    var perdasMedia = 0;
    if (metodoAplicacao === "pincel") {
        perdasMedia = 15; // média entre 10 a 20%
    } else if (metodoAplicacao === "rolo") {
        perdasMedia = 20; // média entre 10 a 30%
    } else if (metodoAplicacao === "pistola-convencional") {
        perdasMedia = 40; // média entre 30 a 50%
    } else if (metodoAplicacao === "pistola-airless") {
        perdasMedia = 20; // média ajustada para obter RP correto
    }

    // Calcula o rendimento prático (RP)
    var rendPratico = rendTeorico * (1 - (perdasMedia / 100));

    // Exibe os resultados nos campos de saída
    document.getElementById("rend-teorico-01").value = rendTeorico.toFixed(2);
    document.getElementById("rend-pratico-01").value = rendPratico.toFixed(2);
}

function limparRendimento() {
    // Limpa todos os campos de entrada e saída
    document.getElementById("eps-seca-01").value = "";
    document.getElementById("sv-01").value = "";
    document.getElementById("perda-01").value = "";
    document.getElementById("diluente-01").value = "";
    document.getElementById("rend-teorico-01").value = "";
    document.getElementById("rend-pratico-01").value = "";
}


    function calcularPontoOrvalho(event) {
        event.preventDefault();
        
        const ura = parseFloat(document.getElementById('ura').value);
        const tempAr = parseFloat(document.getElementById('tempAr').value);
        const tempPeca = parseFloat(document.getElementById('tempPeca').value);
        
        // Calcular o ponto de orvalho com a fórmula de Magnus-Tetens
        const pontoOrvalho = (243.04 * (Math.log(ura / 100) + ((17.625 * tempAr) / (243.04 + tempAr)))) / (17.625 - Math.log(ura / 100) - ((17.625 * tempAr) / (243.04 + tempAr)));
        
        document.getElementById('pontoOrvalho').value = pontoOrvalho.toFixed(2);
        
        let status = "Reprovado";
        let detalhes = "";
        
        // Condição (a) - Umidade relativa do ar (UR) máxima: 85 %
        if (ura > 85) {
            detalhes += "A umidade relativa do ar está acima de 85%. ";
        }
        // Exceção para tintas a base de zinco etil silicato
        if (ura >= 60 && ura <= 85) {
            detalhes += "A umidade está adequada para tintas de zinco etil silicato. ";
        } else if (ura > 85) {
            detalhes += "A umidade está inadequada para tintas de zinco etil silicato. ";
        }
        
        // Condição (b) - Temperatura máxima da superfície
        if (tempPeca > 52) {
            detalhes += "A temperatura da superfície está acima de 52°C. ";
        } else if (tempPeca > 40 && ura >= 60 && ura <= 85) {
            detalhes += "A temperatura da superfície está acima de 40°C, verifique se é tinta de zinco etil silicato. ";
        }
        
        // Condição (c) - Temperatura mínima da superfície (3°C acima do ponto de orvalho)
        if (tempPeca < pontoOrvalho + 3) {
            detalhes += "A temperatura da superfície está inferior a 3°C acima do ponto de orvalho. ";
        }
        
        // Condição (d) - Temperatura ambiente
        if (tempAr < 5) {
            detalhes += "A temperatura ambiente está inferior a 5°C. ";
            if (tempAr >= 2) {
                detalhes += "Permitido apenas para tintas que secam por evaporação de solventes. ";
            } else {
                detalhes += "A temperatura está abaixo de 2°C, o que impede a aplicação de tinta. ";
            }
        }
        
        // Avaliar se as condições são adequadas
        if (ura <= 85 && tempPeca <= 52 && tempPeca >= pontoOrvalho + 3 && tempAr >= 5) {
            status = "Aprovado";
            detalhes = "As condições estão adequadas para a aplicação da tinta.";
        }
        
        // Exibir os resultados
        document.getElementById('aprovacao').value = status;
        document.getElementById('resultado').value = detalhes;
    }
    
    function limpar() {
        document.getElementById('ura').value = "";
        document.getElementById('tempAr').value = "";
        document.getElementById('tempPeca').value = "";
        document.getElementById('pontoOrvalho').value = "";
        document.getElementById('aprovacao').value = "";
        document.getElementById('resultado').value = "";
    }



// Função para calcular Consumo de Tinta
function calcularConsumo() {
    var area = parseFloat(document.getElementById("consumo-area").value);
    var espessura = parseFloat(document.getElementById("espessura-tinta").value);
    var sv = parseFloat(document.getElementById("sv-consumo").value);

    if (isNaN(area) || isNaN(espessura) || isNaN(sv)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Arredondar para o número inteiro mais próximo
    consumo = Math.round(consumo);

    // Cálculo do consumo de tinta
    var consumo = (area * espessura * 10) / sv;

    // Exibir o resultado no campo de consumo com duas casas decimais
    document.getElementById("consumo").value = consumo.toFixed(2);
}

// Função para limpar os campos do formulário
function limparConsumo() {
    document.getElementById("consumo-area").value = "";
    document.getElementById("espessura-tinta").value = "";
    document.getElementById("sv-consumo").value = "";
    document.getElementById("consumo").value = "";
}

// Função para calcular o Volume de Tinta
// Função para calcular o Volume de Tinta e dividir pela unidade selecionada
function calcularCusto() {
    var area = parseFloat(document.getElementById("area").value);
    var rp = parseFloat(document.getElementById("rp").value);

    if (isNaN(area) || isNaN(rp) || rp === 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Cálculo do Volume de Tinta (VT = A / RP)
    var volumeTinta = area / rp;
    document.getElementById("volume-tinta").value = volumeTinta.toFixed(2);

    // Verifica qual unidade foi selecionada
    var unidades = document.getElementsByName("unidade");
    var unidadeSelecionada = null;
    for (var i = 0; i < unidades.length; i++) {
        if (unidades[i].checked) {
            unidadeSelecionada = parseFloat(unidades[i].value);
            break;
        }
    }

    if (!unidadeSelecionada) {
        alert("Por favor, selecione uma unidade de medida.");
        return;
    }

    // Cálculo da quantidade de unidades de tinta
    var quantidadeUnidades = volumeTinta / unidadeSelecionada;
    document.getElementById("unidadeResultado").value = quantidadeUnidades.toFixed(2) + " unidades";

    // Exibe a unidade selecionada no resultado
    var labelResultado = "";
    switch (unidadeSelecionada) {
        case 3.6:
            labelResultado = "Galões";
            break;
        case 0.9:
            labelResultado = "Quartos de Galão";
            break;
        case 18:
            labelResultado = "Latas/Baldes";
            break;
        case 200:
            labelResultado = "Tambores";
            break;
        default:
            labelResultado = "Unidades";
    }

    document.getElementById("unidadeResultado").value = quantidadeUnidades.toFixed(2) + " " + labelResultado;
}

// Função para limpar os campos
function limparCampos() {
    document.getElementById("area").value = "";
    document.getElementById("rp").value = "";
    document.getElementById("volume-tinta").value = "";
    document.getElementById("unidadeResultado").value = "";

    // Desmarcar checkboxes
    var unidades = document.getElementsByName("unidade");
    for (var i = 0; i < unidades.length; i++) {
        unidades[i].checked = false;
    }
}


// Função para calcular o Volume de Diluente
function calcularVolumeDiluente() {
    var vt = parseFloat(document.getElementById("vt").value);
    var dilPercent = parseFloat(document.getElementById("dil").value);

    // Verifica se os campos estão preenchidos corretamente
    if (isNaN(vt) || isNaN(dilPercent)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Calcula o Volume de Diluente
    var vd = vt * (dilPercent / 100);

    // Se o resultado for menor que 1 litro, exibe em ml
    if (vd < 1) {
        var vdMl = vd * 1000; // Converte para mililitros
        document.getElementById("vd").value = vdMl.toFixed(2) + " ml";
    } else {
        // Se for maior ou igual a 1 litro, exibe em Litros
        document.getElementById("vd").value = vd.toFixed(2) + " L";
    }
}

// Função para limpar os campos
function limparCampos() {
    document.getElementById("vt").value = "";
    document.getElementById("dil").value = "";
    document.getElementById("vd").value = "";
}





