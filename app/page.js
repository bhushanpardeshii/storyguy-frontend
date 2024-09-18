"use client"
import React, { useRef } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Dancing_Script } from "next/font/google";
const dancingScript = Dancing_Script({ subsets: ["latin"] })

import { PlaceholdersAndVanishInput } from "@/components/placeholders-and-vanish-input";

const placeholders = [
  "What's the first rule of Fight Club?",
  "Who is Tyler Durden?",
  "Where is Andrew Laeddis Hiding?",
  "Write a Javascript method to reverse a string",
  "How to assemble your own PC?",
];

export default function Home() {

  const [responseText, setResponseText] = useState("");
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [role, setRole] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showcharacterbtn, setShowcharacterbtn] = useState(false)
  const nextpage = useRef(null)


  const GenerateStory = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/generate-story");
      const result = await response.json();
      setInput(result.response);
      console.log(result.response)
      if (nextpage.current) {
        nextpage.current.scrollIntoView({ behavior: 'smooth' });
      }
      setLoading(false)
    } catch (error) {
      setInput("Some Error occured")
      console.log(error)
    }
  }
  async function sendPrompt() {
    const prompt = input;
    try {
      const response = await fetch("http://localhost:8000/api/send-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const result = await response.json();
      let apiresponse = result.response;
      const charactersArray = apiresponse?.split(",")
      console.log(charactersArray)
      setCharacters(charactersArray)
      setResponseText(result.response);
    }
    catch (error) {
      console.error("Error:", error);
      setResponseText("Something went wrong!");
    }
  }
  const selectCharacter = async () => {

    if (!selectedCharacter) return;
    const prompt = input;
    try {
      const response = await fetch("https://storyguy-backend-production.up.railway.app/api/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          character: selectedCharacter
        }),
      })
      const result = await response.json();
      setRole(result.response)
    } catch (error) {
      console.log(error)
    }
  }
  const askQuestion = async () => {
    if (!selectedCharacter || !question) return;
    const prompt = input;

    try {
      const response = await fetch("https://storyguy-backend-production.up.railway.app/api/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          character: selectedCharacter,
          question: question,
        }),
      });
      const result = await response.json();
      setAnswer(result.answer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <TracingBeam >

        <div className="h-svh w-full bg-city bg-cover  flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h2 className={`${dancingScript.className} font-Dancing_Scriptflex  items-center justify-center text-xl md:text-3xl mb-4 font-extrabold  text-center text-[#F7E7CE] lg:text-[#004953] `}>
            Ask Questions To Your Own Story
          </h2>

          <h1 className={`${dancingScript.className} font-Dancing_Script flex items-center justify-center text-5xl md:text-7xl mt-3  lg:text-9xl font-bold text-center text-[#D2B48C] lg:text-[#16523c] z-20`}>
            StoryGuy
          </h1>

          <div className="flex items-center justify-center">
            {loading ? (
              <button className=" flex items-center justify-center text-sm shadow-[0_0_0_3px_#000000_inset] mt-16 px-6 py-2 bg-transparent border border-green-800 text-gray-900 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" >
                <div className="loader ease-linear rounded-full border-2 border-t-1 border-gray-900 h-3 w-3 mr-2"></div>
              </button>
            ) : (
              <button onClick={GenerateStory} className=" flex items-center justify-center text-sm shadow-[0_0_0_3px_#000000_inset] mt-16 px-6 py-2 bg-transparent border border-green-800 text-gray-900 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Generate Story
              </button>
            )
            }


          </div>

        </div>

        <div ref={nextpage} className="bg-torch-man bg-cover items-center justify-items-center min-h-screen   gap-16 p-20 pt-6 ">
          <div className="text-[#FFA500] p-5 font-Dancing_Script text-xl flex justify-center font-extrabold ">Your Story, Your Questions: Talk to the Characters Now!</div>
          <div className=" w-full h-auto lg:w-3/6 ">

            <div className=" flex rounded-xl border border-indigo-900 w-auto h-auto bg-page lg:bg-notebook bg-cover pt-28 py-16 px-10 pl-16 md:py-24 md:px-28 md:pl-32 z-50">

              <Textarea className="text-red-900" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="flex items-center justify-center">

              <Button onClick={sendPrompt} className="text-md mt-6 bg-transparent border-2 border-[#CD7F32] text-[#D2B48C] rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Generate Characters</Button>
            </div>
          </div>
          <div className="text-[#D2B48C] mt-4 flex justify-start" >
            <p> <b>Scroll Down</b> to select character after Generating Characters</p>
          </div>

        </div>
        <div className="min-h-screen  bg-characters p-3 bg-cover">
          <div className={` ${dancingScript.className} font-Dancing_Script font-bold flex justify-center p-3 text-red-800 text-5xl`}>
            Select Character
          </div>
          <div className="md:flex  justify-around">

            <div className="flex-col justify-center items-center pt-10">
              <div className="flex justify-center text-md md:text-xl px-2 mb-4 font-Dancing_Script text-[#250E0E] backdrop-blur-sm bg-white/30 rounded-full">
                <b>Select A Character you want to ask questions</b></div>
              <div className="flex justify-center items-center mb-32 gap-5">
                {characters.map((character, index) => (

                  <button key={index} onClick={() => {
                    setSelectedCharacter(character)
                    setShowcharacterbtn(true)
                  }} className=" px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
                    {character}
                  </button>

                ))

                }
              </div>

              <div>
                {showcharacterbtn &&

                  <div className="flex flex-col justify-center mb-4  items-center px-4">
                    <h2 className={`${dancingScript.className} font-Dancing_Script font-extrabold mb-4 text-xl  backdrop-blur-lg rounded-full border px-6 lg:text-2xl text-center  text-[#FFFDD0]`}>
                      Ask Your Selected Characters
                    </h2>
                    <PlaceholdersAndVanishInput
                      placeholders={placeholders}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}

                      onSubmit={askQuestion}
                      disabled={!selectedCharacter || !question}
                    />
                  </div>
                }
              </div>

            </div>
            <div className={` ${dancingScript.className}  font-Dancing_Script text-red-950 text-xl font-semibold bg-page overflow-hidden h-[85vh] md:w-4/12 p-11 pt-32 rounded-xl bg-cover z-50 `}>
              {answer && <p>{selectedCharacter}: {answer}</p>}
            </div>
          </div>

          {/* 

          <Button onClick={selectCharacter} disabled={!selectedCharacter}>
            Confirm Selection
          </Button>



          <div className="grid w-full gap-2 mt-4">
            <input
              type="text"
              className="text-black p-2 border rounded"
              placeholder="Ask your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button onClick={askQuestion} disabled={!selectedCharacter || !question}>
              Ask Question
            </Button>
          </div> */}



          <div className="text-white">
            {console.log(role)}
          </div>
        </div>
      </TracingBeam >
    </>
  );
}
