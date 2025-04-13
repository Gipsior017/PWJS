function checkForm() {
    let error = false;

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const info = document.getElementById("contactInfo");

    // Reset error messages and styles
    document.getElementById("errorName").className = "hide text-danger";
    document.getElementById("errorEmail").className = "hide text-danger";
    document.getElementById("errorInfo").className = "hide text-danger";

    name.classList.remove("is-invalid", "is-valid");
    email.classList.remove("is-invalid", "is-valid");
    info.classList.remove("is-invalid", "is-valid");

    // Validate Name
    if (name.value.trim() === "") {
        document.getElementById("errorName").className = "alert alert-danger";
        name.classList.add("is-invalid");
        error = true;
    } else {
        name.classList.add("is-valid");
    }

    // Validate Email
    if (email.value.trim() === "") {
        document.getElementById("errorEmail").innerHTML = "Adres email jest wymagany!";
        document.getElementById("errorEmail").className = "alert alert-danger";
        email.classList.add("is-invalid");
        error = true;
    } else {
        const regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/;
        if (!regex.test(email.value)) {
            document.getElementById("errorEmail").innerHTML = "Błędny format adresu email";
            document.getElementById("errorEmail").className = "alert alert-danger";
            email.classList.add("is-invalid");
            error = true;
        } else {
            email.classList.add("is-valid");
        }
    }

    // Validate Info
    if (info.value.trim() === "") {
        document.getElementById("errorInfo").className = "alert alert-danger";
        info.classList.add("is-invalid");
        error = true;
    } else {
        info.classList.add("is-valid");
    }

    return !error;
}

function validateName() {
    const name = document.getElementById("contactName");
    const error = document.getElementById("errorName");
    if (name.value.trim() === "") {
        error.className = "alert alert-danger";
        name.classList.add("is-invalid");
    } else {
        error.className = "hide text-danger";
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
    }
}

function validateEmail() {
    const email = document.getElementById("contactEmail");
    const error = document.getElementById("errorEmail");
    const regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/;

    if (email.value.trim() === "") {
        error.innerHTML = "Adres email jest wymagany!";
        error.className = "alert alert-danger";
        email.classList.add("is-invalid");
    } else if (!regex.test(email.value)) {
        error.innerHTML = "Błędny format adresu email";
        error.className = "alert alert-danger";
        email.classList.add("is-invalid");
    } else {
        error.className = "hide text-danger";
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }
}

function validateInfo() {
    const info = document.getElementById("contactInfo");
    const error = document.getElementById("errorInfo");
    if (info.value.trim() === "") {
        error.className = "alert alert-danger";
        info.classList.add("is-invalid");
    } else {
        error.className = "hide text-danger";
        info.classList.remove("is-invalid");
        info.classList.add("is-valid");
    }
}
