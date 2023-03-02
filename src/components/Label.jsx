const Label = ({ text, bgCol, textCol, space }) => {
  return (
    <div className='w-max flex justify-center items-center'>
      <p
        className={`rounded-full ${bgCol} xl:px-4 xl:py-0.5  ${textCol} sm: px-4 sm:py-0.5 text-sm font-medium ${space}`}
      >
        {text}
      </p>
    </div>
  );
};

export default Label;
