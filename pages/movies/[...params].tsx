import { useRouter } from 'next/router';

export default function Movie({params}) {
    const router = useRouter();
    const [title, id]:any = params || [];
    console.log(router);
    return (
        <div>
            <h4>{title}</h4>
        </div>
    )
}

export async function getServerSideProps({ params: { params } }) {
    return {
        props: {
            params
        }
    }
}