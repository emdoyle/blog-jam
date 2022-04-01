import Link from "next/link";

export const BackHomeBar = () => {
  return (
    <div className="back-home-bar">
      <Link href="/">
        <a>&#8592; Home</a>
      </Link>
    </div>
  );
};
