/**
 * usePrint — Centralized print hook
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop `injectPrintStyles()` + `window.print()` from every QuickView component
 * and call `const { triggerPrint } = usePrint()` instead.
 *
 * HOW IT WORKS
 * ─────────────────────────────────────────────────────────────────────────────
 * • One <style id="app-global-print-style"> tag is written into <head> ONCE
 *   for the lifetime of the app (not per-component, not per-dialog-open).
 * • All QuickView components share the same class contracts:
 *     .qv-no-print          → hidden during print (buttons, close icons, etc.)
 *     .qv-print-dialog      → the MuiDialog-paper to keep visible
 * • triggerPrint() accepts an optional callback fired after print completes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const GLOBAL_PRINT_STYLE_ID = 'app-global-print-style';

function injectGlobalPrintStyles(): void {
    // Already injected — nothing to do.
    if (document.getElementById(GLOBAL_PRINT_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = GLOBAL_PRINT_STYLE_ID;

    // style.innerHTML = `
    //     /* ═══════════════════════════════════════════════════════════════════
    //        GLOBAL @media print  —  owns ALL print behaviour for this app.
    //        No other component should define @media print rules.
    //        ═══════════════════════════════════════════════════════════════════ */

    //     @media print {

    //         /* ── 1. Suppress browser header/footer (date, URL, page no.) ──
    //            This is the ONLY reliable cross-browser fix.
    //            Any margin > 0 is fine; 10 mm keeps content away from the edge. */
    //         @page {
    //             size    : A4 portrait;
    //             margin  : 10mm;
    //         }

    //         /* ── 2. Hide every direct body child (sidebar, nav, toasts …) ── */
    //         body > * {
    //             display : none !important;
    //         }

    //         /* ── 3. Restore the MUI Dialog portal root ────────────────────
    //            MUI renders dialogs into a portal that IS a direct body child,
    //            so we bring it back explicitly.                               */
    //         body > .MuiModal-root,
    //         body > [role="presentation"] {
    //             display : block !important;
    //         }

    //         /* ── 4. Strip all dialog chrome ──────────────────────────────── */
    //         .MuiBackdrop-root      { display : none !important; }
    //         .MuiDialogTitle-root   { display : none !important; }

    //         /* ── 5. Shared "hide during print" utility class ─────────────
    //            Apply className="qv-no-print" to:
    //              • Footer action buttons
    //              • Close icon buttons
    //              • Any other screen-only UI                                 */
    //         .qv-no-print           { display : none !important; }

    //         /* ── 6. Make the dialog paper fill the whole printed page ───── */
    //         .MuiDialog-paper {
    //             box-shadow    : none    !important;
    //             border        : none    !important;
    //             margin        : 0       !important;
    //             max-width     : 100%    !important;
    //             width         : 100%    !important;
    //             max-height    : none    !important;
    //             border-radius : 0       !important;
    //         }

    //         /* ── 7. Remove scroll/overflow constraints ───────────────────── */
    //         .MuiDialog-root,
    //         .MuiDialog-container,
    //         .MuiDialog-scrollPaper {
    //             display    : block    !important;
    //             overflow   : visible  !important;
    //             height     : auto     !important;
    //             max-height : none     !important;
    //         }

    //         /* ── 8. Remove DialogContent padding / border / scroll ───────── */
    //         .MuiDialogContent-root {
    //             padding    : 0        !important;
    //             border     : none     !important;
    //             overflow   : visible  !important;
    //             max-height : none     !important;
    //         }

    //         /* ── 9. Force colour/background printing in all browsers ─────── */
    //         * {
    //             -webkit-print-color-adjust : exact !important;
    //             print-color-adjust         : exact !important;
    //         }

    //         /* ── 10. Prevent awkward mid-row page breaks ─────────────────── */
    //         tr { page-break-inside : avoid; }
    //     }
    // `;

    style.innerHTML = `
    @media print {

        @page {
            size   : A4 landscape;   /* ← was portrait; landscape fits wide tables */
            margin : 10mm;
        }

        body > * { display: none !important; }

        body > .MuiModal-root,
        body > [role="presentation"] { display: block !important; }

        .MuiBackdrop-root    { display: none !important; }
        .MuiDialogTitle-root { display: none !important; }
        .qv-no-print         { display: none !important; }

        .MuiDialog-paper {
            box-shadow    : none  !important;
            border        : none  !important;
            margin        : 0     !important;
            max-width     : 100%  !important;
            width         : 100%  !important;
            max-height    : none  !important;
            border-radius : 0     !important;
        }

        .MuiDialog-root,
        .MuiDialog-container,
        .MuiDialog-scrollPaper {
            display    : block   !important;
            overflow   : visible !important;
            height     : auto    !important;
            max-height : none    !important;
        }

        .MuiDialogContent-root {
            padding    : 0       !important;
            border     : none    !important;
            overflow   : visible !important;
            max-height : none    !important;
        }

        /* ── TABLE CROP FIX ─────────────────────────────────────────── */

        /* Kill horizontal scroll on TableContainer */
        .MuiTableContainer-root {
            overflow   : visible !important;
            width      : 100%    !important;
            max-width  : 100%    !important;
        }

        /* Override JS minWidth + force proportional column distribution */
        .MuiTable-root {
            width          : 100%   !important;
            min-width      : 0      !important;  /* overrides minWidth: 1000–1200 */
            table-layout   : fixed  !important;  /* distributes columns evenly */
            font-size      : 10px   !important;
        }

        /* Allow cells to wrap — overrides whiteSpace: nowrap */
        .MuiTableCell-root {
            white-space : normal     !important;
            word-break  : break-word !important;
            padding     : 5px 6px   !important;  /* tighter padding = more space */
            font-size   : 10px      !important;
            line-height : 1.3       !important;
        }

        /* Keep header green visible in print */
        .MuiTableHead-root .MuiTableCell-root {
            font-size   : 9px !important;
            font-weight : 600 !important;
        }

        /* ── END TABLE CROP FIX ─────────────────────────────────────── */

        tr { page-break-inside: avoid; }

        * {
            -webkit-print-color-adjust : exact !important;
            print-color-adjust         : exact !important;
        }
    }
`;

    document.head.appendChild(style);
}

// ─── Public hook ─────────────────────────────────────────────────────────────

export function usePrint() {
    /**
     * triggerPrint(onAfterPrint?)
     * Call this from any QuickView component's Print button onClick.
     *
     * @param onAfterPrint  Optional callback fired after the print dialog closes.
     *                      Useful if you need to reset state or log analytics.
     */
    function triggerPrint(onAfterPrint?: () => void): void {
        injectGlobalPrintStyles();

        if (onAfterPrint) {
            // window.onafterprint fires when the print dialog is dismissed
            const handler = () => {
                onAfterPrint();
                window.removeEventListener('afterprint', handler);
            };
            window.addEventListener('afterprint', handler);
        }

        window.print();
    }

    return { triggerPrint };
}