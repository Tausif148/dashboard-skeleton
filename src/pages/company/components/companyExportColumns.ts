import { ExportColumn } from 'src/utils/tableExport/useExport';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {

    plan_id: number;
    plan_name: string;
    plan_price: number;
    plan_description: string;
}

export interface Company {
    company_id: number;
    user_id: number;

    plan_id: number; // ✅ ADD THIS

    user_name: string;
    plan: Plan | null;

    role: string;
    company_name: string;
    owner_name: string;
    email: string;
    mobile_number: string;

    address1: string;
    address2: string;

    city: string;
    state: string;
    country: string;
    pincode: string;

    GST_number: string;
    pan_number: string;
    registration_number: string;
}

// ─── Value helpers ────────────────────────────────────────────────────────────

/** Strip leading/trailing whitespace and internal newlines */
const clean = (v: unknown): string =>
    typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() || '—' : '—';

/** Format an ISO date string to Indian locale */
const fmtDate = (v: unknown): string => {
    if (!v || typeof v !== 'string') return '—';
    const d = new Date(v);
    return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-IN');
};

// ─── Column definitions ───────────────────────────────────────────────────────

export const COMPANY_COLUMNS: ExportColumn<Company>[] = [
    {
        label: 'Sr No',
        // rowIndex is injected by the hook — no data-field needed
        key: (_row: Company, rowIndex: number) => rowIndex + 1,
        widthWeight: 0.8,
        pdfAlign: 'center',
    },
    {
        label: 'Company Name',
        key: 'company_name',
        widthWeight: 3,
        format: (v) => clean(v),
    },
    {
        label: 'Owner Name',
        key: 'owner_name',
        widthWeight: 2.5,
        format: (v) => clean(v),
    },
    {
        label: 'Email',
        key: 'email',
        widthWeight: 3.5,
        format: (v) => clean(v),
    },
    {
        label: 'Mobile',
        key: 'mobile_number',
        widthWeight: 2,
        format: (v) => clean(v),
    },
    {
        label: 'GST Number',
        key: 'GST_number',
        widthWeight: 2.5,
        format: (v) => clean(v),
    },
    {
        label: 'PAN Number',
        key: 'pan_number',
        widthWeight: 2.5,
        format: (v) => clean(v),
    },
    {
        label: 'Reg No',
        key: 'registration_number',
        widthWeight: 2.5,
        format: (v) => clean(v),
    },
    {
        label: 'Address 1',
        key: 'address1',
        widthWeight: 3.5,
        format: (v) => clean(v),
    },
    {
        label: 'Address 2',
        key: 'address2',
        widthWeight: 3.5,
        format: (v) => clean(v),
    },
    {
        label: 'City',
        key: 'city',
        widthWeight: 2,
        format: (v) => clean(v),
    },
    {
        label: 'State',
        key: 'state',
        widthWeight: 2.5,
        format: (v) => clean(v),
    },
    {
        label: 'Country',
        key: 'country',
        widthWeight: 2,
        format: (v) => clean(v),
    },
    {
        label: 'Pincode',
        key: 'pincode',
        widthWeight: 1.5,
        pdfAlign: 'center',
        format: (v) => clean(v),
    },
    {
        label: 'Plan Name',
        key: 'plan.plan_name', // dot-path → resolves plan?.plan_name safely
        widthWeight: 2.5,
        format: (v) => clean(v),
    },
    {
        label: 'Plan Price',
        key: 'plan.plan_price', // dot-path → resolves plan?.plan_price safely
        widthWeight: 2,
        pdfAlign: 'right',
        format: (v) => (v !== null && v !== undefined ? String(v) : '—'),
    },
    {
        label: 'Role',
        key: 'role',
        widthWeight: 2.5,
        format: (v) => clean(v),
    },
];
