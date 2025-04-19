import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsbyUserId,
  getLatestInterview,
} from "@/lib/actions/genral.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function page() {
  const user = await getCurrentUser();

  const [userInterview, latestInterview] = await Promise.all([
    getInterviewsbyUserId(user?.id as string),
    getLatestInterview({ userId: user?.id as string }),
  ]);

  const hasPastInterviews = userInterview && userInterview.length > 0;
  const hasLatestInterview = latestInterview && latestInterview.length > 0;

  return (
    <>
      <section>
        <div className="card-cta">
          <div className="flex flex-col gap-6 max-w-lg">
            <h3>
              Get Interview Ready with AI-Powered Interview Practice & Feedback
            </h3>
            <p className="text-lg">
              Practice on interview questions based on real experiences
            </p>
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">Start an Interview</Link>
            </Button>
          </div>
          <Image
            src="/robot.png"
            alt="robot"
            width={350}
            height={350}
            className="max-sm:hidden"
          />
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-6">
        <h2>Your Past Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterview?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You Haven&apos;t taken any interviews Yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-6">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasLatestInterview ? (
            latestInterview?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>There are no Interviews Yet</p>
          )}
        </div>
      </section>
    </>
  );
}

export default page;
