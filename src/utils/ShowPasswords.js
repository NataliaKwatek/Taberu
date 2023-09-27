const showPassword = () => {
    const showPass = document.getElementById('password');
    if (showPass.type === 'password') {
        showPass.type = 'text';
    } else {
        showPass.type = 'password';
    }
}

const showPasswordConfirm = () => {
    const showPassConf = document.getElementById('password_confirm');
    if (showPassConf.type === 'password') {
        showPassConf.type = 'text';
    } else {
        showPassConf.type = 'password';
    }
}

export { showPassword, showPasswordConfirm };