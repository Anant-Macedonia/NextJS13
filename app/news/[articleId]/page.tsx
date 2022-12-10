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
        cache:'force-cache',
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

export default ArticlePage;
