import { cn } from "@/lib/utils";
import { DogGender } from "@/types/dog";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function renderGender(gender: DogGender) {
  switch (gender) {
  case "female":
    return faVenus;
  case "male":
    return faMars;
  }
}

function renderColor(gender: DogGender) {
  switch (gender) {
  case "female":
    return "text-red-500";
  case "male":
    return "text-blue-500";
  }
}

type GenderIconProps = {
  gender: DogGender;
  className?: string;
};

export default function GenderIcon({ gender, className }: GenderIconProps) {
  return (
    <FontAwesomeIcon
      className={cn("mt-[0.1rem] h-[1.5rem]", renderColor(gender), className)}
      icon={renderGender(gender)}
    />
  );
}
