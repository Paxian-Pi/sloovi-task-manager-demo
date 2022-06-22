import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className="sticky-top navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <Link
                    className="navbar-brand"
                    to={'/'}
                >
                    <h4>Sloovi</h4>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </div>
        </nav>
    )
}

export default Navbar