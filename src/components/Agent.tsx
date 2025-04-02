import { stat } from "fs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

enum callStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

function Agent({ userName }: AgentProps) {
  const status = callStatus.INACTIVE;
  const isSpeaking = true;
  const messages = [
    "what is your name ?",
    "what is your name ?",
    "How aayr you doing ",
    "bye",
  ];

  const lastMessage = messages[messages.length - 1];
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="You"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center">
        {status !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                status === "CONNECTING" ? "" : "hidden"
              )}
            />
            <span>
              {status === "INACTIVE" || status === "FINISHED"
                ? "Start a call"
                : "Connecting..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End</button>
        )}
      </div>
    </>
  );
}

export default Agent;
