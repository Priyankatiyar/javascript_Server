export function diamond(n)
{
    let patt = "";
    let space = n - 1;
    for (let i = 0; i < n; i++)
    {
        for (let j = 0; j < space; j++)
        {
            patt +=' ';
        }
        for (let j = 0; j <= i; j++)
        {
            patt+= '* ';
        }
        patt += '\n';
        space--;
    } 
    space = 0;
    for(let i=n; i>0; i--)
    {
        for(let j=0; j<space; j++)
        {
            patt +=' ';
        }
        for(let j=0; j<i; j++)
        {
            patt +='* ';
        }
        patt += '\n';
        space++;
    }
    console.log(patt);
}
//Diamond(5);
