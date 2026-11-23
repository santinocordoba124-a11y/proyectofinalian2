class sistematurno {

    constructor() {
        this.pacientes = [];
        this.turnos = [];
        this.cargardatos();
    }

    // ==========================================
    // CARGAR Y GUARDAR DATOS
    // ==========================================

    cargardatos() {

        let paciente = localStorage.getItem("pacientes");
        let turno = localStorage.getItem("turnos");

        if (paciente != null) {
            let datosPacientes = JSON.parse(paciente);

            this.pacientes = datosPacientes.map(p =>
                new pacienteClase(
                    p.nombre, p.apellido, p.edad,
                    p.dni, p.telefono, p.sexo
                )
            );
        }

        if (turno != null) {
            let datosTurnos = JSON.parse(turno);

            this.turnos = datosTurnos.map(t => {

                let persona = this.buscarpaciente(t.dni);

                let nuevo = new Turno(
                    t.Codigo,
                    t.Tipo,
                    t.Fecha,
                    t.Especialidad,
                    persona,
                    t.Hora
                );

                nuevo.Estado = t.Estado || "Pendiente";

                return nuevo;
            });
        }
    }

    guardarDatos() {

        localStorage.setItem(
            "pacientes",
            JSON.stringify(this.pacientes)
        );

        let datosTurnos = this.turnos.map(t => ({
            Codigo: t.getCodigo(),
            Tipo: t.getTipo(),
            Fecha: t.getFecha(),
            Especialidad: t.getEspecialidad(),
            dni: t.getPaciente().getdni(),
            Hora: t.getHora(),
            Estado: t.getEstado()
        }));

        localStorage.setItem(
            "turnos",
            JSON.stringify(datosTurnos)
        );
    }


    // ==========================================
    // PACIENTES
    // ==========================================

    buscarpaciente(dni) {

        for (let i = 0; i < this.pacientes.length; i++) {

            if (this.pacientes[i].getdni() == dni) {
                return this.pacientes[i];
            }
        }

        return null;
    }

    registrarpaciente(persona) {

        if (this.buscarpaciente(persona.getdni()) != null) {
            return false;
        }

        this.pacientes.push(persona);
        this.guardarDatos();

        return true;
    }


    // ==========================================
    // TURNOS
    // ==========================================

    buscarturno(id) {

        for (let i = 0; i < this.turnos.length; i++) {

            if (this.turnos[i].getCodigo() == id) {
                return this.turnos[i];
            }
        }

        return null;
    }

    listaturnos() {
        return this.turnos;
    }

    listaturnospordni(dni) {

        let resultado = [];

        for (let i = 0; i < this.turnos.length; i++) {

            if (this.turnos[i].getPaciente().getdni() == dni) {
                resultado.push(this.turnos[i]);
            }
        }

        return resultado;
    }


    // ==========================================
    // VERIFICAR HORARIO DISPONIBLE
    // ==========================================

    horariodisponible(especialidad, fecha, hora, idexcluir = null) {

        for (let i = 0; i < this.turnos.length; i++) {

            let tActual = this.turnos[i];

            if (
                tActual.getCodigo() != idexcluir &&
                tActual.getEspecialidad() == especialidad &&
                tActual.getFecha() == fecha &&
                tActual.getHora() == hora &&
                tActual.getEstado() != "Cancelado"
            ) {
                return false;
            }
        }

        return true;
    }


    // ==========================================
    // REGISTRAR TURNO
    // ==========================================

    registrarturno(turno) {

        if (
            !this.horariodisponible(
                turno.getEspecialidad(),
                turno.getFecha(),
                turno.getHora()
            )
        ) {
            return false;
        }

        this.turnos.push(turno);
        this.guardarDatos();

        return true;
    }


    // ==========================================
    // MODIFICAR TURNO
    // ==========================================

    modificarturno(id, nuevosDatos) {

        let turno = this.buscarturno(id);

        if (turno == null) {
            return false;
        }

        if (turno.getEstado() == "Cancelado") {
            return false;
        }

        if (
            !this.horariodisponible(
                nuevosDatos.especialidad,
                nuevosDatos.fecha,
                nuevosDatos.hora,
                id
            )
        ) {
            return false;
        }

        turno.setTipo(nuevosDatos.tipo);
        turno.setFecha(nuevosDatos.fecha);
        turno.setHora(nuevosDatos.hora);
        turno.setEspecialidad(nuevosDatos.especialidad);

        this.guardarDatos();

        return true;
    }


    // ==========================================
    // CANCELAR TURNO
    // ==========================================

    cancelarturno(id) {

        let turno = this.buscarturno(id);

        if (turno == null || turno.getEstado() == "Cancelado") {
            return false;
        }

        turno.setEstado("Cancelado");

        this.guardarDatos();

        return true;
    }


    // ==========================================
    // ELIMINAR TURNO
    // ==========================================

    eliminarturno(id) {

        for (let i = 0; i < this.turnos.length; i++) {

            if (this.turnos[i].getCodigo() == id) {

                this.turnos.splice(i, 1);

                this.guardarDatos();

                return true;
            }
        }

        return false;
    }


    // ==========================================
    // GENERAR CODIGO
    // ==========================================

    generarCodigo() {

        let mayor = 0;

        for (let i = 0; i < this.turnos.length; i++) {

            if (this.turnos[i].getCodigo() > mayor) {
                mayor = this.turnos[i].getCodigo();
            }
        }

        return mayor + 1;
    }
}


