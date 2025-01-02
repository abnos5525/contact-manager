import {Link, NavLink, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getContact, getGroup} from "../../services/serverServices.js";
import Spinner from "../Spinner.jsx";
import {BLUE, RED, TEXT} from "../../colors/index.js";
import {ContactContext} from "../../context/ContactContext.js";

const ViewContact = ()=>{

    const {loading, setLoading} = useContext(ContactContext)

    const {contactId} = useParams()

    const [contact, setContact] = useState({})
    const [group, setGroup] = useState({})

    useEffect(() => {
        const fetchData = async ()=>{
            setLoading(true)
            const {data: contactData} = await getContact(contactId)
            const {data: groupData} = await getGroup(contactData.group)
            setContact(contactData)
            setGroup(groupData)
            setLoading(false)
        }
        fetchData()
    }, [contactId]);

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col text-center mt-3">
                        <NavLink to={`/contacts`} className="h4 fw-bold mx-auto text-decoration-none">
                            اطلاعات مخاطب
                        </NavLink>
                    </div>
                </div>
            </div>
            <hr/>
            {
                loading ? <Spinner/> :
                    (
                        <>
                            {
                                Object.keys(contact).length > 0 ? (
                                    <div className="container-fluid d-flex justify-content-center mt-5">
                                        <div className="col-md-6">
                                            <div className="card my-2" style={{backgroundColor:BLUE}}>
                                                <div className="row align-items-center d-flex justify-content-around">
                                                    <div className="col-md-4 col-sm-4">
                                                        <img src={contact.photo} alt="عکس مخاطب"
                                                        style={{border:"1px solid"}}
                                                             className="img-fluid rounded"
                                                        />
                                                    </div>
                                                    <div className="col-md-7 col-sm-7">
                                                        <ul className="list-group">
                                                            <li className="list-group-item-dark list-group-item">
                                                                نام و نام خانوادگی: {" "}
                                                                <span className="fw-bold">
                                                                    {contact.fullname}
                                                                </span>
                                                            </li>
                                                            <li className="list-group-item-dark list-group-item">
                                                                موبایل: {" "}
                                                                <span className="fw-bold">
                                                                    {contact.phone}
                                                                </span>
                                                            </li>
                                                            <li className="list-group-item-dark list-group-item">
                                                                ایمیل: {" "}
                                                                <span className="fw-bold">
                                                                    {contact.email}
                                                                </span>
                                                            </li>
                                                            <li className="list-group-item-dark list-group-item">
                                                                شغل: {" "}
                                                                <span className="fw-bold">
                                                                    {contact.job}
                                                                </span>
                                                            </li>
                                                            <li className="list-group-item-dark list-group-item">
                                                                گروه: {" "}
                                                                <span className="fw-bold">
                                                                    {group.name}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-1 col-sm-1 d-flex justify-content-center w-100">
                                                <Link to="/contacts" className="btn my-1 w-100"
                                                      style={{backgroundColor:RED,color:TEXT}}>
                                                    بازگشت
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                <div className="text-center my-3">
                                    کاربر موردنظر یافت نشد!
                                </div>
                            }
                        </>
                    )
            }
        </>
    )
}

export default ViewContact