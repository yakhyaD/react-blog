import { Link } from "react-router-dom";
import notfound from './404.png'

const NotFound = () => {
    return (
        <div className="NotFound">
            <img src={notfound} alt="notFound" />
            <Link to="/">Go back to the home page</Link>
        </div>
    )
}
export default NotFound