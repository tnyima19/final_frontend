import { NavLink, Outlet } from "react-router-dom"

export default function RootLayout(){
    return(
        <div>
            <header>
                <nav>
                    <h1>Employee management system</h1>
                    <NavLink to="/">Employee</NavLink>
                    <NavLink to="about">About</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}