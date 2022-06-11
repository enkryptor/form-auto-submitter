"use strict"

window.addEventListener('load', initializeListeners)

function initializeListeners() {
    const forms = document.querySelectorAll('form.auto-submit')
    for (const form of forms) {
        form.addEventListener('change', onChange)
    }
}

function onChange(event) {
    const control = event.target
    const form = control.form
    if (!form) {
        return
    }

    sendForm(form).then(result => {
        if (result) {
            processResult(result.ok, control)
        }
    })
}

async function sendForm(form) {
    const url = form.action;
    const method = form.method;
    if (!url || !method) {
        return
    }

    const formData = new FormData(form)
    const body = new URLSearchParams(formData).toString()
    return await fetch(url, { method, body })
}

function processResult(success, element) {
    if (!success) {
        element.classList.add('submit-error');
    } else {
        element.classList.remove('submit-error');
    }
}
