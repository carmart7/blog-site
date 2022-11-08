document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.querySelector('#inputTitle').value.trim();
    const text = document.querySelector('#inputText').value.trim();
    if(title && text){
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ text, title }),
            headers: { 'Content-Type': 'application/json' },
    
        })
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert('Something was entered incorrectly, try again.');
        }
    }
});