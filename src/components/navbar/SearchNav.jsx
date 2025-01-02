import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext.js";

const SearchNav = () => {

    const { contactSearch } = useContext(ContactContext)

    return (
        <div className="container" style={{ width: "400px", marginRight: "200px" }}>
            <form>
                <input
                    onChange={(e) => contactSearch(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="جستجوی مخاطب..." />
            </form>
        </div>
    )
}

export default SearchNav