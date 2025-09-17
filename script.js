async function criarConta() {
  const dados = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("emailCadastro").value,
    senha: document.getElementById("senhaCadastro").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    cep: document.getElementById("cep").value,
  };
  const res = await fetch('api/cadastro.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  const result = await res.json();
  if(result.status==="sucesso"){
    alert("Cadastro realizado!");
    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
  } else {
    alert("Erro: " + result.mensagem);
  }
}

async function fazerLogin() {
  const dados = {
    email: document.getElementById("emailLogin").value,
    senha: document.getElementById("senhaLogin").value
  };
  const res = await fetch('api/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  const result = await res.json();
  if(result.status==="sucesso"){
    alert("Login realizado!");
    window.usuarioLogado = result.usuario;
    document.getElementById("login").classList.add("hidden");
    document.getElementById("sitePadaria").classList.remove("hidden");
    carregarProdutos();
  } else {
    alert(result.mensagem);
  }
}

async function carregarProdutos() {
  const res = await fetch('api/produtos.php');
  const produtos = await res.json();
  const loja = document.getElementById("loja");
  loja.innerHTML = "";
  produtos.forEach(p=>{
    loja.innerHTML += `
      <div class="produto" onclick="toggleDescricao(this)">
        <img src="img/${p.img}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p><strong>R$ ${p.preco.toFixed(2)}</strong></p>
        <div class="descricao">${p.descricao}</div>
      </div>
    `;
  });

  const admin = document.getElementById("adminProdutos");
  admin.innerHTML = "";
  produtos.forEach((p, i)=>{
    admin.innerHTML += `
      <div class="card">
        <label>Nome</label>
        <input type="text" id="admNome${i}" value="${p.nome}">
        <label>Preço</label>
        <input type="number" step="0.01" id="admPreco${i}" value="${p.preco}">
        <label>Descrição</label>
        <input type="text" id="admDescricao${i}" value="${p.descricao}">
        <input type="hidden" id="admId${i}" value="${p.id}">
      </div>
    `;
  });
}

async function salvarProdutos() {
  const cards = document.querySelectorAll("#adminProdutos .card");
  const produtos = [];
  cards.forEach((card, i)=>{
    produtos.push({
      id: parseInt(document.getElementById("admId"+i).value),
      nome: document.getElementById("admNome"+i).value,
      preco: parseFloat(document.getElementById("admPreco"+i).value),
      descricao: document.getElementById("admDescricao"+i).value
    });
  });
  const res = await fetch('api/editar_produtos.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produtos)
  });
  const result = await res.json();
  if(result.status==="sucesso"){
    alert("Produtos atualizados!");
    carregarProdutos();
  } else {
    alert("Erro ao salvar produtos!");
  }
}

function toggleDescricao(el){
  const desc = el.querySelector(".descricao");
  desc.style.display = desc.style.display==="block" ? "none" : "block";
}
