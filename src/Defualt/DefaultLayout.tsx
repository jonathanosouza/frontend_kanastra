
import { Navbar } from "@/components/ui/navbar";
import { Outlet } from "react-router-dom";

export function LayoutPage(){

    return (
      <>
        <Navbar/>
       <Outlet/>
       </>
    )

}
