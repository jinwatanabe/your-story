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
      const goals = snapshot.docs.map(
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
            ),
            doc.data().lastDate,
            doc.data().mode
          )
      );

      // if (new Date() > goals[0].lastDate.toDate()) {
      //   goals[0].lastDate = Timestamp.fromDate(new Date());
      //   goals[0].story.today = await getTodayContent(goals[0].story.total);
      // }
      setGoalsJson(goals);
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
        goals[0].story,
        new Date(goals[0].lastDate.seconds * 1000),
        goals[0].mode
      )
    : undefined;
}

export async function updateGoal(goal: Goal) {
  try {
    const goalRef = doc(db, "goals", goal.id);
    await updateDoc(goalRef, {
      title: goal.title,
      goalNum: goal.goalNum,
      doneNum: goal.doneNum,
      deadline: goal.deadline,
      records: goal.records.map((record) => ({
        description: record.description,
      })),
      story: {
        today: goal.story.today,
        end: goal.story.end,
        total: goal.story.total,
      },
      mode: goal.mode,
    });
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
    public story: Story,
    public lastDate: Timestamp,
    public mode: string
  ) {}
}
