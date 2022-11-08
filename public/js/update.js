document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.querySelector('#inputTitle').value.trim();
    const text = document.querySelector('#inputText').value.trim();
    const id = Number(document.querySelector('form').dataset.id);
    if(title && text && id){
        const response = await fetch('/api/blog', {
            method: 'PUT',
            body: JSON.stringify({ text, title, id}),
            headers: { 'Content-Type': 'application/json' },
    
        })
        if (response.ok) {
            document.location.replace(`/dashboard/edit/${id}`);
        } else {
            alert('Something was entered incorrectly, try again.');
        }
    }
});

document.querySelector('#delete-button').addEventListener('click', async (event) => {
    event.preventDefault();
    const id = Number(document.querySelector('form').dataset.id);
    const response = await fetch('/api/blog', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Something was entered incorrectly, try again.');
    }
});