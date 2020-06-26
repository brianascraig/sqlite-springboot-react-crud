import React, { useState, useEffect } from 'react';
import './Footer.css';
import logo from './footerLogo.png';

export default function Footer(props) {
    /* If app-container is smaller than the window height,
         fix Footer to the bottom of app-container and add padding to app-container
       If app is bigger than the window height,
         just set Footer positioning to initial and remove padding */

    const [fixedToBottom, setFixedToBottom] = useState(false);

    const calculatePosition = () => {
        let appHeight = document.getElementById('app-container').getBoundingClientRect().height;
        let footerHeight = document.getElementsByTagName('footer')[0].getBoundingClientRect().height;
        let windowHeight = window.innerHeight;

        if (appHeight <= windowHeight) {
            document.getElementById('app-container').setAttribute('style', `padding-bottom: ${footerHeight}px`);
            setFixedToBottom(true)
        } else {
            document.getElementById('app-container').setAttribute("style", "padding-bottom: 0px");
            setFixedToBottom(false)
        }
    };

    useEffect(calculatePosition);
    useEffect(() => {
        window.addEventListener('resize', calculatePosition);
        return window.removeEventListener('resize', calculatePosition);
    }, []);

    let conditionalStyles =
        fixedToBottom ?
            {bottom: 0, position: 'absolute'} :
            {bottom: 'auto', position: 'initial'}

    return (
        <>
            <footer className="Footer" style={conditionalStyles}>
                <div className="footerColumn">
                    <div>
                        <img className="footerLogo" src={logo} alt=""/>
                    </div>
                </div>
            </footer>
            </>
    )}

