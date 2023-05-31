import { useRef, useCallback, useState } from 'react'
import Post from './Components/Post'
import { useInfiniteQuery } from 'react-query'
import { getImageId, getPostsPage } from './api/axios'
import logo from './assets/logo.svg'
import { FaArrowRight, FaTimes } from 'react-icons/fa'
import useImages from './hooks/useImages'


const FrontPage = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(true)

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

    const content = data?.pages.map(pg => {
        return pg.map((post, i) => {
            if (pg.length === i + 1) {
                return <Post ref={lastPostRef} key={post.id} post={post} />
            }
            return <Post key={post.id} post={post} />
        })
    })


    return (
        <body>
            <header className='fixed-top-bar'>
                <div className='top-bar-content'>
                    <p className='top-bar-text'>Não limite sua criatividade, junte-se a familia Blocks por apenas <b>BRL 19,99</b></p>
                    <button className='premium-top-bar-button' href='./#' type="button">Quero ser Premium &nbsp;<FaArrowRight />
                    </button>
                </div>
            </header>
            <div className='logo-content'>
                <img src={logo} alt="Blocks Logo"></img>
            </div>
            <div className='logo-divider'></div>
            <div className='catalog-header'>
                <div className='catalog-content'>
                    <p className='catalog-text safe-container'>Catálogo<br />
                    <span className='catalog-box'></span>
                    </p>
                </div>
            </div>
            <div className='catalog-divider'></div>
            <p className='safe-container'>Resultados</p>
            <div className='result safe-container'>
                {content}
                {isFetchingNextPage && <p className="center">Carregando...</p>}
            </div>
            <footer className="footer">
                <a href='./'>Sobre</a>
                <a href='./'>FAQ</a>
                <a href='./'>Termos de uso</a>
                <a href='./'>Politica de privacidade</a>
            </footer>
            { isNotificationOpen ? 
            <footer className='notification-mobile'>
                    <button className='notification-button' onClick={() => setIsNotificationOpen(false)}>Fechar &nbsp;<FaTimes /></button>
                <p className='notification-text'>Não limite sua criatividade, junte-se a familia Blocks por apenas <b>BRL 19,99</b></p>
                <button className='premium-notification-button' href='./#' type="button">Quero ser Premium &nbsp;<FaArrowRight /></button>
            </footer>
            : <></>
            }
        </body>
    )
}

export default FrontPage