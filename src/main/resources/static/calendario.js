let dataCalendario = new Date();
let dataSelecionada = new Date();
let textosPorDia = {};


$(document).ready(function(){
    createCalendar(dataCalendario);

    $("#next-month").click(function(){
        atualizaCalendario(1);
    });

    $("#previous-month").click(function(){
        atualizaCalendario(-1);
    });
});

function atualizaCalendario(att){
    dataCalendario.setMonth(dataCalendario.getMonth()+(att));
    createCalendar(dataCalendario);
}

function createCalendar(data){
    data.setHours(0,0,0,0);
    dataSelecionada.setHours(0,0,0,0);

    let dataAtual = new Date();
    dataAtual.setHours(0,0,0,0);

    let dataInicio = new Date(data);
    dataInicio.setDate(1);
    if(dataInicio.getDay() !== 0){
        dataInicio.setDate((dataInicio.getDay() * -1)+1);
    }

    let dataFim = new Date(data.getFullYear(),data.getMonth()+1,0);

    if(dataFim.getDay() !== 6){
        dataFim.setDate(dataFim.getDate() + (6 - dataFim.getDay()));
    }

    imprimeCabecalhoCalendario(data);
    imprimeDatasCalendario(new Date(dataInicio),dataFim,data);

    atualizaDataAtividades();
    ativarClickCalendario();
}

function imprimeCabecalhoCalendario(data){
    const nomeMeses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho",
                                "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

    $("#mes").text(nomeMeses[data.getMonth()]);
    $("#ano").text(data.getFullYear());
}

function imprimeDatasCalendario(dataAux,dataFim,data){
    $("tbody").text("");
    let linha = 0;
    let count = 0;
    let classe = "";

    dataAux.setHours(0,0,0,0);
    while(dataAux <= dataFim){
        if(count % 7 == 0){
            linha++;
            $('tbody').append('<tr id="linha'+linha+'"></tr>');
        }

        if(dataAux.getMonth() !== data.getMonth()){
            classe = ' class="outro-mes" ';
        }else if(dataAux.getTime() == dataSelecionada.getTime()){
            classe = ' class="dia-ativo" ';
        }else{
            classe = '';
        }

        $("#linha"+linha).append("<td id=\""+dataAux.getTime()+"\" "+classe+">"+dataAux.getDate()+"</td>");

        dataAux.setDate(dataAux.getDate() + 1);
        count++;
    }
}

function atualizaDataAtividades(){
   $("#data").text(dataSelecionada.toLocaleDateString());

     const diasSelecionadosElement = document.getElementById('diasSelecionados');
         diasSelecionadosElement.innerHTML = '';

        diasSelecionadosElement.innerHTML = `Dias Selecionados: ${dataSelecionada.toLocaleDateString()}`;

}
function ativarClickCalendario(){
    $('td').click(function(params){
        if(!$(this).hasClass("outro-mes")){
            $('.dia-ativo').removeClass('dia-ativo');
            $(this).addClass('dia-ativo');
            dataSelecionada = new Date(parseInt(($(this).attr("id"))));
            atualizaDataAtividades();

            const textoDoDia = textosPorDia[dataSelecionada.getTime()] || '';
            $('.input-field').val(textoDoDia).data('date', dataSelecionada.getTime());
            // Adiciona uma classe ao dia selecionado caso haja texto associado
            if (textoDoDia !== '') {
                $(this).addClass('dia-com-texto');
            } else {
                $(this).removeClass('dia-com-texto');
            }
        }
    });
    $('.input-field').on('input', function() {
        const dataTexto = $(this).data('date');
        textosPorDia[dataTexto] = $(this).val();
        // Adiciona ou remove a classe do dia conforme o texto é inserido ou removido
        $('td').each(function() {
            const idDia = parseInt($(this).attr("id"));
            if (textosPorDia[idDia]) {
                $(this).addClass('dia-com-texto');
            } else {
                $(this).removeClass('dia-com-texto');
            }
        });
    });
}