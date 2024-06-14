// Custom functions module

export function mean(list) {
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, val) => acc + val, 0);
    return sum / list.length;
}
