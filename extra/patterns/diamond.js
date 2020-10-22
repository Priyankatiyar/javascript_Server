function Diamond(n) {
    pattern = "";
    let space = n - 1;
    for (let i = 0; i < n; i++)
    {
        for (let j = 0; j < space; j++)
        {
            pattern +=' ';
        }
        for (let j = 0; j <= i; j++)
        {
            pattern += '* ';
        }
        pattern += '\n';
        space--;
    } 
    space = 0;
    for(let i=n; i>0; i--)
    {
        for(let j=0; j<space; j++)
        {
            pattern +=' ';
        }
        for(let j=0; j<i; j++)
        {
            pattern +='* ';
        }
        pattern += '\n';
        space++;
    }
    console.log(pattern);
}
Diamond(5);
