import React, {useEffect, useState} from 'react';
import eventEmitter from 'common/js/events.js';
import styles from './Prompt.scss';

function Prompt(props) {
  const [msg, setMsg] = useState('');

  let timer = null;

  function showMsg(errMsg) {
    setMsg(errMsg);
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      setMsg('');
      timer = null;
    }, 2000)
  }

  useEffect(() => {
    eventEmitter.addListener('error', showMsg)
    return function() {
      eventEmitter.removeListener('error', showMsg);
    }
  }, [msg])
  return (
    <p className={`prompt ${msg ? "active" : "inactive"}`}>
      {msg}
    </p>
  )
}

export default Prompt;