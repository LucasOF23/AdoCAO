import React from "react";

export type TagContainerProps = {
  text: string;
  color_class: string;
};

export default function TagContainer({ text, color_class }: TagContainerProps) {
  return <span className={`${color_class} p-1 m-1 rounded`}>{text}</span>;
}
