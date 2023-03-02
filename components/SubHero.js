import Image from "next/image"
import subheroStyles from "../components/subhero.module.css";

export default function Hero() {
    return (
        <div className={subheroStyles.hero}>
            <Image src="/images/blog_bg.jpg" layout="fill" objectFit="cover"></Image>
            <h2>BLOG</h2>
        </div>
    )
}