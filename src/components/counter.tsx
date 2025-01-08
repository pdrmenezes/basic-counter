"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  Check,
  ChevronRight,
  MinusCircle,
  Plus,
  PlusCircle,
  Trash,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface CounterProps {
  id: string;
  name: string;
  value: number;
  subCounters: any[];
  isSubcounter: boolean;
  incrementCounter: (id: string) => void;
  decrementCounter: (id: string) => void;
  addCounter: (parentId: string, name: string) => void;
  deleteCounter: (id: string) => void;
  updateCounterName: (id: string, name: string) => void;
}

export function Counter({
  id,
  name,
  value,
  subCounters,
  isSubcounter,
  incrementCounter,
  decrementCounter,
  addCounter,
  deleteCounter,
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
    <div
      className={`rounded-lg  bg-neutral-800 ${
        !isSubcounter ? "border mb-4 border-neutral-700 p-4" : "p-2"
      } `}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={id}>
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            <div className="inline-flex items-center gap-2">
              <AccordionTrigger
                className={`text-white flex items-center gap-2 group ${
                  subCounters.length === 0 && "pointer-events-none"
                }`}
              >
                <ChevronRight
                  className={`${
                    subCounters.length === 0 && "invisible pointer-events-none"
                  } group-data-[state=open]:rotate-90 group-hover:text-lime-500 size-4 transition-transform`}
                />
              </AccordionTrigger>
              {!isEditing ? (
                <>
                  <span
                    onClick={() => setIsEditing(true)}
                    className="text-left text-sm sm:text-base md:text-lg font-semibold"
                  >
                    {name}
                  </span>
                  {subCounters.length > 0 && (
                    <span className="text-sm sm:text-base text-neutral-400">
                      ({subCounters.length})
                    </span>
                  )}
                </>
              ) : (
                <>
                  <form onSubmit={handleNameSubmit} className="flex-1">
                    <Input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="bg-neutral-700 h-8 sm:h-10 text-xs sm:text-base"
                      autoFocus
                    />
                  </form>
                  <Button
                    size="icon"
                    variant="icon"
                    className="hover:text-lime-500"
                    onClick={handleNameSubmit}
                  >
                    <Check />
                  </Button>
                </>
              )}
            </div>

            <div className="space-x-2.5 sm:space-x-4 inline-flex items-center flex-shrink-0">
              <div className="space-x-1 sm:space-x-2 inline-flex items-center">
                <Button
                  size="icon"
                  variant="icon"
                  className="hover:text-lime-500"
                  onClick={() => incrementCounter(id)}
                >
                  <PlusCircle />
                </Button>
                <span className="text-sm sm:text-base md:text-lg font-semibold ">
                  {value}
                </span>
                <Button
                  size="icon"
                  variant="icon"
                  className="hover:text-lime-500"
                  onClick={() => decrementCounter(id)}
                >
                  <MinusCircle />
                </Button>
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => deleteCounter(id)}
                className="bg-neutral-700 hover:bg-neutral-600 hover:text-lime-500"
                title="Delete Counter"
              >
                <Trash className="size-4" />
              </Button>
            </div>
          </div>
          <Button
            variant="unstyled"
            size="unstyled"
            className="text-neutral-500 hover:text-lime-500 mb-4 text-xs sm:text-sm pl-4 py-1"
            onClick={() => addCounter(id, "New Sub-Counter")}
            title="Create Sub-Counter"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Sub-Counter
          </Button>

          <AccordionContent>
            <hr className=" border-neutral-600 mb-2" />
            {subCounters.map((subCounter) => (
              <Counter
                key={subCounter.id}
                {...subCounter}
                isSubcounter={true}
                incrementCounter={incrementCounter}
                decrementCounter={decrementCounter}
                addCounter={addCounter}
                deleteCounter={deleteCounter}
                updateCounterName={updateCounterName}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
