import { customAlphabet } from "nanoid";

const nanoIdGenerator = () => {
  const nanoid = customAlphabet("1234567890", 10);
  return nanoid(); //=> "4901342456"
  console.log(nanoid());
};

export default nanoIdGenerator;
