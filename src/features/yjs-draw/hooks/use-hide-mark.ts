import { useEffect } from "react";

export const useHideMark = () => {
    useEffect(() => {
        const id = setTimeout(() => {
            const mark = document.querySelector(
                ".tl-watermark_SEE-LICENSE",
            ) as HTMLDivElement;

            if (mark) {
                mark.style.display = "none";
            }
        }, 50);
        return () => {
            clearTimeout(id);
        };
    });
};
