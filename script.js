
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
    toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.textContent = isOpen ? "✕" : "☰";
    });

    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.textContent = "☰";
        });
    });
}

const toast = document.querySelector("#toast");
let toastTimer;

function notify(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.hidden = false;

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.hidden = true;
    }, 4200);
}

document.querySelectorAll("[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
        notify(
            button.dataset.product +
            " — thanks for exploring our collection!"
        );
    });
});

document.querySelectorAll("[data-scroll-contact]").forEach((button) => {
    button.addEventListener("click", () => {
        window.location.href = "index.html#contact";
    });
});

document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const message = form.querySelector(".form-message");
        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const note = form.querySelector('[name="message"]');

        message.className = "form-message";

        if (
            !name.value.trim() ||
            !email.validity.valid ||
            (note && !note.value.trim())
        ) {
            message.textContent =
                "Please complete all fields and enter a valid email address.";

            message.classList.add("error");
            return;
        }

        message.textContent =
            "Thanks, " + name.value.trim() +
            "! This is a demo form; no message has been sent.";

        message.classList.add("success");
        form.reset();
    });
});

document.querySelectorAll("form[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = form.querySelector('input[type="email"]');
        const status = form.querySelector(".form-message");

        if (!email.validity.valid) {
            status.textContent = "Please enter a valid email address.";
            status.className = "form-message error";
            return;
        }

        status.textContent =
            "Thank you! This is a demo signup; your email was not stored.";

        status.className = "form-message success";
        form.reset();
    });
});
