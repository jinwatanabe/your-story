import "./App.css";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Goal } from "./domain/Goal";
import GoalChart from "./components/GoalChart";
import StorySection from "./components/StorySection";
import GoalForm from "./components/GoalForm";
import RecordForm from "./components/RecordForm";
import { updateGoal, useGetGoal } from "./Hook/Goal";
import { Story } from "./domain/Story";
import { Record } from "./domain/Record";
import { set } from "firebase/database";

type ChartData = {
  name: string;
  sales: number;
};

type GoalFormValues = {
  title: string;
  goal: number;
  date: string;
};

type RecordFormValues = {
  description: string;
};

Modal.setAppElement("#root");

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [restDate, setRestDate] = useState<number>(0);
  const [pase, setPase] = useState<number>(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [mode, setMode] = useState<"Happy" | "Nutral" | "Bad">("Nutral");
  const goalData = useGetGoal();

  useEffect(() => {
    if (goalData) {
      setGoal(goalData);
      setChartData([
        { name: "達成", sales: goalData.doneNum },
        { name: "残り", sales: goalData.goalNum - goalData.doneNum },
      ]);
      setRestDate(goalData.getRestDate());
      setPase(goalData.getPase());
      if (goalData.deadline > new Date()) {
        setIsProcessing(true);
      }

      if (0.5 > goalData.getPase() && goalData.getPase() > 0) {
        setMode("Happy");
      } else if (goalData.getPase() > 1.2) {
        setMode("Bad");
      } else {
        setMode("Nutral");
      }
    }
  }, [goalData?.id]);

  const handleClickSetting = () => {
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onGoalSubmit = async (data: GoalFormValues) => {
    console.log(data);
    if (!goal) return;
    const newGoal = new Goal(
      goal?.id,
      data.title,
      data.goal,
      0,
      new Date(data.date),
      [],
      new Story(
        "今日は、" + data.title + "を始めました。",
        "今日は、" + data.title + "を始めました。",
        "今日は、" + data.title + "を始めました。"
      )
    );

    await updateGoal(newGoal);
    setGoal(newGoal);
    setChartData([
      { name: "達成", sales: newGoal.doneNum },
      { name: "残り", sales: newGoal.goalNum - newGoal.doneNum },
    ]);
    setIsProcessing(true);
    setRestDate(newGoal.getRestDate());
    setPase(newGoal.getPase());
    closeModal();
  };

  const onCancelGoal = () => {
    setIsProcessing(false);
    closeModal();
  };

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const openRecordModal = () => {
    setIsRecordModalOpen(true);
  };

  const closeRecordModal = () => {
    setIsRecordModalOpen(false);
  };

  const onRecordSubmit = async (data: RecordFormValues) => {
    const newGoal = new Goal(
      goal!.id,
      goal!.title,
      goal!.goalNum,
      goal!.doneNum + 1,
      goal!.deadline,
      [...goal!.records, new Record(data.description)],
      goal!.story
    );
    await updateGoal(newGoal);
    setGoal(newGoal);
    setChartData([
      { name: "達成", sales: newGoal.doneNum },
      { name: "残り", sales: newGoal.goalNum - newGoal.doneNum },
    ]);
    setIsRecordModalOpen(false);
  };

  return (
    <>
      <Header onClickSetting={() => handleClickSetting()} />
      <div className="p-10">
        <h2 className="text-center font-bold text-2xl">
          {goal?.title ?? "新しい挑戦を始める"}
        </h2>
        <GoalChart
          chartData={chartData}
          label={goal?.doneNum + "/" + goal?.goalNum}
        />
        <div className="text-center mb-10">
          <div>残り{restDate}日</div>
          <div className="mb-2">
            目標達成まで
            <span className="font-bold text-orange-400">{pase}/日</span>
            ペース
          </div>
          <button
            className={
              isProcessing
                ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                : "bg-gray-500 text-white font-bold py-2 px-4 rounded disabled cursor-not-allowed"
            }
            onClick={() => openRecordModal()}
          >
            記録する
          </button>
        </div>
        <StorySection
          todayContent={goal?.story.today ?? ""}
          endContent={goal?.story.end ?? ""}
          mode={mode}
        />
        <div className="text-center font-bold mt-5">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            過去の物語を読む
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="p-4 bg-white rounded-lg overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4"
      >
        <GoalForm
          onSubmit={onGoalSubmit}
          onCancel={onCancelGoal}
          isProcessing={isProcessing}
          title={goal?.title}
          goalNum={goal?.goalNum}
          deadline={goal?.deadline}
        />
      </Modal>
      <Modal
        isOpen={isRecordModalOpen}
        onRequestClose={closeRecordModal}
        className="p-4 bg-white rounded-lg overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4"
      >
        <RecordForm onSubmit={onRecordSubmit} closeModal={closeRecordModal} />
      </Modal>
    </>
  );
}

export default App;
