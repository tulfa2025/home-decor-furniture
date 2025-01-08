import Button from "../button/Button";
import styles from "./Visual.module.scss";

type VisualProps = {
    path: string;
}

export default function Visual({ path }: VisualProps) {
    return (
        <section className={styles.visual_container}>
            <video className={styles.visual_video} preload="auto">
                <source src={path} type="video/mp4" />
            </video>
            <div className={styles.visual_content}>
                <h3 className={styles.visual_content_left}>
                    Lorem ipsum dolor sit amet.
                </h3>
                <div className={styles.visual_content_right}>
                    <p className={styles.visual_content_right_text}>
                        Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem.
                        Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. Bibendum faucibus
                        id elementum risus. Pretium nunc accumsan fringilla nibh vitae feugiat mattis nunc viverra. Lorem fringilla
                        turpis risus mauris faucibus. Integer senectus congue nullam est. Dictum.
                    </p>
                    <Button />
                </div>
            </div>
        </section>
    )
}