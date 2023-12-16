import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: RecordFormValues) => void;
  closeModal: () => void;
};

type RecordFormValues = {
  description: string;
  isProcessing: boolean;
};

const RecordForm = ({ onSubmit, closeModal }: Props) => {
  const { register, handleSubmit } = useForm<RecordFormValues>();

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        {...register("description", { required: true })}
        className="mb-4 w-full max-w-md p-2 border rounded"
        placeholder="内容を入力"
        defaultValue={""}
      />
      <div className="flex items-center justify-between w-full max-w-md">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          保存
        </button>
        <button
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => closeModal()}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default RecordForm;
