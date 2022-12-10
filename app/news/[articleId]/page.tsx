import React from 'react'
import { Leaf } from '../../../typings.d';

type PageProps = {
    params: {
        articleId: string;
    }
}


const fetchArticle = async (articleId: string) => {
    const body = {
        query: {
            match: {
                id: articleId
            }
        }
    };

    const response = await fetch('http://167.172.142.105:5000/api/elasticsearch/leaves_articles/_search', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
    });
    const news = await response.json();
    return news;
}

async function ArticlePage({ params: { articleId } }: PageProps) {
    const article = await fetchArticle(articleId)
    return (
        <div className="p-4 border-2 rounded-lg bg-white">
            <h2 className="text-xl font-bold">Article ID: {articleId}</h2>
            <p className="text-gray-700">
                Article Title: {article.hits.hits[0]._source.title}
            </p>
        </div>
    )

}

export default ArticlePage

export async function generateStaticParams() {
    const fetchNews = async (): Promise<Array<Leaf> | undefined> => {
        try {
            const response = await fetch('http://167.172.142.105:5000/cassandra-leaves');
            const json = await response.json();
            const news = json as Array<Leaf>;
            return news.map(article => ({
                id: article.id,
                // Add other required properties here
                title: article.title,
                // ...
            }));
        } catch (err) {
            console.error(err);
            return undefined;
        }
    };
}