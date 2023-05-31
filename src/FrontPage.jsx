import { useRef, useCallback } from 'react'
import Post from './Post'
import { useInfiniteQuery } from 'react-query'
import { getPostsPage } from './api/axios'
import logo from './logo.svg'

const FrontPage = () => {

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        status,
        error
    } = useInfiniteQuery('/posts', ({ pageParam = 1 }) => getPostsPage(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 10 : undefined
        }
    })

    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                fetchNextPage()
            }
        })

        if (post) intObserver.current.observe(post)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    if (status === 'error') return <p className='center'>Erro: {error.message}</p>

    const content = data?.pages.map((pg, i) => {
            if (pg.length === i + 1) {
                return <Post ref={lastPostRef} key={pg.post.id} post={pg} />
            }
            return <Post key={pg.post.id} post={pg} />
    })

    return (
        <>
            <header className='fixed-top-bar'>
                <div className='top-bar-content'>
                            <p className='top-bar-text'>Não limite sua criatividade, junte-se a familia Blocks por apenas <b>BRL 19,99</b></p>
                            <button className='premium-top-bar-button' type="button">Quero ser Premium</button>
                </div>
            </header>
            <header className='logo-header'>
                <div className='logo-content'>
                                <img src={logo} alt="Blocks Logo"></img>
                </div>
            <div className='logo-divider'></div>
            </header>
            <header className='catalog-header'>
                <div className='catalog-content'>
                            <p className='catalog-text'>Catálogo<br/>
                            <span className='catalog-box'></span>
                            </p>
                </div>
            <div className='catalog-divider'></div>
            </header>
            <div>
            <p>Resultados</p>
            {content}
            {isFetchingNextPage && <p className="center">Loading More Posts...</p>}
            <p className="center"><a href="#top">Back to Top</a></p>
            </div>
        </>
    )
}

export default FrontPage