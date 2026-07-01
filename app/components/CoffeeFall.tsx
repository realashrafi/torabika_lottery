'use client'
import React, { useEffect, useRef } from 'react';

export interface CoffeeFallProps {
    className?: string;
    // آرایه‌ای از مسیر تصاویر قهوه (مثلاً ['/coffee-bean1.png', '/coffee-bean2.png'])
    images?: string[];
    paused?: boolean;
    speed?: number;       // سرعت کلی بارش
    density?: number;     // تعداد دانه‌ها (تراکم)
    minScale?: number;    // حداقل اندازه دانه‌ها (مثلا 0.2)
    maxScale?: number;    // حداکثر اندازه دانه‌ها (مثلا 0.8)
    opacity?: number;     // شفافیت کلی
    mouseInteraction?: boolean;
    mouseStrength?: number;
    mouseRadius?: number;
}

interface Particle {
    x: number;
    y: number;
    image: HTMLImageElement;
    scale: number;
    speedY: number;
    speedX: number;
    rotation: number;
    rotationSpeed: number;
    width: number;
    height: number;
}

const CoffeeFall: React.FC<CoffeeFallProps> = ({
                                                   className,
                                                   images = ['head.png', 'Logo.png', 'flip7.png'],
                                                   paused = false,
                                                   speed = 0.5,
                                                   density = 40,
                                                   minScale = 0.15,
                                                   maxScale = 0.5,
                                                   opacity = 1,
                                                   mouseInteraction = true,
                                                   mouseStrength = 0.5,
                                                   mouseRadius = 150
                                               }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
    const loadedImagesRef = useRef<HTMLImageElement[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    // پیش‌بارگذاری (Preload) تصاویر
    useEffect(() => {
        let isMounted = true;
        const loaded: HTMLImageElement[] = [];
        let loadedCount = 0;

        if (images.length === 0) return;

        images.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                if (!isMounted) return;
                loaded.push(img);
                loadedCount++;
                if (loadedCount === images.length) {
                    loadedImagesRef.current = loaded;
                    initParticles();
                }
            };
        });

        return () => {
            isMounted = false;
        };
    }, [images]);

    // مقداردهی اولیه ذرات قهوه
    const initParticles = () => {
        const canvas = canvasRef.current;
        const loadedImgs = loadedImagesRef.current;
        if (!canvas || loadedImgs.length === 0) return;

        const count = density;
        const newParticles: Particle[] = [];

        for (let i = 0; i < count; i++) {
            const img = loadedImgs[Math.floor(Math.random() * loadedImgs.length)];
            const scale = Math.random() * (maxScale - minScale) + minScale;

            // عرض و طول واقعی تصویر ضرب در مقیاس
            const width = img.naturalWidth * scale/4;
            const height = img.naturalHeight * scale/4;

            newParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height, // شروع از بالای صفحه
                image: img,
                scale,
                width,
                height,
                speedY: (Math.random() * 2 + 1) * speed,
                speedX: (Math.random() * 1 - 0.5) * speed,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() * 2 - 1) * 0.5
            });
        }
        particlesRef.current = newParticles;
    };

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // تنظیم اندازه Canvas بر اساس ابعاد Container
        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            initParticles();
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);

        // ثبت موقعیت ماوس برای تعامل
        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const onMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        if (mouseInteraction) {
            window.addEventListener('mousemove', onMouseMove);
            container.addEventListener('mouseleave', onMouseLeave);
        }

        // حلقه اصلی انیمیشن
        const render = () => {
            if (paused) {
                animationFrameRef.current = requestAnimationFrame(render);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = opacity;

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            particles.forEach((p) => {
                // افکت تعامل با ماوس (راندن دانه‌ها به اطراف)
                if (mouseInteraction) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouseRadius) {
                        const force = (mouseRadius - dist) / mouseRadius;
                        // حرکت دادن آرام دانه قهوه به سمتی مخالف ماوس
                        p.x += (dx / dist) * force * 10 * mouseStrength;
                        p.y += (dy / dist) * force * 5 * mouseStrength;
                    }
                }

                // حرکت به پایین و کمی حرکت نوسانی به چپ و راست
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;

                // اگر دانه قهوه از پایین صفحه خارج شد، آن را به بالای صفحه برگردان
                if (p.y > canvas.height + p.height) {
                    p.y = -p.height;
                    p.x = Math.random() * canvas.width;
                    p.speedY = (Math.random() * 2 + 1) * speed;
                }
                // اگر از چپ و راست خارج شد، از سمت مخالف وارد شود
                if (p.x > canvas.width + p.width) p.x = -p.width;
                else if (p.x < -p.width) p.x = canvas.width;

                // رسم تصویر با در نظر گرفتن موقعیت، چرخش و مقیاس
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.drawImage(p.image, -p.width / 2, -p.height / 2, p.width, p.height);
                ctx.restore();
            });

            animationFrameRef.current = requestAnimationFrame(render);
        };

        animationFrameRef.current = requestAnimationFrame(render);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', onMouseMove);
            if (container) {
                container.removeEventListener('mouseleave', onMouseLeave);
            }
        };
    }, [paused, speed, density, minScale, maxScale, opacity, mouseInteraction, mouseStrength, mouseRadius]);

    return (
        <div ref={containerRef} className={`w-full h-full overflow-hidden relative ${className ?? ''}`}>
            <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
        </div>
    );
};

export default CoffeeFall;
