import OpenAI from "openai";
import { OPENAI_KEY } from "../utils/constants";

const openai = new OpenAI({
  apiKey: OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
  //as we are calling open ai from client side you will get and error/waring need to set this flag to call openai from browser
  dangerouslyAllowBrowser: true,
});

export default openai;
