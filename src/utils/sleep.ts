export function Sleep(seconds: number) {
    const i = seconds * 1000;
    return new Promise(resolve => setTimeout(resolve, i));
}