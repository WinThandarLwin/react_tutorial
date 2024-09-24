import React, { useEffect, useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const jsonVal = window.localStorage.getItem(key);
        if (jsonVal !== null) return JSON.parse(jsonVal); // jsonから普通の値に解析

        return defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
        console.log("useLocalStorage > useEffect");
    }, [value, setValue]);　// 値が変わった時、つまり、ボタンがクリックする時のみ

    return [value, setValue];
};

export default useLocalStorage;