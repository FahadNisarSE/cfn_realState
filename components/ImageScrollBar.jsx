import { useState } from "react";
import Image from "next/image";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import style from "../styles/DetailProperty.module.css";

export default function ImageScrollBar({ data }) {
  const [source] = useState(data);
  const [image, setImage] = useState(0);

  const handlePrevClick = () => {
    setImage((prev) => (prev === 0 ? source.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setImage((prev) => (prev === source.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id={style.imageScroller}>
      <div className={style.Arrow} onClick={handlePrevClick}>
        <AiOutlineLeft />
      </div>
      <div key={source[image].id}>
        <Image
          alt="property"
          placeholder="blur"
          className={style.image}
          blurDataURL={source[image].url}
          src={source[image].url}
          width={1200}
          height={600}
        />
      </div>
      <div className={style.Arrow} onClick={handleNextClick}>
        <AiOutlineRight />
      </div>
    </section>
  );
}
