function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function factorial(n) {
    if (n < 0) return undefined; // Factorial for negative numbers is not defined
    return n === 0 ? 1 : n * factorial(n - 1);
}
function commonElements(arr1, arr2) {
    return arr1.filter(value => arr2.includes(value));
}
function lastElement(arr) {
    return arr[arr.length - 1];
}
function arrayIntersection(arr1, arr2) {
    return arr1.filter(value => arr2.includes(value));
}
function isPerfectSquare(num) {
    return Number.isInteger(Math.sqrt(num));
}
