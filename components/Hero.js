import Image from "next/image"
import heroStyles from "../components/hero.module.css";

export default function Hero() {
    return (
        <div className={heroStyles.hero}>
            <Image src="/images/home_bg.jpg" layout="fill" objectFit="cover"></Image>
            <div className={heroStyles.heroContainer}>
                <h2>This is HERO section</h2>
                <a href="" target="_blank" className={heroStyles.btn}>Visit</a>
            </div>
        </div>
    )
}