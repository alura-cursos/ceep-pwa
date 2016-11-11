const Cartao = (function(_render, EventEmitter, TiposCartao){
    "use strict"

    const autoIncrement = (function(){
        let id = 0
        return function(){
            return id++
        }
    })()

    const globalProps = {
        tipos: TiposCartao
    }

    function Cartao(conteudo, tipo = globalProps.tipos.padrao){

        const render = _render(globalProps)
        function renderAfter(fn){
            return function(){
                let result = fn.apply(this, arguments)
                if (result instanceof Promise){
                    result.then(()=> render(props, state, handlers))
                } else {
                    render(props, state, handlers)
                }
            }
        }

        const props = Object.freeze({
            id: autoIncrement()
        })

        let state

        function setState({conteudo = state.conteudo, tipo = state.tipo, navegavel, editavel, deletado = state.deletado, focado}){
            navegavel = !!navegavel
            editavel = !!editavel
            deletado = !!deletado
            focado = !!focado
            state = Object.freeze({conteudo, tipo, navegavel, editavel, deletado, focado})
        }

        setState({
            conteudo
            ,tipo
            ,deletado: false
            ,editavel: false
            ,navegavel: false
            ,focado: false
        })

        const handlers = {
            "onNavegacaoInicia": renderAfter(() => {
                setState({navegavel: true, editavel: false, focado: false})
            })
            ,"onNavegacaoTermina": renderAfter(() => {
                setState({navegavel: false, editavel: false, focado: true})
            })
            ,"onDesseleciona": renderAfter(() => {
                setState({navegavel: false, editavel: false, focado: false})
            })
            ,"onMudancaDeTipo": renderAfter((tipo) => {
                setState({tipo: tipo, navegavel: true, editavel: false, focado: false})
                return cartao.emitAsync("mudanca.tipo")
            })
            ,"onEdicaoCompleta": renderAfter((conteudo) => {
                const conteudoAntigo = state.conteudo
                setState({conteudo: conteudo, navegavel: true, editavel: false, focado: false})
                return cartao.emitAsync("mudanca.conteudo", conteudo, conteudoAntigo)
            })
            ,"onDeleta": renderAfter(() => {
                setState({navegavel: false, editavel: false, deletado: true, focado: false})
                return cartao.emitAsync("remocao")
            })
            ,"onAtivaEdicao": renderAfter(() => {
                setState({navegavel: true, editavel: true, focado: false})
            })
        }

        const cartao = Object.create(new EventEmitter({wildcard: true}), {
           "id": {
               value: props.id
           }
           ,"conteudo": {
               get: () => state.conteudo
           }
           ,"tipo": {
               get: () => state.tipo
           }
           ,"node": {
               value: render(props, state, handlers)
           }
        })

        return cartao
    }

    Cartao.pegaImagens = cartao => {
        return (cartao.conteudo.match(/\!\[(.+?)\]\((.+?)\)/g) || []).map(imagemMD => {
            return imagemMD.match(/\!\[.+?\]\((.+?)\)/)[1] || null
        })
    }

    return Cartao
})(Cartao_render, EventEmitter2, TiposCartao)