const percentage: Record<any, any>[] = [];
for (let i = 0; i <= 100; i+ 10) {
    percentage.push({
        text: `${i}%`,
        value: i
    })
}

export default percentage;