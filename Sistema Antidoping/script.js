// ------------------ Cadastro de Usuário ------------------
const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
  formCadastro.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar_senha').value;

    if (senha !== confirmar) {
      alert('As senhas não coincidem!');
      return;
    }

    localStorage.setItem(email, JSON.stringify({ nome, email, senha }));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  });
}

// ------------------ Login ------------------
const formLogin = document.getElementById('formLogin');

if (formLogin) {
  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    const usuario = JSON.parse(localStorage.getItem(email));

    if (usuario && usuario.senha === senha) {
      alert(`Bem-vindo(a), ${usuario.nome}!`);
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      window.location.href = 'dashboard.html';
    } else {
      alert('Email ou senha incorretos!');
    }
  });
}

// ------------------ Sair (link no dashboard) ------------------
const btnSair = document.getElementById('btnSair');
if (btnSair) {
  btnSair.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
  });
}

// ------------------ Cadastro de Atleta ------------------
const formCadastroAtleta = document.getElementById('formCadastroAtleta');

if (formCadastroAtleta) {
  formCadastroAtleta.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome_atleta').value;
    const data_nascimento = document.getElementById('data_nascimento').value;
    const posicao = document.getElementById('posicao').value;
    const clube = document.getElementById('clube').value;

    const atleta = { nome, data_nascimento, posicao, clube };

    let atletas = JSON.parse(localStorage.getItem('atletas')) || [];
    atletas.push(atleta);
    localStorage.setItem('atletas', JSON.stringify(atletas));

    alert('Atleta cadastrado com sucesso!');
    formCadastroAtleta.reset();
  });
}

// ------------------ Cadastro de Exame ------------------
const formCadastroExame = document.getElementById('formCadastroExame');

if (formCadastroExame) {
  formCadastroExame.addEventListener('submit', function (e) {
    e.preventDefault();

    const id_atleta = document.getElementById('id_atleta').value;
    const data_exame = document.getElementById('data_exame').value;
    const tipo_exame = document.getElementById('tipo_exame').value;

    const exame = { id_atleta, data_exame, tipo_exame, resultado: 'Pendente' };

    let exames = JSON.parse(localStorage.getItem('exames')) || [];
    exames.push(exame);
    localStorage.setItem('exames', JSON.stringify(exames));

    alert('Exame registrado com sucesso!');
    formCadastroExame.reset();
  });
}

// ------------------ Dashboard (contadores) ------------------
const spanTotalAtletas = document.getElementById('totalAtletas');
const spanTotalExames = document.getElementById('totalExames');
const spanTotalPendentes = document.getElementById('totalPendentes');

if (spanTotalAtletas || spanTotalExames || spanTotalPendentes) {
  const atletas = JSON.parse(localStorage.getItem('atletas')) || [];
  const exames = JSON.parse(localStorage.getItem('exames')) || [];

  const totalAtletas = atletas.length;
  const totalExames = exames.length;
  const totalPendentes = exames.filter(e => e.resultado === 'Pendente').length;

  if (spanTotalAtletas) spanTotalAtletas.textContent = totalAtletas;
  if (spanTotalExames) spanTotalExames.textContent = totalExames;
  if (spanTotalPendentes) spanTotalPendentes.textContent = totalPendentes;
}

// ------------------ Resultados (listas) ------------------
const listaAtletas = document.getElementById('listaAtletas');
const listaExames = document.getElementById('listaExames');

if (listaAtletas) {
  const atletas = JSON.parse(localStorage.getItem('atletas')) || [];

  if (atletas.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhum atleta cadastrado.';
    listaAtletas.appendChild(li);
  } else {
    atletas.forEach((atleta) => {
      const li = document.createElement('li');
      li.textContent =
        `${atleta.nome} | ${atleta.data_nascimento} | ${atleta.posicao} | ${atleta.clube}`;
      listaAtletas.appendChild(li);
    });
  }
}

if (listaExames) {
  const exames = JSON.parse(localStorage.getItem('exames')) || [];

  if (exames.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhum exame registrado.';
    listaExames.appendChild(li);
  } else {
    exames.forEach((exame) => {
      const li = document.createElement('li');
      li.textContent =
        `Atleta ID: ${exame.id_atleta} | ${exame.data_exame} | ${exame.tipo_exame} | ${exame.resultado}`;
      listaExames.appendChild(li);
    });
  }
}
