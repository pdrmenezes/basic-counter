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
    const parsedData: { counters: Counter[] } = data ? JSON.parse(data) : {};

    return parsedData.counters;
  }
  function updateCountersOnLocalStorage() {
    localStorage.setItem(COUNTERS_KEY, JSON.stringify({ counters }));
    console.log("updated storage:", getCountersFromLocalStorage());
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
      setCounters([...counters, newCounter]);
    } else {
      setCounters(
        updateCounters(counters, parentId, (counter) => ({
          ...counter,
          subCounters: [...counter.subCounters, newCounter],
        }))
      );
    }
    updateCountersOnLocalStorage();
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

    setCounters(deleteFromCounters(counters));

    updateCountersOnLocalStorage();
  }

  function incrementCounter(id: string) {
    setCounters(
      updateCounters(counters, id, (counter) => ({
        ...counter,
        value: counter.value + 1,
      }))
    );
    updateCountersOnLocalStorage();
  }

  function decrementCounter(id: string) {
    setCounters(
      updateCounters(counters, id, (counter) => ({
        ...counter,
        value: Math.max(0, counter.value - 1),
      }))
    );
    updateCountersOnLocalStorage();
  }

  function updateCounterName(id: string, name: string) {
    setCounters(
      updateCounters(counters, id, (counter) => ({
        ...counter,
        name,
      }))
    );
    updateCountersOnLocalStorage();
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
