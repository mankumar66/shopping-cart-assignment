
    const cnfmPasswordField = document.getElementById('cnfmPswdContainer').innerText;
    const passwordField = document.getElementById('pswdContainer').innerText;
    const submitBtn = document.getElementById('submitButton');
    const handleNavigation = (e) => {
        if (cnfmPasswordField !== passwordField) {
            alert("not matched")
        }
    };
    submitBtn.addEventListener('click', handleNavigation);
