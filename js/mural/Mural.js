const Mural = (function(_render, Filtro) {
    "use strict"
    let cartoes = getCartoesUsuarios()

    cartoes.forEach(cartao => {
        preparaCartao(cartao)
    })

    const render = () => _render({ cartoes: cartoes, filtro: Filtro.tagsETexto });
    render()
    Filtro.on("filtrado", render)

    function getCartoesUsuarios() {
        let cartoesLocais = JSON.parse(localStorage.getItem(usuario))
        if (cartoesLocais) {
            return cartoesLocais.map(cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo))
        }
        return []
    }

    function preparaCartao(cartao) {
        const urlImagens = Cartao.pegaImagens(cartao);
        urlImagens.forEach(url => {
            fetch(url).then(resposta => {
                caches.open('ceep-imagens').then(cache => {
                    cache.put(url, resposta)
                })
            })
        })
        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", () => {
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao), 1)
            salvaCartoes()
            render()
        })
    }

    function salvaCartoes() {
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(cartao => ({ conteudo: cartao.conteudo, tipo: cartao.tipo }))
        ))
    }

    login.on('login', () => {
        cartoes = getCartoesUsuarios()
        render()
    })

    login.on('logout', () => {
        cartoes = []
        render()
    })

    function adiciona(cartao) {
        if (logado) {
            cartoes.push(cartao)
            salvaCartoes()
            preparaCartao(cartao)
            render()
            return true
        } else {
            alert('VOCÊ NÃO ESTA LOGADO')
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)