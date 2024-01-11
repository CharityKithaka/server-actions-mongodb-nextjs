"use client";

import { fetchUsers, addUser } from "./actions";
import { useEffect, useState } from "react";

export default function Home() {
  const [addedState, setAddedState] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [data, setData] = useState([]);

  const onNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    setAddedState(false);
    e.preventDefault();
    addUser(email, name).then((res) => {
      setEmail("");
      setName("");
      setAddedState(true);
    });
  };

  useEffect(() => {
    fetchUsers().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (addedState) {
      fetchUsers().then((res) => {
        setData(res);
      });
    }
  }, [addedState]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="flex gap-x-9" onSubmit={onSubmit}>
        <input
          className="border-2 border-gray-500 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="Name"
          value={name}
          onChange={onNameChange}
        />
        <input
          className="border-2 border-gray-500 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          value="Submit"
        />
      </form>
      {data.map((item, i) => (
        <div key={i} className="flex flex-col bg-slate-700 w-3/6 rounded">
          <div className="flex gap-x-20">
            <div className="w-1/3 h-12  rounded-lg">Name</div>
            <div className="w-1/3 h-12  rounded-lg">{item.name}</div>
          </div>
          <div className="flex gap-x-20">
            <div className="w-1/3 h-12 rounded-lg">Email</div>
            <div className="w-1/3 h-12  rounded-lg">{item.email}</div>
          </div>
        </div>
      ))}
    </main>
  );
}
