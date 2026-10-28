document.addEventListener('DOMContentLoaded', () => {
    const greetingEl = document.getElementById('greeting');
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    const inputs = {
        email: document.getElementById('email'),
        password: document.getElementById('password')
    };

    const errors = {
        email: document.getElementById('emailError'),
        password: document.getElementById('passwordError')
    };

    /**
     * Dynamic Greeting based on time of day (Translated to Portuguese)
     */
    const setGreeting = () => {
        const hour = new Date().getHours();
        let greeting = 'Bom dia!';

        if (hour >= 12 && hour < 18) {
            greeting = 'Boa tarde!';
        } else if (hour >= 18 || hour < 5) {
            greeting = 'Boa noite!';
        }

        greetingEl.textContent = greeting;
    };

    /**
     * Validation Logic (Translated to Portuguese)
     */
    const validators = {
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) return 'O e-mail é obrigatório';
            if (!emailRegex.test(value)) return 'Insira um e-mail válido';
            return null;
        },
        password: (value) => {
            if (!value) return 'A senha é obrigatória';
            if (value.length < 6) return 'A senha deve ter pelo menos 6 caracteres';
            return null;
        }
    };

    const setFieldError = (fieldName, errorMessage) => {
        const input = inputs[fieldName];
        const errorSpan = errors[fieldName];

        if (errorMessage) {
            errorSpan.textContent = errorMessage;
            input.classList.add('invalid');
            input.setAttribute('aria-invalid', 'true');
            input.setAttribute('aria-describedby', `${fieldName}Error`);
        } else {
            errorSpan.textContent = '';
            input.classList.remove('invalid');
            input.removeAttribute('aria-invalid');
            input.removeAttribute('aria-describedby');
        }
    };

    // Blur and Input events for validation
    Object.keys(inputs).forEach(fieldName => {
        inputs[fieldName].addEventListener('blur', () => {
            const error = validators[fieldName](inputs[fieldName].value);
            setFieldError(fieldName, error);
        });

        inputs[fieldName].addEventListener('input', () => {
            if (inputs[fieldName].classList.contains('invalid')) {
                const error = validators[fieldName](inputs[fieldName].value);
                if (!error) setFieldError(fieldName, null);
            }
        });
    });

    /**
     * Toggle Password Visibility
     */
    document.querySelector('.toggle-password').addEventListener('click', () => {
        const passwordInput = inputs.password;
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';

        // Change icon color based on state
        document.querySelector('.toggle-password').style.color = isPassword ? 'var(--color-primary)' : 'var(--color-text-muted)';
    });

    /**
     * Handle Submission
     */
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isFormValid = true;
        const values = {};

        Object.keys(inputs).forEach(fieldName => {
            const value = inputs[fieldName].value;
            const error = validators[fieldName](value);
            setFieldError(fieldName, error);
            if (error) isFormValid = false;
            values[fieldName] = value;
        });

        if (!isFormValid) return;

        // Loading State
        submitBtn.disabled = true;
        btnText.textContent = 'Entrando...';
        spinner.classList.remove('hidden');

        try {
            await handleLogin(values);
        } catch (err) {
            console.error('Login error:', err);
            alert('Ocorreu um erro. Por favor, tente novamente.');
            submitBtn.disabled = false;
            btnText.textContent = 'Entrar';
            spinner.classList.add('hidden');
        }
    });

    async function handleLogin(values) {
        console.log('Submitting login data:', values);

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('API Response: Success');
                alert('Login realizado com sucesso! (Simulado)');
                resolve();
            }, 2000);
        });
    }

    // Initialize greeting
    setGreeting();
});
