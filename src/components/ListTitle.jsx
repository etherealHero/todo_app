import { useState } from 'react'

const ListTitle = ({ lists, list, colors, setLists }) => {
   const [initialFocus, setInitialFocus] = useState(null)

   const onChangeHandler = (e, list) => {
      let newlists = [...lists]
      newlists.find(newlist => newlist.id === list.id).name = e.target.value
      setLists(newlists)
   }

   const onBlurHandler = (e, list) => {
      const { id } = list
      const { value: name } = e.target

      if (!name) {
         let newlists = [...lists]
         newlists.find(l => l.id === id).name = initialFocus
         console.log('initial')
         setLists(newlists)
      } else if (name !== initialFocus) {
         fetch(`http://localhost:3001/lists/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' }
         })
         // .then(() => console.log('name patched'))
      }
   }

   const colorChangeHandler = color => {
      if (color.id === list.colorId) return
      
      let newlists = [...lists]
      newlists.find(l => l.id === list.id).colorId = color.id
      setLists(newlists)

      fetch(`http://localhost:3001/lists/${list.id}`, {
         method: 'PATCH',
         body: JSON.stringify({ colorId: color.id }),
         headers: { 'Content-Type': 'application/json' }
      })
   }

   return (
      <div className="relative">
         <input
            onChange={e => onChangeHandler(e, list)}
            value={lists.find(l => l.id === list.id).name}
            onBlur={e => onBlurHandler(e, list)}
            onFocus={e => setInitialFocus(e.target.value)}
            className='text-4xl z-10 bg-transparent font-bold relative -left-2 p-2 pr-10 outline-none rounded-lg w-full cursor-pointer focus:cursor-text peer 
               border-2 border-transparent hover:border-slate-200/70 focus:border-slate-200/70 focus:pb-10 transition-all duration-300'
            style={{ color: `${colors.find(color => color.id === list.colorId)["hex"]}` }}
            type="text"
            id={list.id}
            autoComplete='off'
         />

         <i
            onClick={() => { }}
            className='rounded-md cursor-pointer w-7 h-7 text-2xl leading-6 text-center absolute top-4 right-4 not-italic text-slate-300
               border border-slate-200 peer-hover:border-transparent peer-focus:border-transparent transition-colors duration-300'
         >&#9998;</i>

         <div 
            className="flex gap-1 absolute top-[58px] left-1 z-10 peer-focus:opacity-100 opacity-0 transition-opacity duration-300"
            onClick={() => document.getElementById(`${list.id}`).focus()}
         >
            {colors.map(color => (
               <i
                  key={color.id}
                  style={{ backgroundColor: `${color.hex}` }}
                  className={`${color.id === list.colorId ? 'border-2 border-slate-400' : ''} block w-5 h-5 rounded-full cursor-pointer`}
                  onClick={() => colorChangeHandler(color)}
               />
            ))}
         </div>

         <hr className='my-4' />
      </div>
   )
}

export default ListTitle