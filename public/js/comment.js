document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = document.querySelector('#inputText').value.trim();
    const blogid = Number(document.querySelector('#main-post').dataset.id);

    if(text){
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ text,  blog_id: blogid }),
            headers: { 'Content-Type': 'application/json' },
    
        })
        if (response.ok) {
            document.location.replace(`/blog/${blogid}`);
        } else {
            alert('Something was entered incorrectly, try again.');
        }
    }
});