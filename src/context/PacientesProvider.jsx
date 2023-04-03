import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const PacientesContext = createContext()

export const PacientesProvider = ({ children }) => {

    const { auth }  = useAuth()
    const [pacientes, SetPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pacientes', config)
                SetPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth])

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                SetPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                const { cratedAt, updateAt, __v, ...pacienteAlmacenado } = data
                SetPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)

            }
        }


    }
    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?')
        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                
                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id)
                SetPacientes(pacientesActualizado)

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente

            }}>
            {children}
        </PacientesContext.Provider>
    )

}


export default PacientesContext;