import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: GoalFormValues) => void;
  onCancel: () => void;
  isProcessing: boolean;
  title?: string;
  goalNum?: number;
  deadline?: Date;
};

type GoalFormValues = {
  title: string;
  goal: number;
  date: string;
};

const GoalForm = ({
  onSubmit,
  onCancel,
  isProcessing,
  title,
  goalNum,
  deadline,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalFormValues>();

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
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
          defaultValue={isProcessing ? title : ""}
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
          defaultValue={isProcessing ? goalNum : ""}
        />
        {errors.goal && (
          <span className="text-red-500">1以上の数値を入力してください</span>
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
          defaultValue={
            isProcessing && deadline
              ? new Date(deadline).toISOString().slice(0, 10)
              : new Date().toISOString().slice(0, 10)
          }
          disabled={isProcessing}
        />
      </div>
      <div className="flex items-center justify-center">
        {isProcessing ? (
          <button
            className={
              isProcessing
                ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                : "bg-gray-500 text-white font-bold py-2 px-4 rounded disabled cursor-not-allowed"
            }
            onClick={() => onCancel()}
          >
            挑戦をやめる
          </button>
        ) : (
          <button
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            }
            type="submit"
          >
            登録
          </button>
        )}
      </div>
    </form>
  );
};

export default GoalForm;
