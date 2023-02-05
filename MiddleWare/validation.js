const methods = ["body", "params", "headers", "query"];//set All the ways in which data arrives inside array to Validation code abbreviation

const validation = (schema) => {
  return (req, res, next) => {
    let validationArray = [];//create array for error
    methods.forEach((key) => {
      if (schema[key]) {
        const validationRes = schema[key].validate(req[key], {
          abortEarly: false,//to explore all error if there an error
        });

        if (validationRes?.error?.details) {
          validationArray.push(validationRes.error.details);//push error to array
        }
      }
    });
    if (validationArray.length > 0) {
      res
        .status(400)
        .json({ message: "validation error ", err: validationArray }); //reject request if If it does not meet the conditions
    } else {
      next();//if no any error , go to next operation
    }
  };
};
module.exports = { validation };
