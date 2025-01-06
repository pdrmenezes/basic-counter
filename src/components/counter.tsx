"use client";

import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import {
  MinusCircle,
  PlusCircle,
  Edit2,
  ChevronDown,
  Check,
} from "lucide-react";

interface CounterProps {
  id: string;
  name: string;
  value: number;
  subCounters: any[];
  incrementCounter: (id: string) => void;
  decrementCounter: (id: string) => void;
  addCounter: (parentId: string, name: string) => void;
  updateCounterName: (id: string, name: string) => void;
}

export function Counter({
  id,
  name,
  value,
  subCounters,
  incrementCounter,
  decrementCounter,
  addCounter,
  updateCounterName,
}: CounterProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateCounterName(id, newName);
    setIsEditing(false);
  };

  return (
    <div className="border border-neutral-700 rounded-lg p-4 mb-4 bg-neutral-800">
      <div className="flex items-center justify-between mb-2">
        {isEditing ? (
          <form
            id="counter-name"
            onSubmit={handleNameSubmit}
            className="flex-1 mr-2"
          >
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-neutral-700 text-white"
              autoFocus
            />
          </form>
        ) : (
          <span className="text-lg font-semibold text-white">
            {name}: {value}
          </span>
        )}
        <div className="space-x-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => decrementCounter(id)}
            className="bg-neutral-700 text-white hover:bg-neutral-600"
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => incrementCounter(id)}
            className="bg-neutral-700 text-white hover:bg-neutral-600"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={
              isEditing ? handleNameSubmit : () => setIsEditing(!isEditing)
            }
            className="bg-neutral-700 text-white hover:bg-neutral-600"
          >
            {isEditing ? (
              <Check className="h-4 w-4" />
            ) : (
              <Edit2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => addCounter(id, "New Sub-Counter")}
            className="bg-neutral-700 text-white hover:bg-neutral-600"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {subCounters.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={id} className="border-neutral-700">
            <AccordionTrigger className="text-white hover:text-neutral-300">
              Sub-counters
            </AccordionTrigger>
            <AccordionContent>
              {subCounters.map((subCounter) => (
                <Counter
                  key={subCounter.id}
                  {...subCounter}
                  incrementCounter={incrementCounter}
                  decrementCounter={decrementCounter}
                  addCounter={addCounter}
                  updateCounterName={updateCounterName}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
