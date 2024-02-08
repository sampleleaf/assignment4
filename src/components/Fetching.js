import { useState, useEffect, useRef } from "react";

const Fetching = () => {
    const [datas, setDatas] = useState([])
    const [page, setPage] = useState(1)
    const isFirstFetch = useRef(true)

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.github.com/orgs/facebook/repos?per_page=5&page=${page}`)
                const data = await response.json()
                setDatas(prevDatas => {
                    if(isFirstFetch.current === true){
                        return data
                    }else{
                        return [...prevDatas, ...data]
                    }
                }) 
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [page])

    const loadMore = () => {
        isFirstFetch.current = false
        setPage(page => page + 1) 
    }

    return(
        <>      
            <div className="githubList">
                {datas.map( data => (
                    <div key={data.id} className="githubItem">
                        <div><a href={data.html_url}>{data.name}</a><span>{data.visibility}</span></div>
                        <div className="extension">{data.description}</div>
                        <div className="extension topicBox">{data.topics.map(topic => <a key={topic} href={`https://github.com/topics/${topic}`} className="topic">{topic}</a>)}</div>
                    </div>
                ))}
            </div>
            <div className="loadMore">
                <button onClick={loadMore}>More</button>
            </div>
        </>
    )
}

export default Fetching