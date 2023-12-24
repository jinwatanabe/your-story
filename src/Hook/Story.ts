import { User } from "../domain/User";

export async function getStartStory(
  title: string,
  speed: number,
  restDate: number,
  user: User | null
) {
  const message = `
	${title}という目標を掲げました。この目標を達成することでなれる理想の将来を物語の結末としたときに、起承転結のある面白い物語を作ってください
	ただし0〜0.3を渡したらハッピーエンドの結末、0.3~1.0は何も起きない結末、1.0以上ならバッドエンドの結末にしてください
	今回は${speed}を渡したとします
	その物語を${restDate}分割して、1つ目と最後を教えてください
	文章以外に不要な説明は入れないでください。例えば「これは物語の結末です」とか
	文章はAPIで取得してsplit("\n\n")で分割します
  主人公の名前は${user!.name}, 年齢は${user!.age}歳です。
	`;

  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body,
  });
  const data = await res.json().then((res) => res.choices[0].message.content);
  const paragraphs = data.split("\n\n");
  return paragraphs;
}

export async function getTodayContent(
  total: string,
  end: string,
  mode: string,
  speed: number,
  restDate: number,
  user: User | null
): Promise<string> {
  const keep =
    (mode === "happy" && speed < 0.3) ||
    (mode === "bad" && speed > 1.0) ||
    (mode === "normal" && speed > 0.3 && speed < 1.0);

  const message = keep
    ? `${total}の続きの物語を作ってください` + user &&
      `主人公の名前は${user!.name}, 年齢は${user!.age}歳です。` +
        `その物語の結末は${end}になるようにしてください。その物語を${restDate}分割して、1つ目を教えてください。文章以外に不要な説明は淹れないでください。例えば「これは物語の結末です」とか。文章の1つ目と${end}を返してください。split("\n\n")で分割して1つ目と最後を取得します
      )}`
    : `
	ただし0〜0.3を渡したらハッピーエンドの結末、0.3~1.0は何も起きない結末、1.0以上ならバッドエンドの結末にしてください
	今回は${speed}を渡したとします
	その物語を${restDate}分割して、1つ目と最後を教えてください
	文章以外に不要な説明は入れないでください。例えば「これは物語の結末です」とか
	文章はAPIで取得してsplit("\n\n")で分割します
	`;

  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body,
  });
  const data = await res.json().then((res) => res.choices[0].message.content);
  const paragraphs = data.split("\n\n");
  return paragraphs;
}
