import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechstack from "./DisplayTechstack";

function InterviewCard({
  interviewId,
  coverImage,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");
  return (
    <>
      <div className="card-border w-[360px] max-sm:w-full min-h-96">
        <div className="card-interview">
          <div>
            <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
              <p className="badge-text">{normalizedType}</p>
            </div>
            <Image
              src={getRandomInterviewCover()}
              alt="cover"
              width={75}
              height={75}
            />
            <h3 className="mt-4 capitalize">{role} Interview</h3>
            <div className="flex flex-row gap-5 mt-3">
              <div className="flex flex-row gap-2 items-center">
                <Image src="/calendar.svg" alt="clock" width={16} height={16} />
                <p>{formattedDate}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Image src="/star.svg" alt="star" width={16} height={16} />
                <p>{feedback?.totalScore || "---"}/100</p>
              </div>
            </div>
            <p className="line-clamp-2 mt-5">
              {feedback?.finalAssessment ||
                "You Haven't taken the interview. Take it now to imrove your skills."}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <DisplayTechstack techStack={techstack} />
            <Button asChild className="btn-primary">
              <Link
                href={
                  feedback
                    ? `/interview/${interviewId}/feedback`
                    : `/interview/${interviewId}`
                }
              >
                {feedback ? "View Feedback" : "Take Interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InterviewCard;