// ==========================================
// CLASE PACIENTE
// ==========================================

class pacienteClase {

    constructor(nombre, apellido, edad, dni, telefono, sexo) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.telefono = telefono;
        this.sexo = sexo;
    }

    getnombre() {
        return this.nombre;
    }

    getapellido() {
        return this.apellido;
    }

    getedad() {
        return this.edad;
    }

    getdni() {
        return this.dni;
    }

    gettelefono() {
        return this.telefono;
    }

    getsexo() {
        return this.sexo;
    }

    setnombre(nombre) {
        this.nombre = nombre;
    }

    setapellido(apellido) {
        this.apellido = apellido;
    }

    setedad(edad) {
        this.edad = edad;
    }

    setdni(dni) {
        this.dni = dni;
    }

    settelefono(telefono) {
        this.telefono = telefono;
    }

    setsexo(sexo) {
        this.sexo = sexo;
    }
}


// ==========================================
// CLASE TURNO
// ==========================================

class Turno {

    constructor(Codigo, Tipo, Fecha, Especialidad, Paciente, Hora) {

        this.Codigo = Codigo;
        this.Tipo = Tipo;
        this.Fecha = Fecha;
        this.Especialidad = Especialidad;
        this.Paciente = Paciente;
        this.Hora = Hora;
        this.Estado = "Pendiente";
    }

    getCodigo() {
        return this.Codigo;
    }

    getTipo() {
        return this.Tipo;
    }

    getFecha() {
        return this.Fecha;
    }

    getEspecialidad() {
        return this.Especialidad;
    }

    getPaciente() {
        return this.Paciente;
    }

    getHora() {
        return this.Hora;
    }

    getEstado() {
        return this.Estado;
    }

    setCodigo(Codigo) {
        this.Codigo = Codigo;
    }

    setTipo(Tipo) {
        this.Tipo = Tipo;
    }

    setFecha(Fecha) {
        this.Fecha = Fecha;
    }

    setEspecialidad(Especialidad) {
        this.Especialidad = Especialidad;
    }

    setPaciente(Paciente) {
        this.Paciente = Paciente;
    }

    setHora(Hora) {
        this.Hora = Hora;
    }

    setEstado(Estado) {
        this.Estado = Estado;
    }
}


// ==========================================
// CREAR OBJETO DEL SISTEMA
// ==========================================

const sistema = new sistematurno();