import React from 'react'
import Link from 'next/link';
import { Leaf } from '../../typings.d';

const fetchNews = async (): Promise<Array<Leaf> | undefined> => {
    try {
        const response = await fetch('http://167.172.142.105:5000/cassandra-leaves');
        const json = await response.json();
        const news = json as Array<Leaf>;
        return news;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};



async function NewsList() {
    const news = await fetchNews()
    

    if (news) {
        return <>
            {
                news.map((leaf) => (
                    <p key={leaf.id}>
                        <Link href={{ pathname: '/news/[articleId]', query: { artilceTitle: leaf.title } }} as={`/news/${leaf.id}`}> Article: {leaf.id}</Link>
                    </p>
                ))
            }
        </>
    } else {
        return (
            <div >
               Error
            </div>
        )
    }

    

}

export default NewsList