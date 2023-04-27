import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost({ cols, pad, mar, bgcolor }) {
  return (
    <div style={{padding:pad, margin:mar, backroundColor:bgcolor}}>
      {cols}
    </div>
  );
}
