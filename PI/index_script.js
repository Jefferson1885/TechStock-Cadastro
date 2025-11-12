const btnSignin = document.getElementById("btnSignin");
const btnSignup = document.getElementById("btnSignup");
const formSignin = document.getElementById("signin");
const formSignup = document.getElementById("signup");
const btnColor = document.querySelector(".btnColor");

btnSignin.addEventListener("click", () => {
  formSignin.classList.add("active");
  formSignup.classList.remove("active");
  btnColor.style.left = "0";
});

btnSignup.addEventListener("click", () => {
  formSignup.classList.add("active");
  formSignin.classList.remove("active");
  btnColor.style.left = "50%";
});


document.getElementById('signup').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    nome_completo: e.target.nomecompleto.value.trim(),
    email: e.target.email.value.trim(),
    senha: e.target.senha.value,
    confirmarsenha: e.target.confirmarsenha.value
  };

  const senha = e.target.senha.value;
  const confirmarSenha = e.target.confirmarsenha.value;
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }


  // Validações básicas
  if (!formData.nome_completo || !formData.email || !formData.senha) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  if (formData.senha.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres!');
    return;
  } 

  const response = await fetch('http://127.0.0.1:8000/api/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

    // Restaurar botão
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    if (response.ok) {
      // Sucesso
      alert('Cadastro realizado com sucesso!');
      console.log('Cliente cadastrado:', data);

      // Limpar formulário
      e.target.reset();

      // Opcional: redirecionar ou mudar para login
      formSignin.classList.add("active");
      formSignup.classList.remove("active");
      btnColor.style.left = "0";
    } else {
      // Erro da API
      const errorMsg = data.erro || data.detalhes || 'Erro ao cadastrar';
      alert(`Erro: ${errorMsg}`);
      console.error('Erro na resposta:', data);
    }


});
