// import { LanguageSelector } from "@/components/LanguageSelector";
// import { TranslateTextInput } from "@/components/TranslateTextInput";
// import { TranslateTextOutput } from "@/components/TranslateTextOutput";
// import { FROM_LANGUAGES, TO_LANGUAGES } from "@/const";
// import { useEffect, useState } from "react";
// import { useCompletion } from "ai/react";

// function Chatgpt() {
//   const [from, setFrom] = useState<string>(FROM_LANGUAGES[0]);
//   const [to, setTo] = useState<string>(TO_LANGUAGES[0]);

//   // 1. Create state to store user text
//   const [text, setText] = useState<string>("");
//   const {
//     // complete,
//     completion,
//     isLoading,
//     stop,
//   } = useCompletion({
//     api: "api/translate",
//   });

//   // 2. Pass text and onChange callback to TranslateTextInput
//   // 3. Add useCompletion hook to call to `/api/translate`
//   // 4. Call `complete` on changing the input
//   // 5. Call `complete` with useEffect when changing from or to
//   // 6. Add useDebounce to improve performance
//   // 7. Add useEffect to call complete when param changes

//   // const debounceText = useDebounce(text, 50);
//   // useEffect(() => {
//   //   if (debounceText !== "") {
//   //     stop();
//   //     {
//   //       from, to;
//   //     }
//   //   }
//   // }, [debounceText, from, to]);

//   const handleChange = (text: string) => {
//     setText(text);
//   };

//   return (
//     <>
//       <LanguageSelector from={from} setFrom={setFrom} to={to} setTo={setTo} />
//       <div className="flex">
//         <TranslateTextInput text={text} onChange={handleChange} />
//         <TranslateTextOutput isLoading={isLoading} result={completion} />
//       </div>
//     </>
//   );
// }
// export default Chatgpt;
