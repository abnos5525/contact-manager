/* eslint-disable react/prop-types */
import { BLUE, ORANGE, RED, TEXT, YELLOW } from "../../colors/index.js";
import { Link } from "react-router-dom";

const SingleContact = ({ contact, confirm }) => {

    return (
        <div className="col-md-6">
            <div className="card my-3" style={{ backgroundColor: BLUE }}>
                <div className="card-body">
                    <div className="row d-flex align-items-center justify-content-around">
                        <div className="col-md-4 col-sm-4">
                            <img style={{ border: `1px solid ${ORANGE}` }}
                                src={contact.photo} alt="مخاطب" className="img-fluid rounded" />
                        </div>
                        <div className="col-md-7 col-sm-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی: {" "}
                                    <span className="fw-bold">
                                        {contact.fullname}
                                    </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل: {" "}
                                    <span className="fw-bold">
                                        {contact.phone}
                                    </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    ایمیل: {" "}
                                    <span className="fw-bold">
                                        {contact.email}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                            <Link to={`/contacts/${contact.id}`} className="btn my-1" style={{ backgroundColor: ORANGE, color: TEXT }}>
                                <i className="fa fa-eye"></i>
                            </Link>
                            <Link to={`/contacts/edit/${contact.id}`} className="btn my-1" style={{ backgroundColor: YELLOW, color: TEXT }}>
                                <i className="fa fa-pencil"></i>
                            </Link>
                            <div onClick={confirm} className="btn my-1" style={{ backgroundColor: RED, color: TEXT }}>
                                <i className="fa fa-trash"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SingleContact