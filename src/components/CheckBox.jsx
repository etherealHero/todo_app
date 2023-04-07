const CheckBox = ({ id, checked, onChange }) => {
   return (
      <>
         <input
            checked={checked}
            onChange={onChange}
            
            id={id}
            className='peer hidden'
            type="checkbox"
            name="checkbox"
         />
         <label
            htmlFor={id}
            className='w-5 h-5 flex items-center justify-center rounded-full border-2 cursor-pointer
                 // default
                 transition-colors
                 duration-150
               border-slate-200 

                 // checked
               peer-hover:peer-checked:bg-green-300 
               peer-checked:bg-green-300 
               peer-checked:border-green-300
               peer-checked:stroke-white
               peer-hover:peer-checked:stroke-white

                 // hover
               peer-hover:bg-slate-200
               peer-hover:stroke-slate-400'
         >
            <svg
               className='relative left-[0.1px] top-[0.4px]'
               width="11"
               height="8"
               viewBox="0 0 11 8"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round" />
            </svg>
         </label>
      </>
   )
}

export default CheckBox