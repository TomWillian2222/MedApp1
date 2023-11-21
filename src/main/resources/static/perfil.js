function salvarPerfil(){
    let nome = $("#nome").val();
    let email = $("#email").val();
    let CPF = $("#CPF").val();
    let relacao = $("#relacao option:selected").val();
    let senhaAtual = $("#senhaAtual").val();
    let novaSenha = $("#novaSenha").val();
    let confSenha = $("#confSenha").val();

    $.ajax({
        type: "POST",
        url: "/edit/usuario",
        data:{
            nome:nome,
            email:email,
            CPF:CPF,
            relacao:relacao,
            senhaAtual:senhaAtual,
            novaSenha:novaSenha,
            confSenha:confSenha
        },
        success: function(data){
            if(data.sucesso){
                alertaSucesso("Cadastro atualizado com sucesso");
            }else{
                alert(data.mensagem);
            }
        },
        error: function(){
            alert("Deu ruim");
        }
    })
}