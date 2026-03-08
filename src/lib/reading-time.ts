export default function readingTime(text: string) {
    const wpm = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return {
        text: `${time} min read`,
        minutes: time,
        time: time * 60000,
        words,
    };
}
