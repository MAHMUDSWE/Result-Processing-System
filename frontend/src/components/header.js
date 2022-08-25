import React from 'react'
import "./style/header.css"
import sustlogo from  "../assets/sustlogo.png"

export default function HeaderSection() {
    return (
        <div className="Header-section">
            <header className="Header-container">
                <img height="100px" width src={sustlogo} alt="logo" />
                <p>
                    Result Processing System <br />
                    Shahjalal University of Science and Technology
                </p>
            </header>
        </div>
    )
}
