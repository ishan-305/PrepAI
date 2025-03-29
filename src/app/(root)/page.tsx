import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
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
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-6">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </>
  );
}

export default page;
