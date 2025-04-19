import { db } from "@/firebase/admin";

export async function getInterviewsbyUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  const interviewsData = interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
  return interviewsData;
}

export async function getLatestInterview(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 10 } = params;
  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  const interviewsData = interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
  return interviewsData;
}

export async function getInterviewbyId(id: string): Promise<Interview | null> {
  const interviews = await db.collection("interviews").doc(id).get();

  return interviews.data() as Interview | null;
}
