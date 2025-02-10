// Evento para adicionar o pedido ao clicar no botão
document.getElementById('adicionar-pedido').onclick = function () {
    const { pedido, mesaID } = recolherPedido();  // Captura os dados do pedido
    criarPedido(pedido, mesaID);  // Cria o pedido e adiciona à coluna "A Fazer"
}

// Recolhe os dados do pedido através de prompt
function recolherPedido() {
    const pedido = prompt('Informe os pratos escolhidos:');
    const mesaID = prompt('Informe o ID da Mesa:');
    return { pedido, mesaID };  // Retorna os dados do pedido
}

// Cria o pedido e adiciona à coluna "A Fazer"
function criarPedido(pedido, mesaID) {
    const coluna = document.getElementById('todo-cards');
    const card = criarCard(pedido, mesaID);  // Cria o cartão
    coluna.appendChild(card);  // Adiciona o cartão à coluna "A Fazer"
}

// Cria o elemento do cartão
function criarCard(pedido, mesaID) {
    const card = document.createElement("div");
    card.classList.add("kanban-card");
    card.setAttribute("draggable", "true");  // Torna o cartão arrastável
    card.setAttribute("ondragstart", "arrasteIniciado(event)");

    // Adiciona o conteúdo do cartão
    card.innerHTML = `
        <span><strong>Pedido:</strong> ${pedido}</span><br>
        <span><strong>Mesa ID:</strong> ${mesaID}</span><br>
        <button class="edit-button" onclick="editarPedido(this)">Editar</button>
        <button class="delete-button" onclick="removerPedido(this)">Remover</button>
    `;
    return card;
}

// Função chamada quando o arrasto do cartão começa
function arrasteIniciado(event) {
    event.dataTransfer.setData("text", event.target.innerHTML);  // Armazena o conteúdo do cartão
}

// Permite que o cartão seja solto na coluna
function allowDrop(event) {
    event.preventDefault();  // Impede o comportamento padrão (impedir o drop)
}

// Função chamada quando o cartão é solto
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");  // Obtém os dados do cartão

    const colunaDestino = event.target.closest('.kanban-cards');
    if (colunaDestino) {
        const card = document.createElement("div");
        card.classList.add("kanban-card");
        card.innerHTML = data;  // Recria o cartão com os dados transferidos
        colunaDestino.appendChild(card);  // Adiciona o cartão à nova coluna
    }
}

// Função de editar o pedido (apenas para efeito, pode ser expandido)
function editarPedido(button) {
    const card = button.closest('.kanban-card');
    const pedido = prompt("Editar pedido:", card.querySelector('span').innerText);
    if (pedido) {
        card.querySelector('span').innerText = pedido;  // Atualiza o pedido no cartão
    }
}

// Função de remover o pedido
function removerPedido(button) {
    const card = button.closest('.kanban-card');
    card.remove();  // Remove o cartão da coluna
}
