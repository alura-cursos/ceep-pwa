const CartaoConteudo_render = (function($){
    "use strict"

    function _quebraLinhaComBR(event){
        if(event.keyCode == 13) {
            event.preventDefault()
            event.stopPropagation()
            document.execCommand("insertHtml", false, "<br><br>")
        }
    }

    return function(globalProps){
        let $conteudo = $("<p>")


        return function(props = {}, state = {}, handlers = {}){

            let conteudo = state.conteudo.replace(/\n/g, "<br>")

            if(state.editavel){
                conteudo = conteudo
                             .replace(/<b>(.*?)<\/b>/g, "**$1**")
                             .replace(/<em>(.*?)<\/em>/g, "*$1*")
                             .replace(/<img src='(.*?)' alt='(.*?)'>/g, "![$2]($1)")
            } else {
                conteudo = conteudo
                             .replace(/\!\[(.*?)\]\((.*?)\)/g,"<img src='$2' alt='$1'>")
                             .replace(/\*\*([^\*][^\*]*)\*\*/g, "<b>$1</b>")
                             .replace(/\*([^\*]*)\*/g, "<em>$1</em>")
            }

            $conteudo
                .addClass("cartao-conteudo")
                .html(conteudo)
                .attr("contenteditable", state.editavel)
                .off()
                .on("keydown", _quebraLinhaComBR)
                .on("keydown", function(event){
                    if(event.key === "Escape"){
                        $(this).trigger("edicaoCompleta")
                        return false;
                    }
                })
                .on("blur", function(){
                    $(this).trigger("edicaoCompleta")
                })
                .on("edicaoCompleta", function(){
                    handlers.onEdicaoCompleta(
                        $conteudo.html()
                             .replace(/<br>/g, "\n")
                             .replace(/<.*?>/g,"")
                    )
                })

            if(state.editavel){
                $conteudo.focus()
            }

            return $conteudo
        }
    }
})(jQuery)