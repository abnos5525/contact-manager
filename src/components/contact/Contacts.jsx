import {GRAY, PURPLE, RED, TEXT} from "../../colors/index.js";
import SingleContact from "./SingleContact.jsx";

import NotFound from "../../assets/not-found.gif"
import Spinner from "../Spinner.jsx";
import {Link} from "react-router-dom";
import {deleteContact} from "../../services/serverServices.js";

import {confirmAlert} from "react-confirm-alert"
import {useContext} from "react";
import {ContactContext} from "../../context/ContactContext.js";
import { toast } from "react-toastify";

const Contacts = () =>{

    const {
        contacts,
        loading,
        setLoading,
        setContacts,
        filteredContacts,
        setFilteredContacts
    } = useContext(ContactContext)

    const removeContact = async (contactId) => {
        setLoading(true)
        const allContacts = [...contacts]
        try {

            setContacts(draft => draft.filter(c => c.id !== contactId))
            setFilteredContacts(draft => draft.filter(c => c.id !== contactId))

            const {status} = await deleteContact(contactId)

            if(status !== 200){
                setContacts(allContacts)
                setFilteredContacts(allContacts)
            }

            toast.error('با موفقیت حذف شد')
            setLoading(false)
        }catch (err){
            console.log(err.message)
            setContacts(allContacts)
            setFilteredContacts(allContacts)
            setLoading(false)
        }
    }

    const confirm = (contactId) =>{
        confirmAlert({
            customUI: ({onClose}) =>{
                return(
                    <div dir="rtl" className="p-5"
                         style={{backgroundColor: PURPLE, border:"1px solid",borderRadius:"10px"}}>
                        <h3 className="h3 text-center my-3" style={{color:TEXT}}>
                            حذف مخاطب
                        </h3>
                        <button className="btn mx-4" style={{backgroundColor:RED,color:TEXT}}
                           onClick={()=>{
                            removeContact(contactId)
                            onClose()
                        }}>
                            حذف
                        </button>
                        <button style={{backgroundColor:GRAY}} onClick={onClose} className="btn mx-4">
                            انصراف
                        </button>
                    </div>
                )
            }
        })
    }

    return(
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <Link to="/contacts/add" className="btn mt-2" style={{backgroundColor:RED, color:TEXT}}>
                            ساخت مخاطب جدید
                            <i className="fa fa-plus-circle mx-2"></i>
                        </Link>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    (
                        <div className="container">
                            <div className="row">

                                {
                                    contacts.length > 0 ? filteredContacts.map(c => (
                                            <SingleContact confirm={()=>confirm(c.id)} contact={c} key={c.id}/>
                                        )) :
                                        (
                                            <div className="text-center py-4">
                                                <img src={NotFound} rel="مخاطب یافت نشد" width={400}/>
                                                <p className="h4 py-2" style={{color:TEXT}}>
                                                    مخاطب یافت نشد...
                                                </p>
                                            </div>
                                        )
                                }

                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Contacts