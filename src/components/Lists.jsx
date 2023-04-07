const Lists = ({ lists, setActiveListHandler, activeList, removeList, colors }) => {
  const removeHandler = list => {
    if (activeList === list.id) {
      const id = lists.length === 2 ? lists[0].id : 0
      setActiveListHandler(id)
      localStorage.setItem('listId', id)
    }
    removeList(list)
  }

  return (
    <ul>
      {lists.map(list => (
        <li
          onClick={e => e.target.classList[0] !== 'remove' && setActiveListHandler(list.id)}
          key={list.id}
          className={`${list.id === activeList ? 'bg-white shadow-md' : 'hover:bg-slate-50 hover:shadow-md'} relative rounded-md h-9 text-base pl-8 pr-3 hover:pr-6 py-[6px] mb-1 truncate group cursor-pointer transition-all`}
        >
          <i
            style={{ backgroundColor: `${colors.find(color => color.id === list.colorId)["hex"]}` }}
            className='absolute top-3 left-3 block w-3 h-3 rounded-full'
          />
          <span>{list.name}</span>
          <i
            onClick={() => removeHandler(list)}
            className='remove group-hover:block hidden cursor-pointer w-7 h-7 text-2xl leading-6 text-center  absolute top-1 right-1 not-italic  text-slate-400'
          >&times;</i>
        </li>
      ))}
    </ul>
  )
}

export default Lists