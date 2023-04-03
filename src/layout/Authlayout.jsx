import { Outlet } from "react-router-dom";

const Authlayout = () => {
  return (
    <>
    
    <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-18 p-5">
    <Outlet/>

    </main>
    
    </>
  );
};

export default Authlayout;
