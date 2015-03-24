window.Usuario = Backbone.Model.extend({
        urlRoot: "/usuarios",
        defaults: {
            nome: "",
            login: "",
            senha: ""
        }
});
window.UsuariosCollection = Backbone.Collection.extend({
        model: Usuario,
        url: "/usuarios" // url of the REST API
});

window.Estabelecimento = Backbone.Model.extend({
        urlRoot: "/estabelecimentos",
        defaults: {

            cnpj: "",
            nome: "",
            rua: " ",
            bairro: "",
            cidade: " ",
            email: " ",
            password: ""
            
        }
});
window.EstabelecimentosCollection = Backbone.Collection.extend({
        model: Estabelecimento,
        url: "/estabelecimentos" // url of the REST API
});

window.Promocao = Backbone.Model.extend({
        defaults: {

            estabelecimento_id: 0,
            produto_id: 0,            
            
        }
    });
window.PromocoesCollection = Backbone.Collection.extend({
        model: Promocao,
        url: "/promocoes" // url of the REST API
});


