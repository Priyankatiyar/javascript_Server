export function formequilateral(n: number): void {
    let pat = '';
    let space = n - 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < space; j++) {
            pat += ' ';
        }
        for (let j = 0; j <= i; j++) {
            pat += '* ';
        }
        pat += '\n';
        space--;
    }
        console.log(pat);
}
