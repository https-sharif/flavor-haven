function timeAgo(date: Date, minutes: number): number {
    const now = new Date();
    const targetDate = date instanceof Date ? date : new Date(date);
    const targetTime = new Date(targetDate.getTime() + minutes * 60000);
    const diff = targetTime.getTime() - now.getTime();
    const diffMinutes = Math.floor(diff / 60000);

    if (diffMinutes <= 0) {
        return 0;
    } else {
        return diffMinutes;
    }
}

export default timeAgo;