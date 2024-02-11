'use strict';
import data from './data.json' assert {type: 'json'};

// Имитация задержки получения данных
export const fetchData = async () => {
  return new Promise((req, rej) => {
    setTimeout(() => req(data), Math.random() * 2000);
  });
};
