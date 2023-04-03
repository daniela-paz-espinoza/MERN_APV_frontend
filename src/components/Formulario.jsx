import { useState, useEffect } from "react"
import Alerta from "../components/Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])


    const handleSubmit = e => {
        e.preventDefault()
        //validar formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({
            msg: 'Guardado Correctamente'
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')

    }

    const { msg } = alerta

    return (
        <>
            <h2 className="font-black text-3xl text-center text-pink-800">Administrador de Clientes</h2>
            <p className="text-xl mt-5 mb-10 text-center text-pink-400">
                Añade tus clientes y {''}
                <span className="text-pink-800 font-bold ">Administralos</span>
            </p>

            {msg && <Alerta alerta={alerta} />}

            <form
                className="bg-white py-10 px-5 pb-10 lg:mb-0 shadow-md rounded-md"
                onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="text-pink-800 uppercase font-bold"
                    >Nombre Cliente</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre del Cliente"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                 <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="text-pink-800 uppercase font-bold"
                    >Rut Cliente</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Rut del Cliente"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-pink-800 uppercase font-bold"
                    >Email del Cliente</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email Cliente"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="fecha"
                        className="text-pink-800 uppercase font-bold"
                    >Fecha de Atencion</label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-pink-800 uppercase font-bold"
                    >Servicio a Realizar</label>
                    <textarea
                        id="sintomas"
                        placeholder="Corte de pelo, depilación..."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-pink-800 w-full p-3 text-white uppercase font-bold hover:bg-pink-900 cursor-pointer transition-colors"
                    value={id ? 'Guardar Cambios' : "Agregar Paciente"}
                />
            </form>

        </>
    )
}

export default Formulario
