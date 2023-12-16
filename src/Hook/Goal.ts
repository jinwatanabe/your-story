import {
  Timestamp,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Goal } from "../domain/Goal";
import { Story } from "../domain/Story";
import { Record } from "../domain/Record";

export function useGetGoal() {
  const [goals, setGoalsJson] = useState<GoalJson[]>([]);

  useEffect(() => {
    const goalData = collection(db, "goals");
    const fetchGoals = async () => {
      const snapshot = await getDocs(goalData);
      console.log(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as GoalJson))
      );
      setGoalsJson(
        snapshot.docs.map(
          (doc) =>
            new GoalJson(
              doc.id,
              doc.data().title,
              doc.data().goalNum,
              doc.data().doneNum,
              doc.data().deadline,
              [],
              new Story(
                doc.data().story.today,
                doc.data().story.end,
                doc.data().story.total
              )
            )
        )
      );
    };

    fetchGoals();
  }, []);

  return goals.length > 0
    ? new Goal(
        goals[0].id,
        goals[0].title,
        goals[0].goalNum,
        goals[0].doneNum,
        new Date(goals[0].deadline.seconds * 1000),
        goals[0].records,
        goals[0].story
      )
    : undefined;
}

export async function updateGoal(goal: Goal) {
  try {
    console.log("Updating goal:", goal.id);
    const goalRef = doc(db, "goals", goal.id);
    await updateDoc(goalRef, {
      title: goal.title,
      goalNum: goal.goalNum,
      doneNum: goal.doneNum,
      deadline: goal.deadline,
      records: goal.records.map((record) => ({
        description: record.description,
      })),
    });
    console.log("Goal updated successfully");
  } catch (error) {
    console.error("Error updating goal:", error);
  }
}

class GoalJson {
  constructor(
    public id: string,
    public title: string,
    public goalNum: number,
    public doneNum: number,
    public deadline: Timestamp,
    public records: Record[],
    public story: Story
  ) {}
}
