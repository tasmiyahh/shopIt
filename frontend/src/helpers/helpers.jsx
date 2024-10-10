// export const getPriceQueryParams = (searchParams , key , value)=>{
// const hasValueParams = searchParams.has(key)
// if(value && hasValueParams){ //agr search parms me value or key h tw
//     searchParams.set(key , value) //update key and value
// }else if(value){ // sirf value ho tw add kro seach param me keyor value
//     searchParams.append(key , value)
// }else if(hasValueParams){ //sirg key ho tw mtlb dlt krni h
// searchParams.delete(key)
// }

// return searchParams //ye condition dekh k search pramas k obj ko returnkren g

// }

export const getPriceQueryParams = (searchParams, key, value) => {
    const hasValueInParam = searchParams.has(key);
  
    if (value && hasValueInParam) {
      searchParams.set(key, value); //dono h tw update kro
    } else if (value) {
      searchParams.append(key, value); //sirf valueh tw ad kro
    } else if (hasValueInParam) {
      searchParams.delete(key);//sirf key h tw delete kro
    }
  
    return searchParams;
  };