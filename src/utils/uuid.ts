export function generateRandomUUID(): string {
    return window.crypto.randomUUID().split("-").join("");
}