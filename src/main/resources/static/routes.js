function controleRotasGet(url){
    switch(url){
        case "/logout":
            gerarSwal(url);
            break;
             case "/edit/usuario":
                                        $.get(url,function(data){
                                            $(".container").html(data);
                                            $("#salvar").click(salvarPerfil);
                                        });
                                        break;
                                         case "/calendario":
                                                                                $.get(url,function(data){
                                                                                    $(".container").html(data);
                                                                                    createCalendar(new Date());
                                                                                    $("#next-month").click(function(){
                                                                                        atualizaCalendario(1);
                                                                                    });
                                                                                    $("#previous-month").click(function(){
                                                                                        atualizaCalendario(-1);
                                                                                    });
                                                                                });
                                                                                break;
        default:
            $.get(url,function(data){
                $(".container").html(data);
            });
    }
}