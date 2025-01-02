import Spinner from "../Spinner.jsx";
import { Link, useNavigate } from "react-router-dom";
import { GRAY, PURPLE, TEXT } from "../../colors/index.js";
import { createContact } from "../../services/serverServices.js";
import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext.js";
import { contactChema } from '../../validations/contactSchema.js'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

const AddContact = () => {

    const {
        loading,
        groups,
        setContacts,
        setFilteredContacts,
    } = useContext(ContactContext)

    const navigate = useNavigate()

    const createContactForm = async (values) => {
        try {
            const { status, data } = await createContact(values)

            if (status === 201) {
                setContacts(draft => {
                    draft.push(data)
                })
                setFilteredContacts(draft => {
                    draft.push(data)
                })

                toast.success('با موفقیت انجام شد', {icon: '😁'})

                navigate("/contacts")
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {
                loading ? <Spinner /> :
                    (
                        <section className="p-3 m-auto">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="h3 fw-bold text-center">
                                            ساخت مخاطب جدید
                                        </h3>
                                    </div>
                                </div>
                                <hr />
                                <div className="row mt-5">
                                    <div className="col-md-4 m-auto">
                                        <Formik
                                            initialValues={{
                                                fullname: '',
                                                photo: '',
                                                phone: '',
                                                email: '',
                                                job: '',
                                                group: ''
                                            }}
                                            validationSchema={contactChema}
                                            onSubmit={(values) => {
                                                createContactForm(values)
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
                                                        type="submit" className="btn" value="ساخت مخاطب" />
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
            }
        </>
    )
}

export default AddContact