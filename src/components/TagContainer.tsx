import React from "react";

export type TagContainerProps = {
  text: string;
  className: string;
};

export default function TagContainer({ text, className }: TagContainerProps) {
  return <a className={`${className} p-1 m-1 rounded`} href="#">{text}</a>;
}
