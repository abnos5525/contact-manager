import Spinner from "../Spinner.jsx";
import { GRAY, PURPLE, TEXT } from "../../colors/index.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getContact, updateContact } from "../../services/serverServices.js";
import { useContext, useEffect } from "react";
import { ContactContext } from "../../context/ContactContext.js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactChema } from "../../validations/contactSchema.js";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";

const EditContact = () => {

    const { loading, setLoading, fetchData,
        groups, setContacts, setFilteredContacts } = useContext(ContactContext)

    const { contactId } = useParams()

    const [contact, setContact] = useImmer({})

    const navigate = useNavigate()

    const updateContactForm = async (values) => {
        try {
            const { data, status } = await updateContact(contactId, values)

            if (status === 200) {
                setContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId))
                    draft[contactIndex] = { ...data }
                })
                setFilteredContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId))
                    draft[contactIndex] = { ...data }
                })

                toast.info('با موفقیت انجام شد', { icon: '😁' })

                fetchData()
                navigate("/contacts")
            }

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data: contactData } = await getContact(contactId)
                setContact(contactData)
                setLoading(false)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchData()
    }, [contactId]);

    return (
        <>
            {
                loading ? <Spinner /> :
                    (
                        <>
                            {Object.keys(contact).length > 0 ? (
                                <section className="p-3 m-auto">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <h3 className="h3 fw-bold text-center">
                                                    ویرایش مخاطب جدید
                                                </h3>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row mt-5">
                                            <div className="col-md-4 m-auto">
                                                <Formik
                                                    initialValues={{
                                                        fullname: contact.fullname,
                                                        photo: contact.photo,
                                                        phone: contact.phone,
                                                        email: contact.email,
                                                        job: contact.job,
                                                        group: contact.group
                                                    }}
                                                    validationSchema={contactChema}
                                                    onSubmit={(values) => {
                                                        updateContactForm(values)
                                                    }}
                                                >
                                                    <Form>
                                                        <div className="mb-2">
                                                            <Field
                                                                name="fullname"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="نام و نام خانوادگی"
                                                            />
                                                            <ErrorMessage name="fullname"
                                                                render={msg => <div className="my-2">{msg}</div>}
                                                            />
                                                        </div>
                                                        <div className="mb-2">
                                                            <Field
                                                                name="photo"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="آدرس عکس"
                                                            />
                                                            <ErrorMessage name="photo"
                                                                render={msg => <div className="my-2">{msg}</div>}
                                                            />
                                                        </div>

                                                        <div className="mb-2">
                                                            <Field
                                                                name="phone"
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="شماره موبایل"
                                                            />
                                                            <ErrorMessage name="phone"
                                                                render={msg => <div className="my-2">{msg}</div>}
                                                            />
                                                        </div>

                                                        <div className="mb-2">
                                                            <Field
                                                                name="email"
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="ایمیل"
                                                            />
                                                            <ErrorMessage name="email"
                                                                render={msg => <div className="my-2">{msg}</div>}
                                                            />
                                                        </div>

                                                        <div className="mb-2">
                                                            <Field
                                                                name="job"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="شغل"
                                                            />
                                                        </div>

                                                        <div className="mb-2">
                                                            <Field as="select" name="group" className="form-control">
                                                                <option value="">انتخاب گروه</option>
                                                                {
                                                                    groups.length > 0 &&
                                                                    groups.map((group) => (
                                                                        <option key={group.id} value={group.id}>
                                                                            {group.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Field>
                                                            <ErrorMessage name="group"
                                                                render={msg => <div className="my-2">{msg}</div>}
                                                            />
                                                        </div>

                                                        <div className="mx-2 float-end">
                                                            <input style={{ backgroundColor: PURPLE, color: TEXT }}
                                                                type="submit" className="btn" value="ویرایش مخاطب" />
                                                        </div>
                                                        <Link style={{ backgroundColor: GRAY, color: TEXT }} to="/contacts" className="btn mx-2">
                                                            انصراف
                                                        </Link>
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </section>
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

export default EditContact