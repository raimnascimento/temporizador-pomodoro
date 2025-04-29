const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const mensagemDescanso = document.querySelector('.app__title');
const bannerImg = document.querySelector('.app__image');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.getElementById('start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const timer = document.getElementById('timer');

const alternarMusica = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

alternarMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    // qual elemento quer alterar, e o valor a ser alterado
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    bannerImg.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case 'foco':
            mensagemDescanso.innerHTML = `<h1 class="app__title">
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
        </h1>`;
            break;
        case 'descanso-curto':
            mensagemDescanso.innerHTML = `<h1 class="app__title">
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            </h1>`;
            break;
        case 'descanso-longo':
            mensagemDescanso.innerHTML = `<h1 class="app__title">
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            </h1>`;
            break;
        default:
            break;

    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        alert('Tempo finalizado.');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
                document.dispatchEvent(evento);
            }
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        zerar();
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausar.textContent = 'Pausar';
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausar.textContent = 'Começar';
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-BR',{
        minute: '2-digit',
        second: '2-digit'
    });
    timer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();