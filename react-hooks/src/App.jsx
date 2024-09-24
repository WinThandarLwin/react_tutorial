import { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import './App.css'
import userInfoContext from './main';
import SomeChild from './SomeChild';
import useLocalStorage from './UseLocalStorage';
import useSWR from 'swr';


const reducer = (state, action) => {
  switch(action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}


const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  // useState, useEffect
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  const resetClick = () => {
    setCount(0);
  }
  
  useEffect(() => {
    console.log("when count change only, useEffectFunction Call");
  }, [count]); // count値が変わったタイミングで実行する, [] 何も設定してない場合、page reloadたびに実行

  // useContext
  const userInfo = useContext(userInfoContext);

  // useRef
  const name = useRef();
  const age = useRef();
  const [nameVal, setNameVal] = useState("");
  const [ageVal, setAgeVal] = useState(0);

  const handleRef = () => {
    setNameVal(name.current.value);
    setAgeVal(age.current.value);

    console.log(name.current.value);
    console.log(name.current.offsetHeight);
    console.log(age.current.value);
    console.log(age.current.offsetHeight);
  }

  // useReducer
  const [state, dispatch] = useReducer(reducer, 0);

  // useMemo 値をmemoryに保存（値をメモ化）
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // const square = () => {
  //   let i = 0;
  //   while(i < 200) {
  //     i++;
  //   }
  //   return count02 * count02;
  // }

  const square = useMemo(() => {
    let i = 0;
    while(i < 2000) {
      i++;
    }
    console.log("when count02 change only, useEffectFunction Call");
    return count02 * count02;
  }, [count02]); // count02値が変わったタイミングで実行する

  // useCallback callBackをmemoryに保存（関数をメモ化）
  const [counter, setCounter] = useState(0);
  // const showCount = () => {
  //   alert(`useCallBackFunction Call`);
  // }
  const showCount = useCallback(() => {
    alert(`useCallBackFunction Call`);
  }, [counter]);

  // Custom Hook
  const emailRef = useRef();
  const [email, setEmail] = useLocalStorage("email", "test@gmail.com");

  // useEffectの代わりにuseSWR利用 
  // npm i swr
  // データフェッチングやキャッシュ、エラーハンドリングを自動で行い、
  // フェッチ失敗時に自動でリトライする機能もある
  const searchIdRef = useRef();
  const [id, setId] = useState(2);

  const {data, error, isLoading} = useSWR(`https://jsonplaceholder.typicode.com/users/${id}`, fetcher);
  // const {data, error, isLoading} = useSWR('https://jsonplaceholder.typicode.com/posts/1', fetcher);

  // エラーハンドリング
  if (error) return <div>エラーが発生しました</div>;

  // データがまだない場合はローディング中
  if (!data || isLoading) return <div>ローディング中...</div>;

  return (
    <div className="App">
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <button onClick={resetClick}>reset</button>
      <p>{count}</p>

      <hr />
      <h1>useContext</h1>
      <p>{userInfo.name}</p>
      <p>{userInfo.age}</p>

      <hr />
      <h1>useRef</h1>
      <input type="text" ref={name}/>
      <input type="text" ref={age}/>
      <button onClick={handleRef}>Show</button>
      <p>Name : {nameVal}</p>
      <p>Age : {ageVal}</p>

      <hr />
      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({type: "increment"})}>+</button>
      <button onClick={() => dispatch({type: "decrement"})}>-</button>

      <hr />
      <h1>useMemo</h1>
      <div>カウント１：{count01}</div>
      <div>カウント２：{count02}</div>
      {/* <div>結果：{square()}</div> */}
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>Count01++</button>
      <button onClick={() => setCount02(count02 + 1)}>Count02++</button>

      <hr />
      <h1>useCallBack</h1>
      <SomeChild showCount={showCount}></SomeChild>

      <hr />
      <h1>Custom Hook</h1>
      <input type="text" ref={emailRef}/>
      <button onClick={() => setEmail(emailRef.current.value)}>emailを入力</button>
      <p>Email : {email}</p>

    <hr />
    <h1>useSWR</h1>
    <div>
      <input type="text" ref={searchIdRef}/>
      <button onClick={() => setId(searchIdRef.current.value)}>Search</button>
    </div>
    <div>
      <span>お名前：</span>
      <div>{data?.name}</div>
      <span>メールアドレス：</span>
      <div>{data?.email}</div>
    </div>
      
    </div>
  );
}

export default App
