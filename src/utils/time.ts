export const localISOString = (date = new Date()): string => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, -1);
};