class sistematurno {
constructor(){
    this.pacientes=[]
    this.turnos=[]
    this.cargardatos()
}
cargardatos(){ 
    let paciente = localStorage.getItem ("pacientes")
    let turno= localStorage.getItem("turnos")
    if (paciente!= null){
    this.paciente = JSON.parse(paciente);
   }
   if (turno!= null){
    this.turnos = JSON.parse(turno)
   }
   }
   guardarDatos(){
    localStorage.setItem("paciente", JSON.stringify(this.pacientes));
    localStorage.setItem("turnos",JSON.stringify(this.turno));
   }
   buscarpaciente(dni){

for(let i=0; i<this.paciente.length;i++){    
    if(this.pacientes[i].getdni()==dni){
  return(this.pacientes[i])
  }  return null
}  

}
buscarturno(id){

for(let i=0; i<this.turnos.length;i++){    
    if(this.turnos[i].getcodigo()==id){
  return(this.turnos[i])
  }
  return null
 }
}
listaturnos(){
    return this.turnos;
}
listaturnosporsni(dni){
    let resultado = []
    for(let i=0; i<this.turnos.length;i++){    
    if(this.turnos[i].getPaciente().getdni()==dni){
        resultado.push(this.turnos[i])
    }
    return resultado
}
}
horariodisponible(tipo,fecha,hora, idexcluir = null){
    for(let i =0; i<this.turnos.length; i++){
        let tActual =this.turnos[i];
        
        if(tActual.getCodigo()!=idexcluir && tActual.getTipo() == tipo && tActual.getFecha()==fecha   

}
}
}



class paciente{

    constructor (nombre,apellido,edad,dni,telefono,sexo) {
        this.nombre=nombre
        this.apellido=apellido
        this.edad=edad
        this.dni=dni
        this.telefono=telefono
        this.sexo=sexo
    }
      getnombre(){
      return this.nombre
    }
    getapellido(){
        return this.apellido
    }
    getedad(){
        return this.edad
    }
    getdni(){
        return this.dni
    }
    gettelefono(){
        return this.telefono
    }
    getsexo(){
        return this.sexo
    }
     setnombre(nombre){
        this.nombre=nombre

    }
    setapellido(apellido){
        this.apellido=apellido
    }
    setdni(dni){
        this.dni=dni
    }
    settelefono(telefono){
        this.año=telefono
    }
    setsexo(sexo){
        this.sexo=sexo
    }
}
{ 

}
class Turno{
    constructor (Codigo,Tipo,Fecha,Especialidad,Paciente) {
        this.Codigo=Codigo
        this.Tipo=Tipo
        this.Fecha=Fecha
        this.Especialidad=Especialidad
        this.Paciente=Paciente
    }
     getCodigo(){
      return this.Codigo
    }

      getTipo(){
      return this.Tipo
    }
    
    getFecha(){
        return this.Fecha
    }
    getEspecialidad(){
        return this.Especialidad
    }
    getPaciente(){
      return this.Paciente
    }
     setCodigo(Codigo){
        this.Codigo=Codigo
    }
    
    setFecha(Fecha){
        this.Fecha=Fecha
    }
    setEspecialidad(Especialidad){
        this.specialidad=Especialidad
    }
    setPaciente(Paciente){
        this.PaEciente=Paciente
    }
 }