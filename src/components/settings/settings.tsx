import { useState } from "react";
import classNames from "classnames";
import Login from "../login/login";

function Settings({
  aiProvider,
  setAiProvider,
  openRouterModel,
  setOpenRouterModel,
}: {
  aiProvider: string | undefined;
  setAiProvider: (value: string) => void;
  openRouterModel: string | undefined;
  setOpenRouterModel: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-gray-800/70 rounded-md text-xs text-gray-300 hover:brightness-125 px-3 py-1.5 font-medium cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Settings
      </button>
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
          "absolute top-[calc(100%+8px)] right-0 z-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-75 overflow-hidden",
          {
            "opacity-0 pointer-events-none": !open,
          }
        )}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
          <div className="mt-4">
            <label
              htmlFor="ai-provider"
              className="block text-sm font-medium text-gray-700"
            >
              AI Provider
            </label>
            <select
              id="ai-provider"
              name="ai-provider"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value)}
            >
              <option value="huggingface">Hugging Face</option>
              <option value="openrouter">OpenRouter</option>
            </select>
          </div>
          {aiProvider === "openrouter" && (
            <div className="mt-4">
              <label
                htmlFor="openrouter-model"
                className="block text-sm font-medium text-gray-700"
              >
                OpenRouter Model
              </label>
              <input
                type="text"
                name="openrouter-model"
                id="openrouter-model"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={openRouterModel}
                onChange={(e) => setOpenRouterModel(e.target.value)}
              />
            </div>
          )}
          <div className="mt-4">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
