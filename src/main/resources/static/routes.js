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
                                                                                    $("#dataCalendario").click(createCalendar);
                                                                                });
                                                                                break;
        default:
            $.get(url,function(data){
                $(".container").html(data);
            });
    }
}