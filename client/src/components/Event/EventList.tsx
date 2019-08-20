import React, { Fragment, useEffect } from "react";
import { IEvent } from "../../models";
import { IGetAllEvents } from "../../types";

interface IStateProps {
    events: IEvent[];
}

interface IDispatchProps {
    onGetAllEvents(): Promise<IGetAllEvents>;
}

const EventList: React.FC<IStateProps & IDispatchProps> = (props) => {

    const { events, onGetAllEvents } = props;

    useEffect(() => {
        onGetAllEvents();
    }, []);

    const renderAllEvents = events.map((event: IEvent) =>
        (<tr key={event._id}>
            <td>{event.eventName}</td>
            <td>{event.eventType}</td>
            <td>{event.eventDate}</td>
            <td>{event.timeStart}</td>
            <td><a style={{ color: "white" }} href="#">{event.commentEvent}</a></td>
        </tr>));

    return (
        <Fragment>
            <article>
                <div className="circle-reveal-wrapper header">
                    <div className="circle-background pink" />
                    <div className="header-wrapper row valign-wrapper">
                        <div className="col s12 m8 offset-m2">
                            <h1>ALL EVENTS</h1>
                            <Fragment>
                                <table className="striped centered responsive-table">
                                    <thead>
                                        <tr style={{ color: "white" }}>
                                            <th>KONZERT</th>
                                            <th>ANLASS</th>
                                            <th>DATUM</th>
                                            <th>BEGINN</th>
                                            <th>WEITERE INFOS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderAllEvents}
                                    </tbody>
                                </table>
                            </Fragment>

                            <div id="news-section" className="content-top-margin" />
                            <span className="tagline">Show off your business in a whole new way.</span>
                            <button className="read-more"><i className="icon-caret-down" /></button>
                        </div>
                    </div>
                </div>
            </article>
        </Fragment>
    );
};

export default EventList;

// const renderAllEvents = events.map((event: IEvent) =>
//         (<tr key={event.id}>
//             <td>{event.eventName}</td>
//             <td>{event.eventType}</td>
//             <td>{event.eventDate}</td>
//             <td>{event.timeStart}</td>
//             <td>{event.eventDate}</td>
//             <td><a style={{ color: "white" }} href="#">{event.commentEvent}</a></td>
//             <a classNameName="btn-floating waves-effect waves-light btn-medium pulse">
//                 <i classNameName="material-icons right">edit</i>
//                 edit</a>
//         </tr>));

// <React.Fragment>
        //     <table classNameName="striped centered responsive-table">
        //         <thead>
        //             <tr style={{color: "yellow"}}>
        //                 <th>KONZERT</th>
        //                 <th>ANLASS</th>
        //                 <th>DATUM</th>
        //                 <th>BEGINN</th>
        //                 <th>EINTRITT</th>
        //                 <th>WEITERE INFOS</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {renderAllEvents}
        //         </tbody>
        //     </table>
        //     <a classNameName="btn-floating btn-large amber lighten-2 pulse" style={{marginTop: "100px"}}>
        //         <i classNameName="material-icons">add_circle_outline</i>
        //     </a>
        // </React.Fragment>
