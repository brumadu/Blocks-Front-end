import React from 'react'

const Post = React.forwardRef(({ post }, ref) => {

    const postBody = (
        <>
            <h2>{post.premium}</h2>
            <p>Nome: {post.details.name}</p>
            <p>Descrição: {post.details.description}</p>
        </>
    )

    const content = ref
        ? <article ref={ref}>{postBody}</article>
        : <article>{postBody}</article>

    return content
})

export default Post