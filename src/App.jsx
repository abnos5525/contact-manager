import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { ContactContext } from "./context/ContactContext.js";
import { contact_router } from "./routes/Contact_router.jsx";
import _ from "lodash";
import { getContacts, getGroups } from "./services/serverServices.js";
import { useImmer } from "use-immer";

const App = () => {
    const [loading, setLoading] = useImmer(false)
    const [contacts, setContacts] = useImmer([])
    const [groups, setGroups] = useImmer([])

    const [filteredContacts, setFilteredContacts] = useImmer([])

    const contactSearch = _.debounce((query) => {
        if (!query) return setFilteredContacts([...contacts])
        setFilteredContacts(draft => draft.filter(c => c.fullname.includes(query)))
    }, 1000)

    const fetchData = async ()=>{
        try {
            setLoading(true)
            const {data: contactsData} = await getContacts()
            const {data: groupsData} = await getGroups()
            setContacts(contactsData)
            setFilteredContacts(contactsData)
            setGroups(groupsData)

            setLoading(false)
        }catch (err){
            console.log(err.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <ContactContext.Provider value={{
            loading,
            setLoading,
            contacts,
            setContacts,
            groups,
            setGroups,
            filteredContacts,
            setFilteredContacts,
            contactSearch,
            fetchData
        }}>
            <RouterProvider router={contact_router} />
        </ContactContext.Provider>
    )
}

export default App
