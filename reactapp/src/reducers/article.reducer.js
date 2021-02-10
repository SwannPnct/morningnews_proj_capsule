export default function f(myArticles =[], action) {
    if (action.type === "addArticle") {
        const check = myArticles.findIndex((e) => e.content === action.info.content);
        if (check !== -1) {
            return myArticles;
        } else {
            return [...myArticles, action.info];
        }
    } else if(action.type === "deleteArticle") {
        const copy = [...myArticles];
        copy.splice(action.index, 1);
        return copy;
    }
    else {
        return myArticles;
    }
}