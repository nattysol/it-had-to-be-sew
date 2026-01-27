(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/it-had-to-be-sew/store/useOrderStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOrderStore",
    ()=>useOrderStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/it-had-to-be-sew/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useOrderStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        step: 1,
        dimensions: {
            width: 0,
            height: 0
        },
        selectedPattern: null,
        selectedBatting: null,
        services: {
            binding: false,
            trimming: false
        },
        estimatedTotal: 0,
        setStep: (step)=>set({
                step
            }),
        nextStep: ()=>set((state)=>({
                    step: state.step + 1
                })),
        prevStep: ()=>set((state)=>({
                    step: Math.max(1, state.step - 1)
                })),
        setDimensions: (width, height)=>{
            set({
                dimensions: {
                    width,
                    height
                }
            });
            calculateTotal(set, get);
        },
        selectPattern: (pattern)=>{
            set({
                selectedPattern: pattern
            });
            calculateTotal(set, get);
        },
        selectBatting: (batting)=>{
            set({
                selectedBatting: batting
            });
            calculateTotal(set, get);
        },
        toggleService: (service)=>{
            set((state)=>({
                    services: {
                        ...state.services,
                        [service]: !state.services[service]
                    }
                }));
            calculateTotal(set, get);
        }
    }));
// Helper to calculate total price
const calculateTotal = (set, get)=>{
    const s = get();
    const area = s.dimensions.width * s.dimensions.height;
    // 1. Pattern Cost (Default to 0.025 if missing)
    const patternRate = 0.025;
    let total = area * patternRate;
    // 2. Batting Cost (Linear Inch or Sq Inch? Let's use Linear for simplicity or fixed)
    // Example: Batting is usually per linear yard, but let's approximate per sq inch for the receipt
    if (s.selectedBatting) {
        total += area * s.selectedBatting.price;
    }
    // 3. Services
    if (s.services.binding) {
        const perimeter = (s.dimensions.width + s.dimensions.height) * 2;
        total += perimeter * 0.25; // $0.25 per inch for binding
    }
    set({
        estimatedTotal: parseFloat(total.toFixed(2))
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/it-had-to-be-sew/app/OrderWizard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderWizard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/it-had-to-be-sew/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/it-had-to-be-sew/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/it-had-to-be-sew/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$store$2f$useOrderStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/it-had-to-be-sew/store/useOrderStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/it-had-to-be-sew/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/it-had-to-be-sew/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// import confetti from 'canvas-confetti' // Optional
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId: ("TURBOPACK compile-time value", "lx1vm0bm"),
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01'
});
const BATTING_OPTIONS = [
    {
        id: 'hobbs-80-20',
        name: 'Hobbs 80/20',
        price: 0.004,
        desc: 'The classic choice. Soft & durable.'
    },
    {
        id: 'wool',
        name: 'Tuscany Wool',
        price: 0.008,
        desc: 'Extra loft and warmth. Hand-wash only.'
    },
    {
        id: 'bamboo',
        name: 'Bamboo Blend',
        price: 0.006,
        desc: 'Silky drape, eco-friendly, antibacterial.'
    }
];
function OrderWizard() {
    _s();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$store$2f$useOrderStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrderStore"])();
    const { step, nextStep, prevStep, dimensions, selectedPattern, selectedBatting, services, estimatedTotal } = store;
    const [patterns, setPatterns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [orderComplete, setOrderComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderWizard.useEffect": ()=>{
            client.fetch(`*[_type == "pantograph"]{_id, title, category, "imageUrl": image.asset->url}`).then(setPatterns);
        }
    }["OrderWizard.useEffect"], []);
    const submitOrder = async ()=>{
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                body: JSON.stringify({
                    dimensions,
                    patternId: selectedPattern?._id,
                    batting: selectedBatting?.name,
                    services,
                    total: estimatedTotal
                })
            });
            if (response.ok) setOrderComplete(true);
        } catch (error) {
            alert("Something went wrong.");
        }
        setIsSubmitting(false);
    };
    // --- SUCCESS VIEW (No Footer) ---
    if (orderComplete) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col items-center justify-center bg-background-light p-6 text-center font-display",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-24 h-24 bg-[#cfe7e3] rounded-full flex items-center justify-center mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined text-5xl text-primary",
                        children: "check"
                    }, void 0, false, {
                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-text-dark mb-2",
                    children: "Order Received!"
                }, void 0, false, {
                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-teal mb-8",
                    children: "We'll start stitching your quilt soon."
                }, void 0, false, {
                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>window.location.reload(),
                    className: "bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#8b6bd9] transition",
                    children: "Start New Order"
                }, void 0, false, {
                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background-light dark:bg-background-dark min-h-screen font-display text-text-dark dark:text-white pb-64",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-30 bg-background-light/90 backdrop-blur-md pt-4 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between max-w-[480px] mx-auto px-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: step > 1 ? prevStep : undefined,
                                className: `flex size-12 items-center justify-center hover:bg-black/5 rounded-full transition ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    children: "arrow_back"
                                }, void 0, false, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold",
                                children: step === 1 ? 'Size & Pattern' : step === 2 ? 'Materials' : 'Review'
                            }, void 0, false, {
                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12"
                            }, void 0, false, {
                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center gap-3 mt-2 pb-2",
                        children: [
                            1,
                            2,
                            3
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-2 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-primary' : 'w-2 bg-border-teal'}`
                            }, s, false, {
                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-[480px] mx-auto px-6 mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: [
                        step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: -20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-bold text-text-teal uppercase ml-2",
                                                    children: "Width"
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    className: "w-full p-3 rounded-xl border border-border-teal bg-white outline-none focus:ring-2 focus:ring-primary",
                                                    onChange: (e)=>store.setDimensions(Number(e.target.value), dimensions.height),
                                                    value: dimensions.width || ''
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 121
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-bold text-text-teal uppercase ml-2",
                                                    children: "Height"
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    className: "w-full p-3 rounded-xl border border-border-teal bg-white outline-none focus:ring-2 focus:ring-primary",
                                                    onChange: (e)=>store.setDimensions(dimensions.width, Number(e.target.value)),
                                                    value: dimensions.height || ''
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 122
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: patterns.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>store.selectPattern(p),
                                            className: `relative rounded-[24px] overflow-hidden border-2 cursor-pointer transition-all ${selectedPattern?._id === p._id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/30'} bg-white shadow-sm`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "aspect-square bg-gray-50 flex items-center justify-center p-4",
                                                    children: p.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: p.imageUrl,
                                                        className: "w-full h-full object-contain mix-blend-multiply opacity-80"
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 38
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold text-sm truncate",
                                                        children: p.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 42
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, p._id, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 100,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "step1", true, {
                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: -20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-bold mb-4",
                                    children: "Select Batting"
                                }, void 0, false, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 mb-8",
                                    children: BATTING_OPTIONS.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>store.selectBatting(b),
                                            className: `p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all ${selectedBatting?.id === b.id ? 'border-primary bg-primary/5' : 'border-border-teal bg-white'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedBatting?.id === b.id ? 'border-primary bg-primary text-white' : 'border-gray-300'}`,
                                                    children: selectedBatting?.id === b.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: "check"
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 229
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-bold",
                                                            children: b.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 26
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-text-teal",
                                                            children: b.desc
                                                        }, void 0, false, {
                                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 63
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, b.id, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 117,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-bold mb-4",
                                    children: "Services"
                                }, void 0, false, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>store.toggleService('binding'),
                                    className: `p-4 rounded-2xl border-2 cursor-pointer flex justify-between items-center ${services.binding ? 'border-primary bg-primary/5' : 'border-border-teal bg-white'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold",
                                                    children: "Machine Binding"
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-text-teal",
                                                    children: "We trim and stitch edges."
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 66
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-12 h-7 rounded-full flex items-center p-1 transition-colors ${services.binding ? 'bg-primary' : 'bg-gray-300'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${services.binding ? 'translate-x-5' : 'translate-x-0'}`
                                            }, void 0, false, {
                                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                lineNumber: 126,
                                                columnNumber: 149
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 126,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "step2", true, {
                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.95
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-6 rounded-[32px] shadow-quiet border border-border-teal space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold border-b border-dashed border-gray-200 pb-4",
                                        children: "Order Summary"
                                    }, void 0, false, {
                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-text-teal",
                                                        children: "Dimensions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 59
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            dimensions.width,
                                                            '" x ',
                                                            dimensions.height,
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 109
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                lineNumber: 137,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-text-teal",
                                                        children: "Pattern"
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 59
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: selectedPattern?.title || '-'
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 106
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                lineNumber: 138,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-text-teal",
                                                        children: "Batting"
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 59
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: selectedBatting?.name || 'None'
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 106
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                lineNumber: 139,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-text-teal",
                                                        children: "Services"
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 59
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: services.binding ? 'Binding' : '-'
                                                    }, void 0, false, {
                                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 107
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this)
                        }, "step3", false, {
                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-40 px-4 pb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[480px] mx-auto bg-white dark:bg-[#152e2a] rounded-[24px] shadow-2xl border border-border-teal dark:border-primary/20 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-5 py-3 border-b border-border-teal dark:border-primary/10 flex justify-between items-center bg-background-light dark:bg-background-dark/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-primary text-lg",
                                            children: "info"
                                        }, void 0, false, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-sm text-text-dark",
                                            children: "Price Explainer"
                                        }, void 0, false, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-text-teal font-medium uppercase tracking-wide",
                                    children: "Live Receipt"
                                }, void 0, false, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-5 py-4 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-text-teal truncate max-w-[200px]",
                                            children: [
                                                selectedPattern?.title || 'Pattern',
                                                " (",
                                                dimensions.width,
                                                '"x',
                                                dimensions.height,
                                                '")'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-text-dark font-mono",
                                            children: [
                                                "$",
                                                (dimensions.width * dimensions.height * 0.025).toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                (selectedBatting || services.binding) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col text-xs text-text-teal italic pl-3 border-l-2 border-primary/30 gap-1",
                                    children: [
                                        selectedBatting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: selectedBatting.name
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "+$",
                                                        (dimensions.width * dimensions.height * selectedBatting.price).toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 176,
                                            columnNumber: 25
                                        }, this),
                                        services.binding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Binding Service"
                                                }, void 0, false, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "+$",
                                                        ((dimensions.width + dimensions.height) * 2 * 0.25).toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 182,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 174,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-sm pt-3 border-t border-border-teal dark:border-primary/10 mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-text-dark text-lg",
                                            children: "Estimated Total"
                                        }, void 0, false, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-primary text-2xl",
                                            children: [
                                                "$",
                                                estimatedTotal.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 pt-0",
                            children: step < 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: nextStep,
                                className: "w-full bg-primary hover:bg-[#8b6bd9] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform",
                                children: [
                                    step === 2 ? 'Review Order' : 'Next Step',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined",
                                        children: "arrow_forward"
                                    }, void 0, false, {
                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                        lineNumber: 202,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                lineNumber: 200,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: submitOrder,
                                disabled: isSubmitting,
                                className: "w-full bg-text-dark hover:bg-black text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform",
                                children: [
                                    isSubmitting ? 'Processing...' : 'Submit Order',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined",
                                        children: "check"
                                    }, void 0, false, {
                                        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                        lineNumber: 207,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                                lineNumber: 205,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/it-had-to-be-sew/app/OrderWizard.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(OrderWizard, "Pn4lN+18eT+9Ip9pmiQABKLJbKM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$it$2d$had$2d$to$2d$be$2d$sew$2f$store$2f$useOrderStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrderStore"]
    ];
});
_c = OrderWizard;
var _c;
__turbopack_context__.k.register(_c, "OrderWizard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=it-had-to-be-sew_c648593f._.js.map