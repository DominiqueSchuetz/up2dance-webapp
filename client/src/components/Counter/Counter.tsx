import React, { Fragment } from "react";

const Counter: React.FC = () => {

    return (
        <Fragment>
            <article>
                <div className="circle-reveal-wrapper header light">
                    <div className="circle-background white"/>
                    <div className="header-wrapper row valign-wrapper">
                        <div className="col s12 m8 offset-m2">
                            <h1>NEXT EVENT</h1>
                            <h3>IN</h3>
                            <h2>12d : 2h : 30sec</h2>
                            <span className="tagline">Show off your business in a whole new way.</span>
                            <button className="read-more"><i className="icon-caret-down"/></button>
                        </div>
                    </div>
                </div>
            </article>
        </Fragment>
    );
};

export default Counter;
