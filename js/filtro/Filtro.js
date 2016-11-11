const Filtro = ((Busca, Tags, EventEmitter) => {

    let tags = []
    let texto = ""

    const state = {
        digitouTagEPalavra: () => tags.length > 0 && texto.trim().length > 0
        ,digitouApenasTag: () => tags.length > 0 && texto.trim().length == 0
        ,digitouApenasPalavra: () => tags.length == 0 && texto.trim().length > 0
    }

    const filtros = {
        tags: (cartao) => {
            if(tags.length){
                const conteudo = cartao.conteudo.replace(/<br>/g, "\n")
                const numeroDeTagsComMatch = Tags.extraiTags(conteudo).reduce(function(numeroDeTagsComMatch, tag){
                    tags.indexOf(tag) >= 0 && numeroDeTagsComMatch++
                    return numeroDeTagsComMatch
                }, 0)
                return numeroDeTagsComMatch === tags.length
            } else {
                return true
            }
        }
        ,texto: (cartao) => {
            if(texto.length){
                const conteudo = cartao.conteudo.replace(/<br>/g, "\n")
                return conteudo.match(new RegExp(texto || null, "i"))
            } else {
                return true
            }
        }
    }

    function and(cartao) {
        if(tags.length || texto.length){
            if(state.digitouTagEPalavra()) {
                return filtros.tags(cartao) && filtros.texto(cartao)
            } else if(state.digitouApenasTag()) {
                return filtros.tags(cartao)
            } else if(state.digitouApenasPalavra()) {
                return filtros.texto(cartao)
            }
        } else {
            return true
        }
    }

    function or(cartao) {
        if(tags.length || texto.length){
            if(state.digitouTagEPalavra()) {
                return filtros.tags(cartao) || filtros.texto(cartao)
            } else if(state.digitouApenasTag()) {
                return filtros.tags(cartao)
            } else if(state.digitouApenasPalavra()) {
                return filtros.texto(cartao)
            }
        } else {
            return true
        }
    }

    const Filtro = Object.create(new EventEmitter(), {
        tags: {
            value: filtros.tags
        }
        ,texto: {
            value: filtros.texto
        }
        ,tagsETexto: {
            value: (cartao) => and(cartao)
        }
        ,tagsOuTexto: {
            value: (cartao) => or(cartao)
        }
    })

    Busca.on("busca", ()=>{
        tags = Busca.tags
        texto = Busca.text
        Filtro.emit("filtrado")
    })

    return Filtro
})(Busca, Tags, EventEmitter2)