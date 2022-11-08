document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#input-username').value.trim();
    const password = document.querySelector('#input-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Something was entered incorrectly, try again.');
        }
    }
});