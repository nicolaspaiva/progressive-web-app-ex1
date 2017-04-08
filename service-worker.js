let versao = 10

let arquivos = [
    "/",
    "css/estilos.css",
    "css/opcoesDaPagina.css",
    "css/opcoesDoCartao.css",
    "css/cabecalho.css",
    "css/login.css",
    "css/loginForm.css",
    "css/loginStatus.css",
    "css/cartao.css",
    "css/novoCartao.css",
    "css/mural.css",
    "js/lib/jquery.js",
    "js/lib/eventemitter2.js",
    "js/lib/KeyBoardNavigation.js",
    "js/tags/Tags.js",
    "js/cabecalho/mudaLayout.js",
    "js/cabecalho/busca.js",
    "js/filtro/Filtro.js",
    "js/tipos/TiposCartao.js",
    "js/cartao/render/Cartao_renderHelpers.js",
    "js/cartao/render/CartaoOpcoes_render.js",
    "js/cartao/render/CartaoConteudo_render.js",
    "js/cartao/render/Cartao_render.js",
    "js/cartao/Cartao.js",
    "js/login/LoginUsuario_render.js",
    "js/login/LoginUsuario.js",
    "js/mural/render/Mural_render.js",
    "js/mural/Mural.js",
    "js/cabecalho/novoCartao.js",
    "img/bin2.svg",
    "img/edit.svg",
]

//self.addEventListener('install'), quando o service worker é instalado

self.addEventListener('activate', function() { //quando o service worker é ativado, para ativar tem que fechar o navegador
    caches.open("ceep-arquivos-" + versao).then(cache => {
        cache.addAll(arquivos).then(function() {
            caches.delete("ceep-arquivos-" + (versao - 1))
            caches.delete("ceep-arquivos")
        })
    })
})


self.addEventListener('fetch', function(event) {
    let pedido = event.request
    let promisserResposta = caches.match(pedido).then(respostaCache => {
        let resposta = respostaCache ? respostaCache : fetch(pedido)
        return resposta
    })
    event.respondWith(promisserResposta)
})