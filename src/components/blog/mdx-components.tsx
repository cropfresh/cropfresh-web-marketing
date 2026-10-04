import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type MdxImageProps = Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt"> & {
    src: string;
    alt?: string;
};

export const mdxComponents = {
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2" {...props} />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
        <h3 className="text-xl font-semibold text-green-400 mt-8 mb-3" {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
        <p className="text-slate-300 leading-relaxed mb-4" {...props} />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
        <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
        <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-1" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
        <blockquote className="border-l-4 border-green-400 pl-4 italic text-slate-400 my-6 bg-white/5 py-3 rounded-r-lg" {...props} />
    ),
    code: (props: ComponentPropsWithoutRef<"code">) => (
        <code className="bg-slate-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    img: ({ src, alt, ...props }: MdxImageProps) => (
        <Image src={src} alt={alt || ""} width={800} height={450} className="rounded-xl my-6 w-full object-cover shadow-lg border border-white/10" {...props} />
    ),
};
