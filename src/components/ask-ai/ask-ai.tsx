import { useState } from "react";
import { RiSparkling2Fill } from "react-icons/ri";
import { GrSend } from "react-icons/gr";
import classNames from "classnames";
import { toast } from "react-toastify";

import Login from "../login/login";
import { defaultHTML } from "../../utils/consts";
import SuccessSound from "./../../assets/success.mp3";

function AskAI({
  files,
  setFiles,
  onScrollToBottom,
  isAiWorking,
  setisAiWorking,
  aiProvider,
  openRouterModel,
}: {
  files: { path: string; content: string }[];
  setFiles: (files: { path: string; content: string }[]) => void;
  onScrollToBottom: () => void;
  isAiWorking: boolean;
  setisAiWorking: React.Dispatch<React.SetStateAction<boolean>>;
  aiProvider: string | undefined;
  openRouterModel: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const [previousPrompt, setPreviousPrompt] = useState("");
  const audio = new Audio(SuccessSound);
  audio.volume = 0.5;

  const callAi = async () => {
    if (isAiWorking || !prompt.trim()) return;
    setisAiWorking(true);

    try {
      const url = aiProvider === "openrouter" ? "/api/ask-ai-openrouter" : "/api/ask-ai";
      const body =
        aiProvider === "openrouter"
          ? {
              prompt,
              files,
              previousPrompt,
              model: openRouterModel,
            }
          : {
              prompt,
              files,
              previousPrompt,
            };

      const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        const res = await request.json();
        if (res.openLogin) {
          setOpen(true);
        } else {
          toast.error(res.message);
        }
        setisAiWorking(false);
        return;
      }

      const response = await request.json();
      if (response.files) {
        setFiles(response.files);
        toast.success("AI responded successfully");
        setPrompt("");
        setPreviousPrompt(prompt);
        setHasAsked(true);
        audio.play();
      } else {
        toast.error("The AI did not return any files.");
      }
    } catch (error: any) {
      toast.error(error.message);
      if (error.openLogin) {
        setOpen(true);
      }
    } finally {
      setisAiWorking(false);
    }
  };

  return (
    <div
      className={`bg-gray-950 rounded-xl py-2 lg:py-2.5 pl-3.5 lg:pl-4 pr-2 lg:pr-2.5 absolute lg:sticky bottom-3 left-3 lg:bottom-4 lg:left-4 w-[calc(100%-1.5rem)] lg:w-[calc(100%-2rem)] z-10 group ${
        isAiWorking ? "animate-pulse" : ""
      }`}
    >
      <div className="w-full relative flex items-center justify-between">
        <RiSparkling2Fill className="text-lg lg:text-xl text-gray-500 group-focus-within:text-pink-500" />
        <input
          type="text"
          disabled={isAiWorking}
          className="w-full bg-transparent max-lg:text-sm outline-none pl-3 text-white placeholder:text-gray-500 font-code"
          placeholder={
            hasAsked ? "What do you want to ask AI next?" : "Ask AI anything..."
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              callAi();
            }
          }}
        />
        <button
          disabled={isAiWorking}
          className="relative overflow-hidden cursor-pointer flex-none flex items-center justify-center rounded-full text-sm font-semibold size-8 text-center bg-pink-500 hover:bg-pink-400 text-white shadow-sm dark:shadow-highlight/20 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          onClick={callAi}
        >
          <GrSend className="-translate-x-[1px]" />
        </button>
      </div>
      <div
        className={classNames(
          "h-screen w-screen bg-black/20 fixed left-0 top-0 z-10",
          {
            "opacity-0 pointer-events-none": !open,
          }
        )}
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={classNames(
          "absolute top-0 -translate-y-[calc(100%+8px)] right-0 z-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-75 overflow-hidden",
          {
            "opacity-0 pointer-events-none": !open,
          }
        )}
      >
        <Login html={html}>
          <p className="text-gray-500 text-sm mb-3">
            You reached the limit of free AI usage. Please login to continue.
          </p>
        </Login>
      </div>
    </div>
  );
}

export default AskAI;
