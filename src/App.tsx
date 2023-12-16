import { DonutChart } from "@tremor/react";
import "./App.css";
import { Header } from "./components/Header";
import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { Task } from "./domain/Task";

type ChartData = {
  name: string;
  sales: number;
};

type FormValues = {
  title: string;
  goal: number;
  date: string;
};

Modal.setAppElement("#root");

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [task, setTask] = useState<Task>();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleClickSetting = () => {
    openModal();
  };

  const openModal = () => {
    if (!isProcessing) {
      reset();
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data: FormValues) => {
    const task = new Task(
      Math.random().toString(32).substring(2),
      data.title,
      data.goal,
      0,
      false,
      new Date(data.date)
    );
    console.log(task);
    setTask(task);
    setChartData([
      { name: "達成", sales: task.doneNum },
      { name: "残り", sales: task.goalNum - task.doneNum },
    ]);
    setIsProcessing(true);
    closeModal();
  };

  const handleCancelSetting = () => {
    setIsProcessing(false);
    closeModal();
  };

  return (
    <>
      <Header onClickSetting={() => handleClickSetting()} />
      <div className="p-10">
        <h2 className="text-center font-bold text-2xl">
          {task?.title ?? "新しい挑戦を始める"}
        </h2>
        <DonutChart
          className="mt-6 mb-4"
          data={chartData}
          category="sales"
          index="name"
          colors={["red", "slate"]}
          label={task?.doneNum + "/" + task?.goalNum}
          showAnimation={true}
          animationDuration={1000}
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
          >
            記録する
          </button>
        </div>
        <section>
          <h2 className="text-center text-lgf font-bold mb-2">今日の物語</h2>
          <div className="bg-red-200 w-full p-2">
            主人公は、YouTubeで100本の動画を投稿するという大きな目標を掲げます。夢に満ち溢れ、情熱を胸に、カメラを手に初めての動画を撮影し始めます。最初は不安と緊張で声が震え、画面の前で何を話したらいいかわからない。しかし、彼は自分の興味を共有することに価値があると信じていました。そこで、彼は自分の好きな趣味や日常の出来事を語り始め、最初の動画をアップロードすることに成功します。
          </div>
          <h2 className="text-center text-lgf font-bold mb-2 mt-5">
            現在のエンディング : Happy
          </h2>
          <div className="bg-red-200 w-full p-2">
            主人公は、YouTubeで100本の動画を投稿するという大きな目標を掲げます。夢に満ち溢れ、情熱を胸に、カメラを手に初めての動画を撮影し始めます。最初は不安と緊張で声が震え、画面の前で何を話したらいいかわからない。しかし、彼は自分の興味を共有することに価値があると信じていました。そこで、彼は自分の好きな趣味や日常の出来事を語り始め、最初の動画をアップロードすることに成功します。
          </div>
        </section>
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
        <div
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold mb-4">新規目標登録</h2>
          <form className="w-full max-w-md">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                タイトル
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="目標のタイトル"
                {...register("title", { required: true })}
                disabled={isProcessing}
              />
              {errors.title && (
                <span className="text-red-500">タイトルが未入力です</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="goal"
              >
                目標数
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="目標数"
                {...register("goal", { required: true, min: 1 })}
                disabled={isProcessing}
              />
              {errors.goal && (
                <span className="text-red-500">
                  1以上の数値を入力してください
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="deadline"
              >
                期限
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="deadline"
                type="date"
                {...register("date", { required: true })}
                defaultValue={new Date().toISOString().slice(0, 10)}
                disabled={isProcessing}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={
                  isProcessing
                    ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    : "bg-gray-500 text-white font-bold py-2 px-4 rounded disabled cursor-not-allowed"
                }
                onClick={() => handleCancelSetting()}
              >
                挑戦をやめる
              </button>
              <button
                className={
                  isProcessing
                    ? "bg-gray-500 text-white font-bold py-2 px-4 rounded disabled cursor-not-allow"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                }
                type="submit"
              >
                登録
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default App;
