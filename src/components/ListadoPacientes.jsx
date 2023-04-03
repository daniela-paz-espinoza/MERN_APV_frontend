import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {
  const { pacientes } = usePacientes()
  return (
    <>
      {pacientes.length ?
        (
          <>
            <h2 className="font-black text-3xl text-center text-pink-800">Listado Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center text-pink-400">
              Administra tus {''}
              <span className="text-pink-800 font-bold ">Clientes y Citas</span>
            </p>
            {pacientes.map(paciente => (
              <Paciente
                key={paciente._id}
                paciente={paciente}
              />
            ))}
          </>
        ) :
        (
          <>
            <h2 className="font-black text-3xl text-center text-pink-800">No hay Clientes Registrados</h2>
            <p className="text-xl mt-5 mb-10 text-center text-pink-400">
              Comienza agregando clientes {''}
              <span className="text-pink-800 font-bold ">y apareceran en este lugar</span>
            </p>
          </>
        )}
    </>
  )
}

export default ListadoPacientes
