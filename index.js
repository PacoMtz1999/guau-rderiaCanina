const db = firebase.firestore();

const dogForm = document.getElementById('adoptForm')


const saveForm = (nombre, correo, telefono) =>
    db.collection('forms').doc().set({
        nombre,
        correo,
        telefono,
    });

dogForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = dogForm['nombre'];
    const correo = dogForm['correo'];
    const telefono = dogForm['telefono'];


    await saveForm(nombre.value, correo.value, telefono.value);
    dogForm.reset();
    nombre.focus();

    alert("Formulario guardado");
})