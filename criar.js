document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const successBox = document.getElementById('registrationSuccessBox');

    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }

    // Função de validação principal ao submeter o formulário
    function handleRegistration(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        // 1. Coleta de Dados
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confSenha = document.getElementById('confsenha').value;

        // 2. Resetar erros visuais
        document.querySelectorAll('.err span').forEach(span => span.style.display = 'none');
        successBox.style.display = 'none';
        
        let isValid = true;

        // 3. Validação dos Campos
        if (!nome) {
            document.querySelector('.name-err').textContent = "O nome é obrigatório.";
            document.querySelector('.name-err').style.display = 'block';
            isValid = false;
        }

        // Regex simples para e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            document.querySelector('.email-err').textContent = "Por favor, insira um e-mail válido.";
            document.querySelector('.email-err').style.display = 'block';
            isValid = false;
        }

        if (senha.length < 6) {
            document.querySelector('.password-err').textContent = "A senha deve ter no mínimo 6 caracteres.";
            document.querySelector('.password-err').style.display = 'block';
            isValid = false;
        } else if (!confSenha) {
             document.querySelector('.confirm-password-err').textContent = "Confirme a senha para continuar.";
            document.querySelector('.confirm-password-err').style.display = 'block';
            isValid = false;
        } else if (senha !== confSenha) {
            document.querySelector('.confirm-password-err').textContent = "As senhas não coincidem.";
            document.querySelector('.confirm-password-err').style.display = 'block';
            isValid = false;
        }

        // 4. Submissão (Se tudo estiver válido)
        if (isValid) {
            // Simula o envio dos dados para um backend (AJAX/Fetch API)
            console.log("Tentando registrar:", { nome, email, senha });

            // --- SIMULAÇÃO DE SUCESSO ---
            setTimeout(() => {
                successBox.style.display = 'block'; 
                registrationForm.reset(); // Limpa o formulário
            }, 1000);

            // Se você estiver usando um servidor real, substitua o setTimeout pelo fetch:
            /*
            fetch('/api/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ nome, email, senha })
            })
            .then(response => response.json())
            .then(data => {
                 // Lógica de sucesso aqui...
            });
            */

        } else {
             alert("Por favor, corrija os campos antes de tentar novamente.");
        }
    }
});
