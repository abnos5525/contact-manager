import SearchNav from "./SearchNav.jsx";
import {PURPLE, TEXT} from "../../colors/index.js";

const Navbar = ()=>{
    return(
        <nav className="navbar shadow-lg" style={{backgroundColor: PURPLE}}>
            <div className="row w-100">
                <div className="col-4 w-25">
                    <h3 className="px-3" style={{color: TEXT}}>
                        مدیریت مخاطبین
                        <i className="fa fa-id-badge mx-2 position-relative" style={{top:5}}></i>
                    </h3>
                </div>
                <div className="col-8 w-75">
                    <SearchNav/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar