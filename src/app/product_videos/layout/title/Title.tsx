import styles from "./Title.module.scss";
export default function Title() {
    return (
        <section className={styles.title_container}>
            <h1 className={styles.title_heading}>
                Product Videos
            </h1>
            <span className={styles.title_span}>
                Lorem Ipsum dolor
            </span>
        </section>
    )
}