export default (controllerFunction)=>(req,res,next)=>Promise.resolve(controllerFunction(req,res,next)).catch(next)

//defaut functioncontroller function ko argument k tor pe le k returm krrha h res req next or controller 
//func return krha h promise jo is function ko call  lega res req dekhy ga gr error hua tw next middleware ko pas 