import React from 'react'
import "./Home.css";
import {Link} from "react-router-dom"

export default function Home() {

    return (
        <>
            <div  className="profile-container">
                <ul>
                    <Link className="button" to="/customer">
                        Clientes
                    </Link>
                    <Link className="button" to="/lawyer">
                        Advogados
                    </Link>
                    <Link className="button" to="/action">
                        Ações
                    </Link>
                </ul>
            </div>
        </>
    )
}
