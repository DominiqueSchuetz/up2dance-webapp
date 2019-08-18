import React, { Fragment } from "react";

const Header: React.FC = () => {

    return (
        <Fragment>
            <header>
                <nav className="navbar dark">
                    <div className="nav-wrapper">
                        <a href="horizontal-half.html" className="brand-logo"><i className="icon-diamond" /></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li className="active"><a className="dropdown-trigger" href="#!" data-target="pages">Pages
                        <i className="material-icons right">arrow_drop_down</i></a></li>
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="team.html">Team</a></li>
                            <li><a href="docs/about.html">Docs</a></li>
                            <li><a href="#">Buy Now!</a></li>
                        </ul>

                        <ul id="pages" className="dropdown-content">
                            <li><a href="horizontal-half.html">Horizontal Halves</a></li>
                            <li><a href="sierra.html">Zoom Out</a></li>
                            <li><a className="active" href="circle-reveal.html">Circle Reveal</a></li>
                            <li><a href="phone-wall.html">Phone Wall</a></li>
                            <li><a href="element-transitions.html">Element Transitions</a></li>
                            <li><a href="basic-elements.html">Basic Elements</a></li>
                            <li><a href="card-shuffle.html">Shuffle</a></li>
                            <li><a href="postcards.html">Postcards</a></li>
                        </ul>

                        <a href="#" data-target="slide-out" className="sidenav-trigger button-collapse right">
                            <i className="material-icons black-text">menu</i></a>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li className="no-padding">
                        <ul className="collapsible collapsible-accordion">
                            <li className="bold">
                                <a className="collapsible-header waves-effect waves-teal active">Pages</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="horizontal-half.html">Horizontal Halves</a></li>
                                        <li><a href="sierra.html">Zoom Out</a></li>
                                        <li><a className="active" href="circle-reveal.html">Circle Reveal</a></li>
                                        <li><a href="phone-wall.html">Phone Wall</a></li>
                                        <li><a href="element-transitions.html">Element Transitions</a></li>
                                        <li><a href="basic-elements.html">Basic Elements</a></li>
                                        <li><a href="card-shuffle.html">Shuffle</a></li>
                                        <li><a href="postcards.html">Postcards</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li><a className="waves-effect waves-teal" href="blog.html">Blog</a></li>
                    <li><a className="waves-effect waves-teal" href="team.html">Team</a></li>
                    <li><a className="waves-effect waves-teal" href="docs/about.html">Docs</a></li>
                    <li><a className="waves-effect waves-teal" href="#">Buy Now!</a></li>
                </ul>
            </header>
        </Fragment>
    );
};

export default Header;
