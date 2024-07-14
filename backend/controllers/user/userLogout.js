async function userLogout(req,res){
    try{

        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            semSite : 'None'
        };


        res.clearCookie("token",tokenOption)

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports = userLogout