import { useState } from "react";

interface Counter {
  id: string;
  name: string;
  value: number;
  subCounters: Counter[];
}

const COUNTERS_KEY = "basic-counter-counters";

export function useCounters() {
  const [counters, setCounters] = useState<Counter[]>([]);

  function getCountersFromLocalStorage() {
    const data = localStorage.getItem(COUNTERS_KEY);
    const parsedData: { counters: Counter[] } = data
      ? JSON.parse(data)
      : { counters: [] };

    return parsedData.counters;
  }

  function updateCountersOnLocalStorage(newData: Counter[]) {
    localStorage.setItem(COUNTERS_KEY, JSON.stringify({ counters: newData }));
  }

  function addCounter(
    parentId: string | null = null,
    name: string = "New Counter"
  ) {
    const newCounter: Counter = {
      id: Date.now().toString(),
      name,
      value: 0,
      subCounters: [],
    };

    if (parentId === null) {
      const newCounters = [...counters, newCounter];
      setCounters(newCounters);
      updateCountersOnLocalStorage(newCounters);
    } else {
      const updatedCounters = updateCounters(counters, parentId, (counter) => ({
        ...counter,
        subCounters: [...counter.subCounters, newCounter],
      }));
      setCounters(updatedCounters);
      updateCountersOnLocalStorage(updatedCounters);
    }
  }

  function deleteCounter(id: string) {
    const deleteFromCounters = (counters: Counter[]): Counter[] => {
      return counters.filter((counter) => {
        if (counter.id === id) {
          return false;
        }
        if (counter.subCounters.length > 0) {
          counter.subCounters = deleteFromCounters(counter.subCounters);
        }
        return true;
      });
    };

    const newCounters = deleteFromCounters(counters);

    setCounters(newCounters);

    updateCountersOnLocalStorage(newCounters);
  }

  function incrementCounter(id: string) {
    const newCounters = updateCounters(counters, id, (counter) => ({
      ...counter,
      value: counter.value + 1,
    }));
    setCounters(newCounters);
    updateCountersOnLocalStorage(newCounters);
  }

  function decrementCounter(id: string) {
    const newCounters = updateCounters(counters, id, (counter) => ({
      ...counter,
      value: Math.max(0, counter.value - 1),
    }));
    setCounters(newCounters);
    updateCountersOnLocalStorage(newCounters);
  }

  function updateCounterName(id: string, name: string) {
    const newCounters = updateCounters(counters, id, (counter) => ({
      ...counter,
      name,
    }));
    setCounters(newCounters);
    updateCountersOnLocalStorage(newCounters);
  }

  function updateCounters(
    counters: Counter[],
    id: string,
    updateFn: (counter: Counter) => Counter
  ): Counter[] {
    return counters.map((counter) => {
      if (counter.id === id) {
        return updateFn(counter);
      }
      if (counter.subCounters.length > 0) {
        return {
          ...counter,
          subCounters: updateCounters(counter.subCounters, id, updateFn),
        };
      }
      return counter;
    });
  }

  return {
    counters,
    setCounters,
    addCounter,
    deleteCounter,
    incrementCounter,
    decrementCounter,
    updateCounterName,
    getCountersFromLocalStorage,
  };
}
