export default function f(myArticles =[], action) {
    if (action.type === "addArticle") {
        return [...myArticles, action.info];
    } else if(action.type === "deleteArticle") {
        const copy = [...myArticles];
        copy.splice(action.index, 1);
        return copy;
    }
    else {
        return myArticles;
    }
}