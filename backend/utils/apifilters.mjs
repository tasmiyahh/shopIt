
class APIFilters {
    constructor(query , queryStr){
     // query: The Mongoose query object that you will modify.
     //queryStr: The query parameters from the request, like search keywords, filters, and pagination info.
    //query: This is the initial Mongoose query object, starting with Product.find(). It's the base query that 
    //will be modified with search, filter, and pagination criteria.
        this.query = query ,
        this.queryStr = queryStr

    }
    search(){
  const keyword = this.queryStr.keyword ? { //agr keywod h tw
    name : {
        $regex : this.queryStr.keyword ,// keyword ko name me talash kro na k keywrd jesa name dhondo ,
        $options : 'i' // name me dhondo k sath sath acapital small nh dekho just jo h wo name me dhondo cse match nh kro
    },
  } : {}

  this.query = this.query.find(keyword);
  return this // query obj


  
  

}
 filters(){ //search with category price etc mtlb or kch search krna ho tw //filter method basically make new obj according to criteria

  let queryCopy = {...this.queryStr} //hmy is me modification krni but originl same rhy islie we use copy

//   //we need t rmove keyword form querystrg obj because we already handled in searh func
//let queryCopy = { ...this.queryStr };
//This line creates a shallow copy of the queryStr object (which contains all query parameters from the request).
// This copy is used to make modifications without altering the original query string.


  const fieldsTORemove= ["keyword" , "page"] //jo remove krna h coz we handle it separately


  fieldsTORemove.forEach((el) =>delete queryCopy[el]) //it take each element el of fieldstoremove as arrgument
   console.log(queryCopy)


      // If the category filter exists, add it to the query
    //   if (queryCopy.category) {
    //     this.query = this.query.find({ category: queryCopy.category });
    // }



  
  if (queryCopy.min || queryCopy.max) {
    //if (queryCopy.min || queryCopy.max) {
      ////This condition checks whether min or max values are present in the query parameters. 
      //If either exists, the method proceeds to construct the price filter.

      //Here, we initialize an empty price object within queryCopy. This object will hold the price filter criteria.
      queryCopy.price = {};


      if (queryCopy.min) {
//If a min value exists, it's converted to a number (using Number()) and added to the price 
//object as the $gte (greater than or equal to) filter.

          queryCopy.price.$gte = Number(queryCopy.min);

          //Once the min value is used to set the filter, it's removed from queryCopy to avoid confusion.
          delete queryCopy.min;
      }

      //Similarly, if a max value exists, it's converted to a number and added to 
      //the price object as the $lte (less than or equal to) filter.
      //The max field is removed from queryCopy after being used to set the filter.
      if (queryCopy.max) {
          queryCopy.price.$lte = Number(queryCopy.max);
          delete queryCopy.max;
      }


  }

  //The modified queryCopy, now containing the price filter, is used to update the MongoDB query. 
  //This line essentially tells MongoDB to find products that match the criteria in queryCopy.

  this.query = this.query.find(queryCopy);
  return this



 }

 //pagination it means divide data into pgs

 pagination(resPerPage){
  const currentPage = Number(this.queryStr.page || 1)
  //hoe many result skip if i want to go to next pg
  const skip = resPerPage* (currentPage -1)
  this.query = this.query.limit(resPerPage).skip(skip) //limit is mongo function which means ek pg pe ktne ho
  return this
 }



}
export default APIFilters;
