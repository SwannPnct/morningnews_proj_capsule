export default function f(token = null, action) {
    if(action.type === "tokenSharing") {
        return action.token;
    } else {
        return token;
    }
}