

const Button = ({text, bgCol, textCol, hover, onClick}) => {
  return (
    <button onClick={onClick} className={`rounded-md ${bgCol} xl:px-6 xl:py-2 ${textCol} sm: px-4 sm:py-2 text-sm font-medium ${hover}`}>{text}</button>
  )
}

export default Button