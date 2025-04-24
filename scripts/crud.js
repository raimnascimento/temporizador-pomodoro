const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioSalvarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

// ao inves de comecar com um array vazio, de cara já colocar local storage para guardar as informacoes desde o inicio
// parse vai ser o contrario do stringify, pega a string e se for uma string direita (json em formato de string) ele vai conseguir transformar
// se tiver ok, o resultado vai cair no parse. caso tenha algum valor nulo ou indefinido (sem string) vai cair no 'ou' e retornar um array vazio
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');
    const svg = document.createElement('svg');
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`;
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    const imagem = document.createElement('img');
    imagem.setAttribute('src', '/imagens/edit.png');

    botao.append(imagem);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;
}

btnAdicionarTarefa.addEventListener('click', () => {
    // toggle : se tem tira, se não tem, coloca
    formularioSalvarTarefa.classList.toggle('hidden');
})

formularioSalvarTarefa.addEventListener('submit', (evento) => {
    // normalmente, quando se coloca evento na função, é porque precisa colocar algum desses parametros
    evento.preventDefault();
    // criação de um objeto
    const tarefa = {
        descricao: textarea.value
    }
    // o que for add no textarea (tarefas) serão add no array de tarefas
    tarefas.push(tarefa);
    const elementoTarefaCriado = criarElementoTarefa(tarefa);
    // toda vez que recarregamos a página, as informações são perdidas, então para guardar as informações, é utilizado localStorage
    // localstorage.adicionaritem (quero guardar a lista inteira de tarefas)
    // chamamos api json que tem o metodo stringify que transforma objeto em uma string
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
})

tarefas.forEach(tarefa => {
    const elementoTarefaCriado = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefaCriado);
});