import type { ReactNode } from "react";

type Props = {
  leftPage: ReactNode;
  rightPage: ReactNode;
};

export default function BookView({ leftPage, rightPage }: Props) {
  return (
    <>
      <div>{leftPage}</div>
      <div>{rightPage}</div>
    </>
  );
}
