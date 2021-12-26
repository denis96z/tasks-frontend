'use strict';

const MENU = {
    menu: {
        path: '/',
        text: 'Menu',
        always: true,
        onClick: showMenuPage,
    },
    signup: {
        path: '/signup',
        text: 'Sign up',
        onClick: showSignUpPage,
    },
    signin: {
        path: '/signin',
        text: 'Sign in',
        onClick: showSignInPage,
    },
    userinfo: {
        path: '/userinfo',
        text: 'Profile',
        authorized: true,
        onClick: showUserInfoPage,
    },
    signout: {
        path: '/signout',
        text: 'Sign out',
        authorized: true,
        onClick: signOut,
    },
};

const menuItems = Object.entries(MENU)
    .map(([k, v]) => {
        const item = document.createElement('a');

        item.href = v.path;
        item.textContent = v.text;
        item.className = 'menu-item';
        item.dataset.section = k;
        item.onclick = (e) => {
            e.preventDefault();
            v.onClick();
        }

        return item;
    });

function isAuthorized() {
    return !!localStorage.getItem('email');
}

function isMenuItemVisibleForCurrentState(item) {
    const s = isAuthorized();
    const a = MENU[item.dataset.section].authorized;

    return (s && a) || (!s && !a) || MENU[item.dataset.section].always;
}

function setMenuItemsVisible(p) {
    menuItems.forEach(item => {
        item.className = (p(item) && isMenuItemVisibleForCurrentState(item)) ? 'menu-item' : 'hidden-menu-item';
    });
}

function showMenuItemsExcept(...names) {
    setMenuItemsVisible((item) => !names.includes(item.dataset.section), names);
}

function hideMenuItemsExcept(...names) {
    setMenuItemsVisible((item) => names.includes(item.dataset.section), names);
}

const menu = document.getElementById('js-menu');
const root = document.getElementById('js-root');

menuItems.forEach(item => menu.appendChild(item));
if (isAuthorized())
    showUserInfoPage();
else
    showMenuPage();

function showMenuPage() {
    showMenuItemsExcept('menu');
    root.innerHTML = '';
}

function showUserInfoPage() {
    if (!isAuthorized())
    {
        showSignUpPage();
        return;
    }

    let email = localStorage.getItem('email');
    const txt = document.createTextNode(`Authorized as ${email}`);

    hideMenuItemsExcept('menu');

    root.innerHTML = '';
    root.appendChild(txt);
}

function showAuthPage(...extraMenuItems) {
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    submitButton.onclick = (e) => {
        e.preventDefault()

        localStorage.setItem('email', emailInput.value);
        showUserInfoPage();
    };

    const form = document.createElement('form');
    form.className = 'auth-form';
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitButton);

    hideMenuItemsExcept('menu', ...extraMenuItems);

    root.innerHTML = '';
    root.appendChild(form);
}

function showSignUpPage() {
    showAuthPage('signin');
}

function showSignInPage() {
    showAuthPage('signup');
}

function signOut() {
    localStorage.removeItem('email');
    showMenuPage();
}
