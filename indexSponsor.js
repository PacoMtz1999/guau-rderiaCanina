const db = firebase.firestore();

const sponsorForm = document.getElementById('sponsorForm')


const saveForm = (nombre, correo, telefono, mensaje) =>
    db.collection('sponsors').doc().set({
        nombre,
        correo,
        telefono,
        mensaje,
    });

sponsorForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = sponsorForm['nombre'];
    const correo = sponsorForm['correo'];
    const telefono = sponsorForm['telefono'];
    const mensaje = sponsorForm['mensaje'];


    await saveForm(nombre.value, correo.value, telefono.value, mensaje.value);
    sponsorForm.reset();
    nombre.focus();

    alert("Formulario guardado");
})