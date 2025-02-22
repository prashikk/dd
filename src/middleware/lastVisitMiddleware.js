const setVisit=(req,res,next)=>{
   if(req.cookies.lastVisit){
 res.locals.lastVisit=new Date(req.cookies.lastVisit).toLocaleString();
}else {
    res.locals.lastVisit = "First Visit";
}
res.cookie("lastVisit",new Date().toISOString(),{maxAge:24*60*60*1000});
next();

}
export default setVisit;
