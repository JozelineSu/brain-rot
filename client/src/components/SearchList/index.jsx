import {useQuery} from '@apollo/client';
import { SEARCH_TAGS } from '../../utils/queries';
import Searchbar from '../Searchbar';

function SearchList() {
    const { loading, error, data, refetch } = useQuery(SEARCH_TAGS, {
        variables: {tagText: searchInput},
    });

    const handleSearch = (searchInput) => {
        refetch({ searchInput});
    };

    if (loading) return <p>Loading ...</p>
    if (error) return <p> Error: {error.message}</p>

    return (
        <div>
            <Searchbar onSearch={handleSearch} />
            <ul>
                {data.tag.posts.map((post) => (
                    <div key={post._id}>
                        <p>{post.postAuthor}</p>
                        <p>{post.postText}</p>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default SearchList;