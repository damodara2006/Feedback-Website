const AsyncHandler = (requestfunction) => async(req,res,next) =>{
    try {
        return await requestfunction(req,res)
    } catch (error) {
        next(error);
    }
}

export default AsyncHandler;