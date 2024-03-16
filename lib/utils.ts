// Rounds prices in shopping cart
export const round2 = (num: number) => 
Math.round((num + Number.EPSILON) * 100) / 100