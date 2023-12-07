import React,{useEffect} from 'react';
import './Header.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";


interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {

    useEffect(() => {
        document.title='📸Spectral Imaging'
    })

    return (
        <header>
            <Toolbar>
                <Typography>
                 <h2 className="prompt">{title}</h2>
                </Typography>
                <div id="nav-items">
                    <Link className="link-text" to="/">Home</Link>
                    <Link className="link-text" to="/gallery">Gallery</Link>
                    <Link className="link-text" to="/editor">Editor</Link>
                </div>
            </Toolbar>
        </header>
    );
};

export default Header;
