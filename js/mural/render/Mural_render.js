const Mural_render = (function($){
    "use strict"
    const $mural = $(".mural")
    let currentCartoes = [];

    return function render({cartoes, filtro = (() => true)}){
        const cartoesDeletados = currentCartoes.filter(cartao => !(cartoes.indexOf(cartao)+1))

        const deletaCartoes = Promise.all(cartoesDeletados.map(cartao => {
            return new Promise(resolve => {
                cartao.node.addClass("cartao--some")
                setInterval(() => {
                    cartao.node.remove()
                    resolve()
                }, 400)
            })
        }))

        deletaCartoes.then(() => {
            const cartoesVisiveis = cartoes.filter(filtro)

            currentCartoes
            .forEach(cartao => {
                const $cartao = cartao.node
                $cartao.detach()
            })

            cartoesVisiveis
            .forEach(cartao => {
                const $cartao = cartao.node
                $cartao.appendTo($mural)
            })

            currentCartoes = cartoes
        })

    }
})(jQuery)