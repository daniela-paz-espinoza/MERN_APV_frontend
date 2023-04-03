import { Outlet, useNavigate } from "react-router-dom"
import Headers from "../components/Headers"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const { auth, cargando } = useAuth()  
    const navigate = useNavigate()   

    if (cargando) return ('cargando...')

    return (
        <>
            <Headers />
            {auth.veterinario?._id ?
                (<main className="container mx-auto mt-10">
                    <Outlet />
                </main>) : navigate('/')}
            <Footer />
        </>
    )
}

export default RutaProtegida
