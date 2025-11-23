const myModal = new bootstrap.Modal(document.getElementById("register-modal"));

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkedLogger();

// ---------------- LOGIN ----------------
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account || account.password !== password) {
        alert("Ops, verifique o email e a senha.");
        return;
    }

    saveSession(email, checkSession);
    window.location.href = "home.html";
});

// ---------------- CRIAR CONTA ----------------
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length < 5) {
        alert("Preencha o campo com um email válido");
        return;
    }

    if (password.length < 4) {
        alert("A senha precisa ter pelo menos 4 dígitos");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert("Conta criada com sucesso!");
});

// ---------------- VERIFICA LOGIN AUTOMÁTICO ----------------
function checkedLogger() {
    // Se o usuário marcou "manter conectado"
    if (session) {
        sessionStorage.setItem("logged", session);
        window.location.href = "home.html";
        return;
    }

    // Se já existe sessão nesta aba
    if (logged) {
        window.location.href = "home.html";
        return;
    }
}

// ---------------- SALVAR CONTA ----------------
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

// ---------------- SALVAR SESSÃO ----------------
function saveSession(user, persist) {
    if (persist) {
        localStorage.setItem("session", user);
    }
    sessionStorage.setItem("logged", user);
}

// ---------------- BUSCAR CONTA ----------------
function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }
    return null;
}
