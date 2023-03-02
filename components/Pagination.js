import Link from "next/link";
import pageStyles from "../components/page.module.css";

export const Pagination = ({ totalCount }) => {
    const PER_PAGE = 9;

    const range = (start, end) => 
    [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <ul className={pageStyles.pageWrapper}>
            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                <li key={index}>
                    <Link href={`/posts/page/${number}`}>{number}</Link>
                </li>
            ))}
        </ul>
    )
}