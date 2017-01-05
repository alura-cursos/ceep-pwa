const CACHE_VERSION = 1

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open("ceep-app").then(cache => {
            cache.addAll([
                "/"
                ,"/css/estilos.css"
                ,"/css/opcoesDoCartao.css"
                ,"/css/opcoesDoCartao.css"
                ,"/css/opcoesDoCartao.css"
                ,"/css/cabecalho.css"
                ,"/css/cabecalho.css"
                ,"/css/cabecalho.css"
                ,"/css/opcoesDaPagina.css"
                ,"/css/login.css"
                ,"/css/loginForm.css"
                ,"/css/loginStatus.css"
                ,"/css/cartao.css"
                ,"/css/novoCartao.css"
                ,"/css/mural.css"
                ,"/js/lib/jquery.js"
                ,"/js/lib/eventemitter2.js"
                ,"/js/lib/KeyBoardNavigation.js"
                ,"/js/tags/Tags.js"
                ,"/js/cabecalho/mudaLayout.js"
                ,"/js/cabecalho/busca.js"
                ,"/js/filtro/Filtro.js"
                ,"/js/tipos/TiposCartao.js"
                ,"/js/cartao/render/Cartao_renderHelpers.js"
                ,"/js/cartao/render/CartaoOpcoes_render.js"
                ,"/js/cartao/render/CartaoConteudo_render.js"
                ,"/js/cartao/render/Cartao_render.js"
                ,"/js/cartao/Cartao.js"
                ,"/js/login/LoginUsuario_render.js"
                ,"/js/login/LoginUsuario.js"
                ,"/js/mural/render/Mural_render.js"
                ,"/js/mural/Mural.js"
                ,"/js/cabecalho/novoCartao.js"
                ,"/img/bin2.svg"
                ,"/img/edit.svg"
            ])
        })
    )
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(function(response){
            return (response || fetch(event.request))
        })
    )
})