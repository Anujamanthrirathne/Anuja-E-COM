const displayLKRcurrency = (num) =>{
 const formatter = new Intl.NumberFormat('en-IN',{
    style : "currency",
    currency : 'LKR',
    minimumFractionDigits: 2
 })

 return formatter.format(num)
}

export default displayLKRcurrency