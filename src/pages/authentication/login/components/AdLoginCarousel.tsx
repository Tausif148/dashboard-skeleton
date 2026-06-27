// AdCarouselSelectable.tsx
import {
    Box,
    // useMediaQuery,
    // useTheme
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

// sample images (replace with your assets)
import img1 from "src/assets/690411e95afc3866d6f969208ac5735b048098a2.png";
import img3 from "src/assets/7a46f5b9d6ca23f24917a6989c1856371b419504.jpg";
import img2 from "src/assets/hero.png";

const DEFAULT_ITEMS = [
    { id: 1, image: img1, title: "Premium Banner A" },
    { id: 2, image: img2, title: "Featured Advertisement" },
    { id: 3, image: img3, title: "Sponsored Placement" },
];

type Item = { id: number; image: string; title?: string };

export default function AdLoginCarousel({
    bg,
    items = DEFAULT_ITEMS,
    onSelect,
}: {
    bg: string
    items?: Item[];
    onSelect?: (item: Item) => void;
}) {
    // const theme = useTheme();
    // const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<"next" | "prev">("next");
    const [paused, setPaused] = useState(false);

    // touch swipe
    const touchStart = useRef<number | null>(null);
    const touchDelta = useRef(0);

    const n = items.length;

    useEffect(() => {
        const onVisibility = () => setPaused(document.hidden);
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    useEffect(() => {
        if (n <= 1) return;
        if (paused) return;
        const id = window.setInterval(() => {
            setDirection("next");
            setIndex((i) => (i + 1) % n);
        }, 3800);
        return () => clearInterval(id);
    }, [paused, n]);

    // reference direction to avoid unused variable warnings (kept for potential analytics)
    useEffect(() => {
        // no-op: intentionally reference 'direction'
        // console.debug && console.debug("ad-carousel-direction", direction);
    }, [direction]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                setDirection("prev");
                setIndex((i) => (i - 1 + n) % n);
            }
            if (e.key === "ArrowRight") {
                setDirection("next");
                setIndex((i) => (i + 1) % n);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [n]);

    const goPrev = () => {
        setDirection("prev");
        setIndex((i) => (i - 1 + n) % n);
    };
    const goNext = () => {
        setDirection("next");
        setIndex((i) => (i + 1) % n);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.touches[0].clientX;
        touchDelta.current = 0;
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStart.current == null) return;
        touchDelta.current = e.touches[0].clientX - touchStart.current;
    };
    const handleTouchEnd = () => {
        const threshold = 50;
        if (touchDelta.current > threshold) goPrev();
        else if (touchDelta.current < -threshold) goNext();
        touchStart.current = null;
        touchDelta.current = 0;
    };

    // indices for visible cards
    // const leftIndex = (index - 1 + n) % n;
    // const rightIndex = (index + 1) % n;

    // accessible selection helpers
    const selectIndex = (i: number) => {
        setDirection(i > index ? "next" : "prev");
        setIndex(i);
    };

    // tokens
    const dotActive = "#b99f78";
    const dotIdle = "rgba(0,0,0,0.12)";

    return (
        <Box
            component="section"
            sx={{
                bgcolor: bg,
                py: { xs: 6, md: 8 },
                px: { xs: 3, md: 6 },
                position: "relative",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            {/* header text */}
                <Box mb={6.5}> {/* BOX 2 */}
                    {/* You can put any content you want here */}
                </Box>


            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: { xs: 2, md: 4 },
                        minHeight: 400,
                    }}
                >
                    {/* Single full-width slide */}
                    <SelectableCard
                        item={items[index]}
                        isCenter={true}
                        onClick={() => onSelect?.(items[index])}
                        onKeyActivate={() => onSelect?.(items[index])}
                        ariaHidden={false}
                        ariaCurrent={true}
                    />
                </Box>
            </Box>

            {/* dots */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}>
                {items.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => selectIndex(i)}
                        sx={{
                            width: i === index ? 40 : 24,
                            height: 6,
                            borderRadius: 6,
                            background: i === index ? dotActive : dotIdle,
                            transition: "all 300ms ease",
                            cursor: "pointer",
                        }}
                        role="button"
                        aria-label={`Go to slide ${i + 1}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") selectIndex(i);
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}

/** SelectableCard: focusable, clickable card
 * - onClick: invoked on pointer click
 * - onKeyActivate: invoked when user presses Enter/Space while focused
 */
function SelectableCard({
    item,
    // isCenter,
    onClick,
    onKeyActivate,
    ariaHidden,
    ariaCurrent,
}: {
    item: Item;
    isCenter: boolean;
    onClick?: () => void;
    onKeyActivate?: () => void;
    ariaHidden?: boolean;
    ariaCurrent?: boolean;
}) {
    // const center = !!isCenter;
    const zIndex = 20;
    const width = "100%";
    const height = 400;

    return (
        <Box
            role="button"
            tabIndex={0}
            aria-hidden={ariaHidden ? "true" : "false"}
            aria-current={ariaCurrent ? "true" : undefined}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onKeyActivate?.();
                }
            }}
                sx={{
                width,
                minWidth: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
                transition: "transform 650ms cubic-bezier(.22,.9,.2,1), box-shadow 400ms ease, opacity 500ms ease",
                transform: `translateY(-6px)`,
                boxShadow: "0 18px 50px rgba(34,31,36,0.12)",
                opacity: 1,
                zIndex,
                background: "#fff",
                display: "block",
                cursor: "pointer",
                borderRadius:2,
                outline: "none",
                "&:focus": {
                    boxShadow: "0 0 0 4px rgba(185,159,120,0.16)",
                },
            }}
        >
                <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                        width: "100%",
                        height,
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 900ms cubic-bezier(.22,.9,.2,1)",
                        transform: "scale(1.02)",
                        userSelect: "none",
                        pointerEvents: "none", // ensure clicks bubble to container
                    }}
                />

            {/* <Box sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
            </Box> */}
        </Box>
    );
}
