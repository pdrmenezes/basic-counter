"use client";

import { FormEvent, useEffect, useRef } from "react";
import { Counter } from "./components/counter";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useCounters } from "./hooks/useCounters";

export default function Home() {
  const {
    counters,
    setCounters,
    addCounter,
    deleteCounter,
    incrementCounter,
    decrementCounter,
    updateCounterName,
    getCountersFromLocalStorage,
  } = useCounters();

  const formRef = useRef<HTMLFormElement | null>(null);
  const counterNameRef = useRef<HTMLInputElement | null>(null);

  const handleAddCounter = (e: FormEvent) => {
    e.preventDefault();
    addCounter(null, counterNameRef.current?.value || "New Counter");

    formRef.current?.reset();
  };

  useEffect(() => {
    const storedCounters = getCountersFromLocalStorage();
    setCounters(storedCounters);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-center font-display sm:text-3xl font-bold mb-6">
          Counter++
        </h1>
        <form
          onSubmit={handleAddCounter}
          ref={formRef}
          className="mb-4 flex space-x-2"
        >
          <Input
            type="text"
            ref={counterNameRef}
            placeholder="Enter counter name"
            className="flex-grow bg-neutral-800 text-white border-neutral-700"
          />
          <Button
            type="submit"
            className="bg-lime-500 hover:bg-lime-400 text-neutral-900"
          >
            Add New Counter
          </Button>
        </form>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            {...counter}
            isSubcounter={false}
            incrementCounter={incrementCounter}
            decrementCounter={decrementCounter}
            addCounter={addCounter}
            deleteCounter={deleteCounter}
            updateCounterName={updateCounterName}
          />
        ))}
      </div>
    </main>
  );
}
