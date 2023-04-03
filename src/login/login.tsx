import { useState } from "react";

interface LoginProps {
  name: string;
  age?: string;
}

export function Login({ name, age }: LoginProps) {
  let userNameData = "";
  let message = "";
  if (age === "80" || name === "nando") {
    message = `yang login terakhir : ${name} - ${age}`;
  } else {
    message = "lu pepekc";
  }

  const [nama, setNama] = useState("");

  function handleClick() {
    setNama((document.getElementById("userName") as HTMLInputElement)?.value);
  }

  return (
    <>
      <p>{nama}</p>
      <p>{message}</p>
      <p>
        username :
        <input id={"userName"} type="input" size={20} />
      </p>
      <p>
        password : <input type="password" size={20} />
      </p>
      <p>
        <button onClick={handleClick}>CHECK NAME</button>
      </p>
    </>
  );
}
