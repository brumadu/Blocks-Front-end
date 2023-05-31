import React from 'react'

const Post = React.forwardRef(({ pg }, ref) => {

    const postBody = (post) => (
        <>
            <h2>{post.premium}</h2>
            <p>Nome: {post.details.name}</p>
            <p>Descrição: {post.details.description}</p>
        </>
    )

    const content = pg.map((post, i) => {
        if (pg.length === i + 1) {
            return (
                <div>
                    <article ref={ref}>{postBody(post)}</article>
                </div>
            )
        }
        return (
            <div>
                <article>{postBody(post)}</article>
            </div>
        )    }

    )
    
    return content
})

export default Post