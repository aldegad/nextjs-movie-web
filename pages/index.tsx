import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home({ results }) {

    const [list, setList] = useState();

    /* useEffect(() => {
        (async() => {
            const { results:res } = await fetch(`http://localhost:3000/api/movies`).then(response => response.json());
            setResults(res);
        })()
    }, []) */

    const router = useRouter();
    const onClick = (id, title) => {
        router.push(`/movies/${title}/${id}`);
    }

    const reGet = async() => {
        const { results:res } = await fetch(`http://localhost:3000/api/movies`).then(response => response.json());
        setList(res.reverse());
    }

    return (
        <div className="container">
            <Seo title="Home"></Seo>
            <button onClick={() => reGet()}>re get</button>
            {(list || results)?.map(movie => (
                <div
                    onClick={() => onClick(movie.id, movie.original_title)}
                    className="movie"
                    key={movie.id}
                >
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <h4>
                    <Link 
                        href={`/movies/${movie.original_title}/${movie.id}`}
                    >
                        <a>{movie.original_title}</a>
                    </Link>
                    </h4>
                </div>
            ))}
            <style jsx>{`
                .container {
                    display: grid;
                    padding: 20px;
                    gap: 20px;
                }
                @media screen and (max-width:768px) {
                    .container {
                        grid-template-columns: 1fr 1fr;
                    }
                }
                @media screen and (max-width: 960px) {
                    .container {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                @media screen and (max-width: 1280px) {
                    .container {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                @media screen and (min-width: 1281px) {
                    .container {
                        grid-template-columns: repeat(5, 1fr);
                    }
                }
                .movie {
                    cursor: pointer;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>
    )
}

export async function getServerSideProps() {
    const { results } = await fetch(`http://localhost:3000/api/movies`).then(response => response.json());
    return {
        props: {
            results
        }
    }
}