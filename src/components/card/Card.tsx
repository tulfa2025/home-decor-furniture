import styles from "./Card.module.scss";
import Image from 'next/image'
import { StaticImageData } from "next/image";

type CardProps = {
    heading: string;
    date: string;
    paragraph: string;
    imageData: StaticImageData

}

export default function Card({ heading, date, paragraph, imageData }: CardProps) {
    return (
        <section className={styles.card_container}>
            <Image
                src={imageData}
                alt={heading}
                className={styles.card_image}
            />
            <div className={styles.card_header}>
                <h5 className={styles.card_header_heading}>
                    {heading}
                </h5>
                <div className={styles.card_header_date}>
                    <div className={styles.card_header_date_icon} />
                    <span className={styles.card_header_date_written}>
                        {date}
                    </span>
                </div>
            </div>
            <p className={styles.card_paragraph}>
                {paragraph}
            </p>
        </section>
    );
}
