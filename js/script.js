let indexEditando = null;

const STORAGE_KEY = 'meusPosts';

let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { 
        titulo: "Bem-vindo!", 
        descricao: "Este é o seu blog pessoal profissional.", 
        data: "13/02/2026", 
        hora: "10:00" 
    }
];

let idParaDeletar = null;

function adicionarPost() {
    const tituloTexto = document.getElementById('titulo').value;
    const descricaoTexto = document.getElementById('descricao').value;

    if (tituloTexto.trim() === '' || descricaoTexto.trim() === '') {
        abrirModalErro();
        return;
    }
        const agora = new Date();
        const novoPost = {
            titulo: tituloTexto,
            descricao: descricaoTexto,
            data: agora.toLocaleDateString('pt-BR'),
            hora: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
    posts.unshift(novoPost);

    salvarDados();
    renderizarPosts();

    document.getElementById('titulo').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('titulo').focus();
}


function renderizarPosts() {
    const container = document.querySelector('#container-posts');
    let htmlPosts = '';

    if (posts.length === 0) {
        container.innerHTML = `
        <div style="text-align: center; color:#64748b; padding: 40px;">
        <p style="font-size: 3rem;">📝</p>
        <h3>Seu blog esta vazio</h3>
        <p>Que tal escrever sua primeira jornada rumo ao FULLSTACK?</p>
        </div>
        `;
        return;
    }

    posts.forEach((post, index) => {
        htmlPosts += `
        <article class="post">
            <h2>${post.titulo}</h2>
            <p>${post.descricao}</p>
            <small>Publicado em: ${post.data} às ${post.hora || '--:--'}</small>
            <div class="acoes">
                <button onclick="curtir()" class="btn-curtir">Curtir ❤️</button>
                <button onclick="prepararEdicao(${index})" style="background-color: #f59e0b; margin-right: 5px;">Editar</button>
                <button onclick="abrirModal(${index})" 
                class="btn-excluir">Excluir</button>
            </div>
        </article>
        `;
    });

    container.innerHTML = htmlPosts;
}


function abrirModal(index) {
    idParaDeletar = index;
    document.getElementById('modal-confirmacao').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal-confirmacao').classList.add('hidden');
    idParaDeletar = null;
}

document.getElementById('btn-confirmar-delete').onclick = function() {
    if (idParaDeletar !== null) {
        posts.splice(idParaDeletar, 1);
        salvarDados();
        renderizarPosts();
        fecharModal();
    }
};


function salvarDados() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function curtir() {
    const toast = document.getElementById('toast');
    
    
    toast.classList.remove('hidden');

    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}


function abrirModalErro() {
    document.getElementById('modal-erro').classList.remove('hidden');
}

function fecharModalErro() {
    document.getElementById('modal-erro').classList.add('hidden');
}


function prepararEdicao(index){
    const post = posts[index];

    abrirModalEditar();

    document.getElementById('edit-titulo').value = post.titulo;
    document.getElementById('edit-descricao').value = post.descricao;

    indexEditando = index;

    document.querySelector('.btn-salvar-edit').innerHTML = "Salvar Alterações";
}

function salvarAlteracao() {
    const textoModal = document.getElementById('edit-titulo').value;
    const descricaoModal = document.getElementById('edit-descricao').value;

    if (textoModal.trim() === '' || descricaoModal.trim() === '') {
        alert("Preencha todos os campos para salvar!");
        return;
    }

    posts[indexEditando].titulo = textoModal;
    posts[indexEditando].descricao = descricaoModal;

    salvarDados();
    renderizarPosts();
    fecharModalEditar();

    indexEditando = null;
}

function abrirModalEditar() {
    document.getElementById('modal-editar').classList.remove('hidden');
}

function fecharModalEditar() {
    document.getElementById('modal-editar').classList.add('hidden');
}


renderizarPosts();