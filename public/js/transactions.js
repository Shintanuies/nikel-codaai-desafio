// --- Modal ---
const myModal = new bootstrap.Modal(document.getElementById("transactions-modal"));

// --- Verificação de login ---
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkedLogger();

// Dados do usuário logado
let data = {
    transactions: []
};

// Carrega dados do localStorage
if (logged) {
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }
    renderTransactions();
}

// --- Botão logout ---
document.getElementById("button-logout").addEventListener("click", logout);

// --- Evento do formulário ---
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    if (isNaN(value)) {
        alert("Informe um valor válido!");
        return;
    }

    if (!date) {
        alert("Informe uma data válida!");
        return;
    }

    data.transactions.unshift({
        value: value,
        description: description,
        date: date,
        type: type
    });

    saveData(data);
    renderTransactions();

    e.target.reset();
    myModal.hide();
    alert("Lançamento adicionado com sucesso!");
});

// ----------------------------
// Funções
// ----------------------------

// Verifica se há login ativo
function checkedLogger() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
    }
}

// Salva no localStorage
function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}

// Preenche a tabela com os lançamentos
function renderTransactions() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // limpa antes de redesenhar

    if (!data.transactions || data.transactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">Nenhum lançamento ainda.</td>
            </tr>
        `;
        return;
    }

    data.transactions.forEach((item) => {
        const tr = document.createElement("tr");

        // Conversão do tipo (1=Entrada, 2=Saída)
        const typeText = item.type === "1" ? "Entrada" : "Saída";

        tr.innerHTML = `
            <th scope="row">${formatDate(item.date)}</th>
            <td>${item.value.toFixed(2)}</td>
            <td>${typeText}</td>
            <td>${item.description}</td>
        `;

        tbody.appendChild(tr);
    });
}

// Ajusta data YYYY-MM-DD → DD/MM/YYYY
function formatDate(dateString) {
    const parts = dateString.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Logout
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}
