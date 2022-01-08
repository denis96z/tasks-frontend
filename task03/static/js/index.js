'use strict';

const root = document.getElementById('root');
const token = document.getElementById('token');
const loader = document.getElementById('loader');

const tokenText = document.getElementById('token-text');

async function fetchToken() {
    try {
        root.innerHTML = '';
        root.appendChild(loader);

        const res = await fetch('/api/token', {method: 'POST'});
        if (res.status === 200) {
            const data = await res.json();

            tokenText.textContent = data['token'];

            root.innerHTML = '';
            root.appendChild(token);
        } else {
            console.log(`request failed: ${res.status}`);
        }
    } catch (err) {
        console.log(err);
    }
}

fetchToken().then(_ => {});
