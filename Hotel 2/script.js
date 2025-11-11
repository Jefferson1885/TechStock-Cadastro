document.querySelector('#reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const checkin = document.getElementById('data-checkin').value;
  const checkout = document.getElementById('data-checkout').value;
  const quartos = parseInt(document.getElementById('quartos').value);

  let erros = [];

  // ======= Validações =======
  if (nome.length < 3) erros.push('Nome deve ter pelo menos 3 caracteres.');
  if (!email.match(/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/)) erros.push('Email inválido.');
  if (!telefone.match(/^\d{10,11}$/)) erros.push('Telefone deve ter 10 ou 11 dígitos.');
  if (!checkin) erros.push('Informe a data de check-in.');
  if (!checkout) erros.push('Informe a data de check-out.');

  const dataCheckin = new Date(checkin);
  const dataCheckout = new Date(checkout);

  if (checkin && checkout && dataCheckin >= dataCheckout)
    erros.push('Check-out deve ser após o check-in.');

  if (quartos < 1 || isNaN(quartos))
    erros.push('Número de quartos deve ser pelo menos 1.');

  // ======= Se houver erros =======
  if (erros.length > 0) {
    alert(erros.join('\n'));
    return;
  }

  // ======= Cálculo do valor da reserva =======
  const precoPorNoite = 250; // R$ por quarto
  const diferencaTempo = dataCheckout - dataCheckin;
  const dias = diferencaTempo / (1000 * 60 * 60 * 24); // converte milissegundos em dias
  const valorTotal = dias * precoPorNoite * quartos;

  // ======= Exibição do resultado =======
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.style.color = 'green';
  resultadoDiv.innerHTML = `
    <p>Reserva realizada com sucesso!</p>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Período:</strong> ${dias} noite(s)</p>
    <p><strong>Quartos:</strong> ${quartos}</p>
    <p><strong>Valor total:</strong> R$ ${valorTotal.toFixed(2)}</p>
  `;
});


