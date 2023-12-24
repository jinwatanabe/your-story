type Props = {
  story: string;
  closeModal: () => void;
};
export const StoryAll = (props: Props) => {
  const { story, closeModal } = props;

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4 mt-2">
        ここまでのストーリー
      </h1>
      <div>{story}</div>
      <div className="flex items-center justify-center mt-4 mb-4">
        <button
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => closeModal()}
        >
          閉じる
        </button>
      </div>
    </>
  );
};
