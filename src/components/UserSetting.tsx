import { useForm } from "react-hook-form";
import { User } from "../domain/User";
import { saveUser } from "../Hook/User";

type UserFormValues = {
  name: string;
  age: number;
};

type Props = {
  handleSetUser: (user: User) => void;
  onCloseModal: () => void;
};

export const UserSetting = (props: Props) => {
  const { onCloseModal, handleSetUser } = props;
  const { register, handleSubmit } = useForm<UserFormValues>();
  const onSubmit = async (data: UserFormValues) => {
    const newUser = new User(data.name, data.age);
    await saveUser(newUser);
    handleSetUser(newUser);
    onCloseModal();
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          名前
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="お名前"
          {...register("name")}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="age"
        >
          年齢
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="age"
          type="number"
          placeholder="年齢"
          {...register("age")}
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="
				bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          登録
        </button>
      </div>
    </form>
  );
};
