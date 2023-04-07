import { useState, useEffect } from 'react'

const AddList = ({ colors, addList }) => {
   const [popupVisible, setPopupVisible] = useState(false)
   const [inputValue, setInputValue] = useState('')
   const [activeColor, setActiveColor] = useState(colors[0].id)

   const toggleHandler = () => {
      setInputValue('')
      setActiveColor(colors[0].id)
      setPopupVisible(!popupVisible)
   }

   useEffect(() => {
      if (popupVisible) document.getElementById('addListInput').focus()
   }, [popupVisible])

   return (
      <>
         <button
            onClick={toggleHandler}
            className='rounded-md hover:text-slate-800 p-3 mt-5 text-slate-400 transition-colors'
         >
            <i className='w-7 h-7 text-3xl leading-6 text-center not-italic mr-2 relative top-[3px]'>&#43;</i>
            Добавить список
         </button>

         {popupVisible &&
            <div className="bg-white rounded-xl shadow-lg p-5 absolute w-60 flex flex-col gap-3">
               <i
                  onClick={toggleHandler}
                  className='cursor-pointer w-7 h-7 text-2xl leading-6 text-center absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 not-italic text-slate-50 bg-slate-400/90 hover:bg-slate-500 hover:shadow-[0_0_6px_grey] rounded-full'
               >&times;</i>
               <input
                  className='py-2 px-3 rounded-md border border-slate-300 placeholder:text-slate-300 placeholder:italic w-full outline-none'
                  placeholder='Название списка'
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  id='addListInput'
               />
               <div className="flex justify-between">
                  {colors.map(color => (
                     <i
                        key={color.id}
                        style={{ backgroundColor: `${color.hex}` }}
                        className={`${color.id === activeColor ? 'border-2 border-slate-400' : ''} block w-5 h-5 rounded-full cursor-pointer`}
                        onClick={() => setActiveColor(color.id)}
                     />
                  ))}
               </div>
               <button
                  onClick={() => addList(inputValue, activeColor)?.then(() => toggleHandler())}
                  className='rounded-md bg-green-400 text-white py-2 hover:shadow-lg shadow-black hover:bg-green-500/70 active:bg-green-500 transition-all'
               >Добавить</button>
            </div>
         }
      </>
   )
}


export default AddList