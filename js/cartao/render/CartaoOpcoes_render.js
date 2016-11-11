const CartaoOpcoes_render = (function($){
    "use strict"
    const OpcoesKeyboardNavigation = new KeyBoardNavigation({
        "ArrowLeft": iterator => iterator.previous()
        ,"ArrowUp": iterator => iterator.previous()
        ,"ArrowRight": iterator => iterator.next()
        ,"ArrowDown": iterator => iterator.next()
        ,"Tab": iterator => iterator.next()
        ,"Shift+Tab": iterator => iterator.previous()
    })

    function flatten(array){
        return array.reduce((a,x)=>{
            if(x instanceof Array){
                x = flatten(x)
                a.push(...x)
            } else {
                a.push(x)
            }
            return a
        },[])
    }

    return function(globalProps){
        const keyboardNavigation = new OpcoesKeyboardNavigation()

        const $opcoes = $("<div>")
                            .addClass("opcoesDoCartao")

        const $botaoRemove = $("<button>")
                                .addClass("opcoesDoCartao-remove")
                                .addClass("opcoesDoCartao-opcao")
                                .text("Remover")

        const $botaoEdita = $("<button>")
                                .addClass("opcoesDoCartao-edita")
                                .addClass("opcoesDoCartao-opcao")
                                .text("Editar")

        keyboardNavigation.push($botaoRemove)
        keyboardNavigation.push($botaoEdita)

        const tipos = Object.keys(globalProps.tipos).map(chave => globalProps.tipos[chave])
        const [...inputAndLabels] = tipos.map(function(tipo, indice){

            const $inputTipo = $("<input>")
                             .attr("type","radio")
                             .val(indice)
                             .addClass("opcoesDoCartao-radioTipo")


            const $labelTipo = $("<label>")
                             .css("color", tipo.cor)
                             .addClass("opcoesDoCartao-tipo")
                             .addClass("opcoesDoCartao-tipo" + tipo.nome)
                             .addClass("opcoesDoCartao-opcao")
                             .text(tipo.nome)

            $labelTipo[0].style["-moz-user-focus"] = "normal"


            keyboardNavigation.push($labelTipo)

            return [$inputTipo, $labelTipo]
        })

        $opcoes.append($botaoRemove, $botaoEdita, flatten(inputAndLabels))

        let ultimaOpcaoNavegada

        return function(props = {}, state = {}, handlers = {}){

            inputAndLabels.forEach(([$inputTipo, $labelTipo], indice) => {
                const idInputTipo = "tipo" + tipos[indice].nome + "-cartao" + props.id
                $inputTipo
                    .attr("name", "tipoDoCartao-" + props.id)
                    .attr("id", idInputTipo)
                    .prop("checked", false)
                    .prop("checked", state.tipo === tipos[indice])

                $labelTipo
                    .attr("for", idInputTipo)
                    .attr("tabindex", state.navegavel ? 0 : -1)

            })

            $botaoRemove
                .attr("tabindex", state.navegavel ? 0 : -1)
                .off()
                .on("click", () => {
                    handlers.onDeleta()
                })

            $botaoEdita
                .attr("tabindex", state.navegavel ? 0 : -1)
                .off()
                .on("click", () => {
                    handlers.onAtivaEdicao()
                })
                .on('keydown', event => {
                    event.preventDefault()
                })

            if(ultimaOpcaoNavegada){
                keyboardNavigation.goTo((elementoNavegacao)=> {
                    if(ultimaOpcaoNavegada.attr("class") === elementoNavegacao.attr("class")){
                        return elementoNavegacao
                    }
                })
            } else {
                keyboardNavigation.goTo((elementoNavegacao)=> {
                    return elementoNavegacao
                })
            }

            if(state.navegavel && !state.editavel){
                keyboardNavigation.init()[0].focus()
            } else if(!state.navegavel){
                ultimaOpcaoNavegada = undefined
            }

            $opcoes
                .off()
                .on("keydown", function(event){
                    if(event.key === "Escape"){
                        event.preventDefault()
                        event.stopPropagation()
                        handlers.onNavegacaoTermina()
                    }
                })
                .on("keydown", ".opcoesDoCartao-opcao", function(event){
                    if(event.key === "Enter" || event.key === " "){
                        $(event.target).trigger("click")
                    }
                })
                .on("focusin", ".opcoesDoCartao-opcao", function(event){
                    const $opcao = $(event.target)
                    ultimaOpcaoNavegada = $opcao
                    $opcao[0].focus()
                })
                .on("mouseenter", ".opcoesDoCartao-opcao", function(event){
                    if(!state.editavel){
                        const $opcao = $(event.target)
                        ultimaOpcaoNavegada = $opcao
                        $opcao[0].focus()
                    }
                })
                .on("change", ".opcoesDoCartao-radioTipo", function(event){
                    let numeroTipo = $(event.target).val()
                    handlers.onMudancaDeTipo(tipos[numeroTipo])
                })
                .on("keydown", ".opcoesDoCartao-opcao", function(event){
                    let $opcao = keyboardNavigation.navigate(event)
                    if($opcao !== false){
                        event.preventDefault()
                        event.stopPropagation()
                        if($opcao !== null) {
                            setTimeout(()=>$opcao[0].focus(), 50)
                        }
                    }
                })

            return $opcoes
        }
    }
})(jQuery)
