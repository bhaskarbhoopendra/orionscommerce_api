// import { plainToInstance } from "class-transformer";
// import { validate, ValidationError } from "class-validator";
// import { RequestHandler } from "express";
// import HttpException from "../excpetions/HttpException";

// function validationMiddleware<T>(
//   type: any,
//   skipMissingProperties = false
// ): RequestHandler {
//   return (req, res, next) => {
//     const dtoObj = plainToInstance(type, req.body);
//     validate(dtoObj, { skipMissingProperties }).then(
//       (errors: ValidationError[]) => {
//         if (errors.length > 0) {
//           const message = errors
//             .map((error: ValidationError) =>
//               (Object as any).values(error.constraints)
//             )
//             .join(", ");
//           next(new HttpException(400, message));
//         } else {
//           req.body(dtoObj);
//           next();
//         }
//       }
//     );
//   };
// }

// export default validationMiddleware;
