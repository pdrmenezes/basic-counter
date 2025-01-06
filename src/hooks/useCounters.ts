import { useState } from "react";

interface Counter {
  id: string;
  name: string;
  value: number;
  subCounters: Counter[];
}

export function useCounters() {
  const [counters, setCounters] = useState<Counter[]>([]);

  const addCounter = (
    parentId: string | null = null,
    name: string = "New Counter"
  ) => {
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
  };

  const incrementCounter = (id: string) => {
    setCounters(
      updateCounters(counters, id, (counter) => ({
        ...counter,
        value: counter.value + 1,
      }))
    );
  };

  const decrementCounter = (id: string) => {
    setCounters(
      updateCounters(counters, id, (counter) => ({
        ...counter,
        value: Math.max(0, counter.value - 1),
      }))
    );
  };

  const updateCounterName = (id: string, name: string) => {
    setCounters(
      updateCounters(counters, id, (counter) => ({
        ...counter,
        name,
      }))
    );
  };

  const updateCounters = (
    counters: Counter[],
    id: string,
    updateFn: (counter: Counter) => Counter
  ): Counter[] => {
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
  };

  return {
    counters,
    addCounter,
    incrementCounter,
    decrementCounter,
    updateCounterName,
  };
}
