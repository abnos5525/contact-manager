import * as Yup from "yup"

export const contactChema = Yup.object().shape({
    fullname: Yup.string().required("نام الزامی است"),
    photo: Yup.string().url("آدرس معتبر نیست").required("تصویر الزامی است"),
    phone: Yup.string('شماره باید عدد باشد').required('شماره موبایل الزامی است'),
    email: Yup.string().email('آدرس ایمیل معتبر نیست').required('آدرس ایمیل الزامی است'),
    job: Yup.string().nullable(),
    group: Yup.string().required('گروه الزامی است')
})