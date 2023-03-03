import * as React from 'react';

const CheckMark = ({className}) => (
    <svg  width={28} height={28} class={className} >
    <path
      d="M5.268 10.732a2.501 2.501 0 0 0-3.536 3.536l4.645 4.645a3.709 3.709 0 0 0 5.246 0l.913-.913-7.268-7.268z"
      opacity={0.35} 
    />
    <path d="M22.268 4.732a2.501 2.501 0 0 0-3.536 0L9 14.464 12.536 18l9.732-9.732a2.501 2.501 0 0 0 0-3.536z"  fill='#fff' />
  </svg>
)

export default CheckMark;
