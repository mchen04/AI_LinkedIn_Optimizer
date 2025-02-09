export function sanitizeText(text: string): string {
    // Remove any potentially dangerous characters or patterns
    return text
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[^\w\s.,!?-]/g, '') // Only allow basic punctuation and alphanumeric
        .trim();
}
