message = module.exports;

message.successResponse = (msg,data)=>{
   
    
    return {
        status: "success" ,
        message: msg,
        // statusCode: statusCode,
        data: data || []
    };
}
message.errorResponse = (msg)=>{
   
    
    return {
        status: "error" ,
        message: msg,
        // statusCode: statusCode,
        data: []
    };
}

// module.exports={successResponse,errorResponse};
