import Image from "next/image";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex justify-center">
      <Image src={"/logo.png"} alt="logo" width={120} height={120} />
    </div>
  );
};

export default Logo;
