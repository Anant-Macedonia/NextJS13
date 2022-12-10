import React from 'react'
import Link from 'next/link';
import { Leaf } from '../../typings.d';
import { useRouter } from 'next/router';

const fetchNews = async (): Promise<Array<Leaf> | undefined> => {
    try {
        const response = await fetch('http://167.172.142.105:5000/cassandra-leaves', {
            cache: 'force-cache'
        });
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
                <div className="mx-auto max-w-4xl">
                    <div className="flex flex-wrap -mx-4">
                        {news.map((leaf) => (
                            <div className="px-2 py-1 rounded-lg bg-gray-200 w-1/4 my-4" key={leaf.id}>
                                <p className="text-sm font-medium leading-tight text-gray-800">
                                    <Link href={{ pathname: '/news/[articleId]', query: { artilceTitle: leaf.title } }} as={`/news/${leaf.id}`}>
                                        <span className="text-indigo-500 hover:text-indigo-700">Article:</span> {leaf.id}
                                    </Link>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
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