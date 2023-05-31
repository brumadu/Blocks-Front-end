import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const Post = React.forwardRef(({ post }, ref) => {

    const postBody = (
        <div className='family-grid'>
            <div className='family-image'>Hello</div>
            <div className='family-divider'></div>
            <div className='family-footer'> 
                <p className='family-text'>
                    {post.details.name}
                </p>
                <div className='family-horizontal-divider'></div>
                <FiArrowUpRight className='family-arrow'></FiArrowUpRight>
            </div> 
        </div>
    )

    const content = ref
        ?
        <article className='family-post' ref={ref}>
            {postBody}
        </article>

        :
        <article className='family-post'>
            {postBody}
        </article>


    return content
})

export default Post