// staffExportColumns.ts

export interface StaffRow {
    employee_id?: number;
    company_name?: string | null;
    employee_name?: string | null;
    employee_code?: string | null;
    email?: string | null;
    department_name?: string | null;
    designation_name?: string | null;
    mobile_number?: string | null;
    bloodgroup?: string | null;
    dateofjoining?: string | null;
    role?: string | null;
    [key: string]: any;
}

export const STAFF_COLUMNS = [
    {
        label: 'Employee ID',
        key: 'employee_id',
        format: (value: unknown): string =>
            value ? String(value) : '-',
    },


    {
        label: 'Employee Name',
        key: 'employee_name',
        format: (value: unknown): string =>
            value ? String(value) : '-',
    },

    {
        label: 'Employee Code',
        key: 'employee_code',
        format: (value: unknown): string =>
            value ? String(value) : '-',
    },

    {
        label: 'Email',
        key: 'email',
        format: (value: unknown): string =>
            value ? String(value) : '-',
    },

    {
        label: 'Mobile Number',
        key: 'mobile_number',
        format: (value: unknown): string =>
            value ? String(value) : '-',
    },

    {
        label: 'Blood Group',
        key: 'bloodgroup',
        format: (value: unknown): string =>
            value ? String(value) : '-',
    },

    {
        label: 'Joining Date',
        key: 'dateofjoining',
        format: (value: unknown): string => {
            if (!value) return '-';

            return new Date(String(value)).toLocaleDateString('en-IN');
        },
    },

    {
        label: 'Role',
        key: 'role',
        format: (value: unknown): string =>
            value ? String(value) : '-',
    },
];