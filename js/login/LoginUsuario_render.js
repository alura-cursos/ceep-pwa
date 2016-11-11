const LoginUsuario_render = (function($){
    const $LoginForm = function(){
        let $loginForm = $("<form>")
                        .addClass("loginForm")

        let $labelInputUsuario = $("<label>")
                                    .attr("for", "loginForm-usuario")
                                    .text("Quem é você?")
                                    .addClass("loginForm-label")

        let $inputUsuario = $("<input>")
                                .attr("placeholder", "nome de usuário")
                                .attr("id", "loginForm-usuario")
                                .attr("autofocus", true)
                                .addClass("loginForm-input")

        let $btnSubmit = $("<button>")
                            .attr("type", "submmit")
                            .addClass("loginForm-submit")
                            .text("Ok")

        $loginForm
            .append($labelInputUsuario)
            .append($inputUsuario)
            .append($btnSubmit)

        return $loginForm
    }

    const $LoginStatus = function(usuario){
        let $loginStatus = $("<p>")
                            .addClass("loginStatus")
                            .text("Logado como: ")

        let $loginStatus_usuario = $("<span>")
                                    .addClass("loginStatus-usuario")
                                    .text(usuario)

        let $loginStatus_sair = $("<button>")
                                .addClass("loginStatus-sair")
                                .text("sair")

        $loginStatus
            .append($loginStatus_usuario)
            .append($loginStatus_sair)

        $loginStatus.on("click", function(){
            $loginStatus.trigger("sair")
            $loginStatus.remove()
        })
        return $loginStatus
    }

    let $loginForm
    let $loginStatus

    function clean(){
        $loginForm && $loginForm.remove()
        $loginStatus && $loginStatus.remove()
    }

    function login(props){
        if(props.validacao && props.validacao(props.usuario) || !props.validacao && true){
            props.onLogin && props.onLogin(props.usuario)
            clean()
            $loginStatus = new $LoginStatus(props.usuario)
            $loginStatus.on("sair", function(){
                logout(props)
                props.onLogout && props.onLogout()
            })
            $loginStatus.appendTo(".login")
        } else {
            logout(props)
        }
    }

    function logout(props){
        clean()
        $loginForm = new $LoginForm();
        $loginForm.on("submit", function(event){
            event.preventDefault()
            let usuarioDigitado = $loginForm
                                    .find("input")
                                    .val()
                                    .trim()
            if(usuarioDigitado){
                props.usuario = usuarioDigitado
                login(props)
            }
        })
        $loginForm.appendTo(".login")
        $loginForm.find("input").focus()
    }

    return function(props){
        if(props.logado){
            login(props)
        } else {
            logout(props)
        }
    }
})(jQuery)
