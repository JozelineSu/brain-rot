const SearchResults = ({tags}) => {


    return (
        <div>
            {tags &&
                tags.posts.map((post) => (
                    <div key={post._id}>
                        <p>{post.postText}</p>
                    </div>
                    
                ))

            }
        </div>
    )
}

export default SearchResults;