import type { ReactNode } from "react";

type Props = {
  leftPage: ReactNode;
  rightPage: ReactNode;
};

export default function BookView({ leftPage, rightPage }: Props) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid lightgrey",
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
        display: "flex",
      }}
    >
      <div
        style={{
          borderRight: "1px solid lightgrey",
          padding: "24px 20px",
          backgroundColor: "rgb(255, 246, 235)",
          flex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            borderBottom: "1px solid lightgrey",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <p>1</p>
        </div>
        <div style={{ paddingTop: "24px" }}>{leftPage}</div>
      </div>
      <div
        style={{
          padding: "24px 20px",
          backgroundColor: "rgb(255, 246, 230)",
          boxShadow: "inset 30px 0px 35px -45px rgb(0, 0, 0)",
          flex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            borderBottom: "1px solid lightgrey",
            display: "flex",
          }}
        >
          <p>2</p>
        </div>
        <div style={{ paddingTop: "24px" }}>{rightPage}</div>
      </div>
    </div>
  );
}
