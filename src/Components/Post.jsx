import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import useImages from '../hooks/useImages'
import image from '../assets/4.png'

const Post = React.forwardRef(({ post }, ref) => {

    const {
        isLoading,
        isError,
        error,
        results,
    } = useImages(post.id)


    // const images = results?.map(img => {
    //     console.log(img)
    //     return <picture className='family-image' src={""}></picture>
    // })


    const postBody = (
        <div className='family-grid'>
            <div className='family-image'>
                <img src={image}></img>
            </div>
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