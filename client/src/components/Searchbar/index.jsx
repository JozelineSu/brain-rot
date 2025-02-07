import { useQuery } from "@apollo/client";
import {QUERY_TAGS} from "../../utils/queries";


function Searchbar() {
    const {data} = useQuery(QUERY_TAGS);
    const tags = data?.tags || [];
    
    return (
        <div className='searchbar'>
            <form>
                <input
                    type="search"
                    placeholder="Search..."
                ></input>
                <button>V</button>
            </form>
        </div>
    )
}

export default Searchbar;