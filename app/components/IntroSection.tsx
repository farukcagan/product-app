import Image from 'next/image';
import { CONTENT } from '../constants/content';

export const IntroSection = () => {
    return (
        <section className="flex flex-1 flex-col bg-brand-bg-light px-10 py-[60px] text-center lg:items-start lg:bg-brand-bg-light lg:px-20 lg:py-10 lg:text-left">
            <div className="flex items-center gap-3 text-[28px] font-extrabold tracking-[-1px] text-brand-secondary">
                <Image
                    src="/assets/header-logo.png"
                    alt={CONTENT.common.logoAlt}
                    width={234}
                    height={46}
                />
            </div>

            <div className="flex flex-1 flex-col justify-center gap-8 lg:gap-12">
                <div className="mx-auto flex max-w-[750px] items-center justify-center">
                    <Image
                        src="/assets/illustration2.png"
                        alt={CONTENT.common.illustrationAlt}
                        width={1200}
                        height={1200}
                        priority
                        className="h-auto w-full object-contain"
                    />
                </div>

                <div>
                    <h1 className="mb-6 text-[32px] font-bold leading-[1.1] text-brand-secondary">{CONTENT.intro.heading}</h1>
                    <p className="mx-auto max-w-[600px] text-[16px] leading-[1.6] text-brand-text-muted lg:mx-0">{CONTENT.intro.description}</p>
                </div>
            </div>
        </section>
    );
};
