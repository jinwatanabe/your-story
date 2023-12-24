type Props = {
  onClickSetting: () => void;
  onClickUser: () => void;
};

export const Header = (props: Props) => {
  const { onClickSetting, onClickUser } = props;

  return (
    <section className="bg-red-500 items-center p-4 flex justify-between">
      <div className="flex">
        <img src="/logo.svg" alt="logo" className="w-8 mr-4" />
        <h1 className="text-white font-bold text-2xl">Your Story</h1>
      </div>
      <div className="flex">
        <div className="cursor-pointer mr-4" onClick={() => onClickUser()}>
          <img src="/user.svg" alt="user" className="w-5" />
        </div>
        <div className="cursor-pointer" onClick={() => onClickSetting()}>
          <img src="/setting.svg" alt="setting" className="w-5" />
        </div>
      </div>
    </section>
  );
};
