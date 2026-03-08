import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function BlogPostContent({ children }: { children: ReactNode }) {
    return (
        <Container className="max-w-4xl py-12">
            <div className="prose prose-invert prose-green max-w-none">
                {children}
            </div>
        </Container>
    );
}
