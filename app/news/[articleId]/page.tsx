import React from 'react'
type PageProps = {
    params: {
        articleId : string;
    }
}

function ArticlePage({params:{articleId}}: PageProps){
    //How to get the title
    return(
        <div >
           Article ID: {articleId}
        </div>
    )

}

export default ArticlePage