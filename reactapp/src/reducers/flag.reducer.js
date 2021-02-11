export default function f(flagSelected = "fr", action) {
    if (action.type === "flagSelection") {
        return action.flag;
    } else {
        return flagSelected;
    }
}