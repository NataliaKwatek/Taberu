const showPassword = () => {
    const showPass = document.getElementById('password');
    const closedIcon = document.getElementById('closed');
    const openIcon = document.getElementById('open_pass');
    if (showPass.type === 'password') {
        showPass.type = 'text';
        closedIcon.style.display = 'none';
        openIcon.style.display = 'block';
    } else {
        showPass.type = 'password';
        closedIcon.style.display = 'block';
        openIcon.style.display = 'none';
    }
}

const showPasswordConfirm = () => {
    const showPassConf = document.getElementById('password_confirm');
    const closedIconConf = document.getElementById('closed_conf');
    const openIconConf = document.getElementById('open_pass_conf');
    if (showPassConf.type === 'password') {
        showPassConf.type = 'text';
        closedIconConf.style.display = 'none';
        openIconConf.style.display = 'block';
    } else {
        showPassConf.type = 'password';
        closedIconConf.style.display = 'block';
        openIconConf.style.display = 'none';
    }
}

export { showPassword, showPasswordConfirm };