type Props = {
  todayContent: string;
  endContent: string;
  mode: "Happy" | "Nutral" | "Bad";
};

const StorySection = ({ todayContent, endContent, mode }: Props) => {
  const modeColor = () => {
    switch (mode) {
      case "Happy":
        return "text-orange-700";
      case "Nutral":
        return "";
      case "Bad":
        return "text-blue-700";
    }
  };

  return (
    <section>
      <h2 className="text-center text-lgf font-bold mb-2">今日の物語</h2>
      <div className="bg-red-200 w-full p-2">{todayContent}</div>
      <h2 className="text-center text-lgf font-bold mb-2 mt-5">
        現在のエンディング : <span className={modeColor()}>{mode}</span>
      </h2>
      <div className="bg-red-200 w-full p-2">{endContent}</div>
    </section>
  );
};

export default StorySection;
