export const createError = (errorCode, errorDesc, details = {}, errorLevel = 'low') => {
  try{
  const error = new Error();
  error.customErrorCode = errorCode;
  error.errorDesc = errorDesc;
  error.details = details;
  error.errorLevel = errorLevel;
  console.log("in custom error", JSON.stringify(error));
  console.log("Stack trace:", error.stack);
  
  return error;
  } catch(error){
    console.log("error in the error logger ",error);
  }
};

export const ERROR_CODES = {
  FIREBASE_AUTHENTICATION_FAILED: '1001',
  FIREBASE_READ_FAILED: '1002',
  FIREBASE_WRITE_FAILED: '1003',
  FIREBASE_AUTHOBSERVER_FAILED: '1004',
  // Add more error codes as needed
};
