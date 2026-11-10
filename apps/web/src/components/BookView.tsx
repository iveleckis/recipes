import type { ReactNode } from "react";

type Props = {
  leftPage: ReactNode;
  rightPage: ReactNode;
  isRightPageActive: boolean;
};

export default function BookView({ leftPage, rightPage, isRightPageActive }: Props) {
  return (
    <div className="recipe-book" data-active-page={isRightPageActive ? "right" : "left"}>
      <aside className="book-index">{leftPage}</aside>
      <section className="book-page" aria-label="Recipe">{rightPage}</section>
    </div>
  );
}
