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
  Pencil,
  PlusCircle,
  Trash,
  WrapText,
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
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="inline-flex items-center gap-2">
              <AccordionTrigger
                className={`text-white flex items-center gap-2 group ${
                  subCounters.length === 0 && "pointer-events-none"
                }`}
              >
                {subCounters.length > 0 && (
                  <ChevronRight className="group-data-[state=open]:rotate-90 group-hover:text-neutral-300 size-4 transition-transform" />
                )}
                {!isEditing && (
                  <>
                    <span className="text-lg font-semibold text-white">
                      {name}
                    </span>
                    {subCounters.length > 0 && (
                      <span className="text-neutral-400">
                        ({subCounters.length})
                      </span>
                    )}
                  </>
                )}
              </AccordionTrigger>
              {isEditing && (
                <form onSubmit={handleNameSubmit} className="flex-1">
                  <Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-neutral-700 text-white"
                    autoFocus
                  />
                </form>
              )}

              {isEditing ? (
                <Button
                  size="icon"
                  variant="unstyled"
                  className="hover:text-lime-500"
                  onClick={handleNameSubmit}
                >
                  <Check />
                </Button>
              ) : (
                <Button
                  size="icon"
                  variant="unstyled"
                  className="hover:text-lime-500"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Pencil className="p-0.5" />
                </Button>
              )}
            </div>

            <div className="space-x-4  inline-flex items-center">
              <div className="space-x-2.5 inline-flex items-center">
                <Button
                  size="icon"
                  variant="unstyled"
                  className="hover:text-lime-500"
                  onClick={() => incrementCounter(id)}
                >
                  <PlusCircle />
                </Button>
                <span className="text-lg font-semibold text-white">
                  {value}
                </span>
                <Button
                  size="icon"
                  variant="unstyled"
                  className="hover:text-lime-500"
                  onClick={() => decrementCounter(id)}
                >
                  <MinusCircle />
                </Button>
              </div>
              <div className="space-x-2.5">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => addCounter(id, "New Sub-Counter")}
                  className="bg-neutral-700 text-white hover:bg-neutral-600 hover:text-lime-500"
                  title="Create Sub-Counter"
                >
                  <WrapText className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => deleteCounter(id)}
                  className="bg-neutral-700 text-white hover:bg-neutral-600 hover:text-lime-500"
                  title="Delete Counter"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
          </div>

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
