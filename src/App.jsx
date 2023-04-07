import { useState, useEffect } from "react"

import Lists from "./components/Lists"
import ListTitle from "./components/ListTitle"
import Tasks from "./components/Tasks"
import AddList from "./components/AddList"

function App() {
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState(null)

  const [tasks, setTasks] = useState(null)
  const [colors, setColors] = useState(null)
  const [newTaskId, setNewTaskId] = useState(null)

  useEffect(() => {
    // lists
    fetch("https://todo-app-git-main-etherealhero.vercel.app/lists")
      .then((response) => response.json())
      .then((data) => {
        if (localStorage.getItem("listId") === null)
          localStorage.setItem("listId", data[0].id)
        setLists(data)
        setActiveList(Number(localStorage.getItem("listId")))
      })

    // colors
    fetch("https://todo-app-git-main-etherealhero.vercel.app/colors")
      .then((response) => response.json())
      .then((data) => setColors(data))

    // tasks
    fetch("https://todo-app-git-main-etherealhero.vercel.app/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
  }, [])

  const removeList = (list) => {
    fetch(
      `https://todo-app-git-main-etherealhero.vercel.app/lists/${list.id}`,
      { method: "DELETE" }
    ).then(() => setLists(lists.filter((l) => l.id !== list.id)))
  }

  const addList = (name, colorId) => {
    if (!name) return
    const list = { name, colorId }
    return fetch("https://todo-app-git-main-etherealhero.vercel.app/lists", {
      method: "POST",
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLists([...lists, data])
        setActiveListHandler(data.id)
      })
  }

  const setActiveListHandler = (id) => {
    localStorage.setItem("listId", id)
    setActiveList(id)
  }

  useEffect(() => {
    let newTask = document.querySelector(".newtask")
    newTask?.focus()
  }, [newTaskId])

  useEffect(() => {
    if (lists.length === 1) setActiveListHandler(lists[0].id)
  }, [lists])

  return (
    <div className="flex min-h-screen">
      {/* Aside menu */}
      <div className="w-64 shrink-0 bg-slate-100 px-8 py-16">
        <div className="fixed w-48">
          {lists?.length > 1 ? (
            <ul className="mb-8">
              <li
                onClick={() => {
                  setActiveListHandler(0)
                  localStorage.setItem("listId", 0)
                }}
                className={`${
                  activeList === 0 ? "bg-white shadow-md" : ""
                } hover:bg-white rounded-md hover:shadow-md px-4 py-2 text-xl cursor-pointer transition-all duration-200`}
              >
                &equiv;
                <span className="text-base ml-2 relative -top-0.5">
                  Все задачи
                </span>
              </li>
            </ul>
          ) : null}

          {colors && (
            <>
              <Lists
                lists={lists}
                setActiveListHandler={setActiveListHandler}
                activeList={activeList}
                removeList={removeList}
                colors={colors}
              />

              <AddList colors={colors} addList={addList} />
            </>
          )}
        </div>
      </div>

      {/* Main body */}
      <ul className="p-16 w-full">
        {lists?.length === 0 ? (
          <h1 className="text-slate-300 text-2xl font-semibold pt-8">
            Задачи отсутствуют
          </h1>
        ) : (
          lists &&
          colors &&
          tasks &&
          lists
            .filter((list) => (activeList ? list.id === activeList : 1))
            .map((list) => (
              <li key={list.id} className="max-w-md mb-10">
                <ListTitle
                  colors={colors}
                  list={list}
                  lists={lists}
                  setLists={setLists}
                />
                <Tasks
                  tasks={tasks}
                  setTasks={setTasks}
                  list={list}
                  newTaskId={newTaskId}
                />
                {!activeList ? null : (
                  <button
                    onClick={(e) => {
                      let id = Date.now()
                      setTasks([
                        ...tasks,
                        {
                          id,
                          listId: list.id,
                          text: "",
                          completed: false,
                        },
                      ])
                      setNewTaskId(id)
                      e.target.classList.add("hidden")
                    }}
                    className="hover:text-slate-600 p-2 text-slate-300 transition-colors relative -left-2 top-px"
                    id="addTaskBtn"
                  >
                    <i className="w-7 h-7 text-3xl leading-6 text-center not-italic mr-4 relative top-[3px]">
                      &#43;
                    </i>
                    Новая задача
                  </button>
                )}
              </li>
            ))
        )}
      </ul>
    </div>
  )
}

export default App
