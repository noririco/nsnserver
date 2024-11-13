import express, { Request, Response } from "express";
import { OPENAI_API_KEY } from "../config/env";

const router = express.Router();

router.post("/completions", async (req: Request, res: Response) => {
  console.log("Generating quote...");
  // CAUTION that feature costs money
  // const prompt = "Generate list of an inspirational quotes. seperated by semicolon.";
  // const body = {
  //   model: "gpt-3.5-turbo-instruct",
  //   prompt: prompt,
  //   max_tokens: 50,
  //   temperature: 0.7,
  // };
  // const quotesString = await fetch("https://api.openai.com/v1/completions", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify(body),
  // }).then((response) => response.json());
  // console.log(quotesString);
  // const quotes = quotesString.split(";");
  // res.json(quotes);
  res.json(mockQuotes);
});

export default router;

const mockQuotes = [
  `"Patience is not the ability to wait, but the ability to keep a good attitude while waiting." – Joyce Meye`,
  `"Sometimes things aren’t clear right away. That’s where you need to be patient and persevere and see where things lead." – Mary Pierc`,
  `"Our patience will achieve more than our force." – Edmund Burk`,
  `"Patience is bitter, but its fruit is sweet." – Aristotl`,
  `"The two most powerful warriors are patience and time." – Leo Tolsto`,
  `"You usually have to wait for that which is worth waiting for." – Craig Bruc`,
  `"Be patient with yourself. Self-growth is tender; it’s holy ground. There’s no greater investment." – Stephen Cove`,
  `"Patience is the calm acceptance that things can happen in a different order than the one you have in mind." – David G. Alle`,
  `"To lose patience is to lose the battle." – Mahatma Gandh`,
  `"Great things are not accomplished by idle dreams, but by years of patient study." – James H. Aughe`,
  `"The key to everything is patience. You get the chicken by hatching the egg, not by smashing it." – Arnold H. Glaso`,
  `"All things are difficult before they become easy." – Saad`,
  `"Patience and fortitude conquer all things." – Ralph Waldo Emerso`,
  `"Adopt the pace of nature: her secret is patience." – Ralph Waldo Emerso`,
  `"Have patience with all things, but, first of all with yourself." – Saint Francis de Sale`,
  `"It does not matter how slowly you go as long as you do not stop." – Confuciu`,
  `"Patience is not just about waiting for something... it’s about how you wait, or your attitude while waiting." – Joyce Meye`,
  `"Endurance is nobler than strength, and patience than beauty." – John Ruski`,
  `"Rivers know this: there is no hurry. We shall get there someday." – A.A. Miln`,
  `"The art of waiting is the art of believing." – Unknow`,
];
