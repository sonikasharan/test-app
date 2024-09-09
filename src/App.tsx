import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const data = [
    { title: "First", id: 0, checked: false },
    { title: "Second", id: 1, checked: false },
    { title: "Third", id: 2, checked: false },
  ];
  const [firstList, setFirstList] = useState(data);
  const [secondList, setSecondList] = useState([
    { title: "Fourth", id: 3, checked: false },
  ]);

  const handlesSelectedFirstBlocks = (item: any) => {
    setFirstList(
      firstList.map((listItem) => {
        return item.id === listItem.id
          ? {
              ...listItem,
              checked: !listItem.checked,
            }
          : listItem;
      })
    );
  };

  const handlesSelectedSecondBlocks = (item: any) => {
    setSecondList(
      secondList.map((listItem) => {
        return item.id === listItem.id
          ? {
              ...listItem,
              checked: !listItem.checked,
            }
          : listItem;
      })
    );
  };

  const moveRight = () => {
    const selectedItems = firstList.filter((item) => item.checked);
    const remainingItems = firstList.filter((item) => !item.checked);
    const makeSecondList = selectedItems.map((item) => {
      return item.checked ? { ...item, checked: false } : item;
    });

    setFirstList(remainingItems);
    setSecondList([...secondList, ...makeSecondList]);
  };

  const moveLeft = () => {
    const selectedItems = secondList.filter((item) => item.checked);
    const remainingItems = secondList.filter((item) => !item.checked);
    const makeFirstList = selectedItems.map((item) => {
      return item.checked ? { ...item, checked: false } : item;
    });
    setSecondList(remainingItems);
    setFirstList([...firstList, ...makeFirstList]);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center space-x-10 bg-gray-100">
      <div className="h-[50vh] w-[40vh] flex flex-col space-y-2 p-3 bg-white shadow-md rounded-md overflow-y-auto">
        {firstList.map((item) => (
          <div
            key={item.id}
            onClick={() => handlesSelectedFirstBlocks(item)}
            className={`cursor-pointer border border-gray-300 p-4 rounded-md transition-colors duration-200 ${
              item.checked ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {item.title}
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={moveRight}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
        >
          Move Right
        </button>
        <button
          onClick={moveLeft}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
        >
          Move Left
        </button>
      </div>

      <div className="h-[50vh] w-[40vh] flex flex-col space-y-2 p-3 bg-white shadow-md rounded-md overflow-y-auto">
        {secondList.length !== 0 && (
          <div>
            {secondList.map((item) => (
              <div
                key={item.id}
                onClick={() => handlesSelectedSecondBlocks(item)}
                className={`cursor-pointer border border-gray-300 my-2 p-4 rounded-md transition-colors duration-200 ${
                  item.checked ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
