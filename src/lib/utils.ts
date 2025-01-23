export const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('copied to clipboard!');
};