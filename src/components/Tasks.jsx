import classNames from "classnames"
import CheckBox from "./CheckBox"
import { useState } from "react"

const Tasks = ({ tasks, list, newTaskId, setTasks }) => {
  const [initialFocus, setInitialFocus] = useState(null)

  const onBlurHandler = (e, task) => {
    const { id, listId, completed } = task
    const { value: text } = e.target

    if (id === newTaskId) {
      document.querySelector("#addTaskBtn.hidden").classList.remove("hidden")

      if (!text) setTasks(tasks.filter((t) => t.id !== task.id))
      else {
        fetch("http://localhost:3001/tasks", {
          method: "POST",
          body: JSON.stringify({ listId, text, completed }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            let newtasks = [...tasks]
            newtasks.find((t) => t.id === id).id = data.id
            setTasks(newtasks)
          })
      }
    } else {
      if (!text) {
        let newtasks = [...tasks]
        newtasks.find((t) => t.id === id).text = initialFocus
        setTasks(newtasks)
      } else if (text !== initialFocus) {
        fetch(`http://localhost:3001/tasks/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ text }),
          headers: { "Content-Type": "application/json" },
        })
      }
    }
  }

  const onChangeHandler = (e, task) => {
    let newtasks = [...tasks]
    newtasks.find((newtask) => newtask.id === task.id).text = e.target.value
    setTasks(newtasks)
  }

  const removeTaskHandler = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" }).then(() =>
      setTasks(tasks.filter((t) => t.id !== id))
    )
  }

  return (
    <ul>
      {tasks.filter((task) => task.listId === list.id).length > 0 ? (
        tasks
          .filter((task) => task.listId === list.id)
          .map((task) => (
            <li
              key={task.id}
              className="flex items-center mb-3 last:mb-0 group relative pr-7"
            >
              {task.id !== newTaskId ? (
                <CheckBox
                  id={`checkbox-${task.id}`}
                  checked={tasks.find((t) => t.id === task.id).completed}
                  onChange={(e) => {
                    let newtasks = [...tasks]
                    newtasks.find((t) => t.id === task.id).completed =
                      e.target.checked
                    setTasks(newtasks)

                    fetch(`http://localhost:3001/tasks/${task.id}`, {
                      method: "PATCH",
                      body: JSON.stringify({ completed: e.target.checked }),
                      headers: { "Content-Type": "application/json" },
                    })
                  }}
                />
              ) : (
                <i className="w-7 h-7 text-3xl leading-5 text-center not-italic relative top-[1px] -left-1 text-slate-300">
                  &#43;
                </i>
              )}
              <input
                value={tasks.find((t) => t.id === task.id).text}
                onChange={(e) => onChangeHandler(e, task)}
                onBlur={(e) => onBlurHandler(e, task)}
                onFocus={(e) => setInitialFocus(e.target.value)}
                autoComplete="off"
                className={classNames(
                  "ml-4 w-full truncate bg-transparent outline-none  py-[0.5px] border-b border-transparent focus:border-slate-300 group-hover:border-slate-300 peer placeholder:text-slate-300",
                  { "relative -left-2 top-0 newtask": task.id === newTaskId }
                )}
                type="text"
                name="text"
                placeholder={task.id === newTaskId ? "Новая задача" : ""}
              />
              <i
                onClick={() => removeTaskHandler(task.id)}
                className="remove group-hover:block peer-focus:block hidden cursor-pointer w-7 h-7 text-2xl leading-6 text-center absolute top-0 right-0 not-italic text-slate-300"
              >
                &times;
              </i>
            </li>
          ))
      ) : (
        <h3 className="text-xl font-medium text-slate-300">
          Задачи отсутствуют
        </h3>
      )}
    </ul>
  )
}

export default Tasks
