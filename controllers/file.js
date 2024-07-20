const uploadFile = async (req,res,next) => {
    try{
res.json({ ok : true});
    }catch (e){
        next(e);
    }
}

export {uploadFile};