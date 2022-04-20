import {useState} from 'react';

export default function ButtonTitle() {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <>
      {showTitle && <h1>The Title Nih Bos</h1>}
      <button onClick={() => setShowTitle(prev => !prev)} data-testid="btnClickMe">toggle show title</button>
    </>
  )
}
