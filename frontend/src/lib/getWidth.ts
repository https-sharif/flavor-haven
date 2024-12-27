function getWidth(date: Date, num: number): number {
    const now = new Date();
    const validDate = new Date(date);
    const diffInMinutes = (now.getTime() - validDate.getTime()) / (1000 * 60);
    const percent = (diffInMinutes / num) * 100;
    return Math.min(percent, 100);
}

export default getWidth;
