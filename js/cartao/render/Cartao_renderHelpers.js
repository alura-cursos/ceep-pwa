const Cartao_renderHelpers = (function($){
    function decideTamanhoDoCartao(conteudo){
        let numeroDeQuebrasDeLinha = conteudo.split("\n").length
        let totalDeLetras = conteudo.replace(/\n/g, " ").length

        let tamMaiorPalavra = conteudo.replace(/\n/g, " ")
                            .split(" ")
                            .reduce(function(anterior, palavra){
                                if(palavra.length > anterior.length) {
                                    return palavra
                                }
                                return anterior
                            }).length

        var tipoCartao

        if(tamMaiorPalavra < 9 && numeroDeQuebrasDeLinha < 5 && totalDeLetras < 55) {
            tipoCartao = "cartao--textoGrande"
        } else if(tamMaiorPalavra < 12 && numeroDeQuebrasDeLinha < 6 && totalDeLetras < 75) {
            tipoCartao = "cartao--textoMedio"
        } else {
            tipoCartao = "cartao--textoPequeno"
        }

        return tipoCartao
    }

    function cartaoEstaNaTela($cartao) {
        if (typeof $ === "function" && $cartao instanceof $) {
            $cartao = $cartao[0]
        }

        let rect = $cartao.getBoundingClientRect()

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        )
    }

    return {
        decideTamanhoDoCartao
        ,cartaoEstaNaTela
    }
})(jQuery)