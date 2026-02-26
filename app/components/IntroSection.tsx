import Image from 'next/image';
import { CONTENT } from '../constants/content';

export const IntroSection = () => {
    return (
        <section className="intro-section">
            <div className="logo-container">
                <Image
                    src="https://octopussignage.com/wp-content/uploads/2025/01/octopus-favicon.svg"
                    alt={CONTENT.common.logoAlt}
                    width={40}
                    height={40}
                    className="logo-icon"
                />
                <span>OCTOPUS</span>
            </div>

            <div className="illustration-box">
                <Image
                    src="/assets/illustration.png"
                    alt={CONTENT.common.illustrationAlt}
                    width={600}
                    height={600}
                    priority
                />
            </div>

            <div className="intro-content">
                <h1>{CONTENT.intro.heading}</h1>
                <p>{CONTENT.intro.description}</p>
            </div>
        </section>
    );
};
