import "./App.css";
import { Header } from "./components/Header";
import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { Goal, Record } from "./domain/Goal";
import GoalChart from "./components/GoalChart";
import StorySection from "./components/StorySection";
import GoalForm from "./components/GoalForm";
import RecordForm from "./components/RecordForm";

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
  const [goal, setGoal] = useState<Goal>();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const handleClickSetting = () => {
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onGoalSubmit = (data: GoalFormValues) => {
    const goal = new Goal(
      Math.random().toString(32).substring(2),
      data.title,
      data.goal,
      0,
      false,
      new Date(data.date),
      []
    );
    console.log(goal);
    setGoal(goal);
    setChartData([
      { name: "達成", sales: goal.doneNum },
      { name: "残り", sales: goal.goalNum - goal.doneNum },
    ]);
    setIsProcessing(true);
    closeModal();
  };

  const onCancelGoal = () => {
    setIsProcessing(false);
    closeModal();
  };

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // 記録モーダルを開く
  const openRecordModal = () => {
    setIsRecordModalOpen(true);
  };

  // 記録モーダルを閉じる
  const closeRecordModal = () => {
    setIsRecordModalOpen(false);
  };

  const onRecordSubmit = (data: RecordFormValues) => {
    const newGoal = new Goal(
      goal!.id,
      goal!.title,
      goal!.goalNum,
      goal!.doneNum + 1,
      goal!.isDone,
      goal!.deadline,
      [...goal!.records, new Record(data.description)]
    );
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
          <div className="mb-2">
            目標達成まで<span className="font-bold text-orange-400">1/日</span>
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
        <StorySection />
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
