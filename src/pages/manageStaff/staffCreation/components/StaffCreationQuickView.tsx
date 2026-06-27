import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import { memo } from 'react';
import { CancelIcon } from 'src/icons/icons';
import { IManPower } from 'src/interface/manPower.types';

interface StaffCreationQuickViewProps {
  open: boolean;
  selectedStaff: IManPower | null;
  handleClose: () => void;
}

const GREEN = '#4f46e5';
const GREEN_DARK = '#4f46e5';
const GREEN_LIGHT = '#e8f5ee';

const styles: Record<string, React.CSSProperties> = {
  viewDoc: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    fontSize: 14,
    color: '#1a1a2e',
  },
  docHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottom: `2px solid ${GREEN}`,
    marginBottom: 20,
  },
  docTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: GREEN_DARK,
    letterSpacing: 0.3,
  },
  docSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 3,
  },
  certBadge: { textAlign: 'right' as const },
  certLabel: {
    fontSize: 11,
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
  },
  certId: {
    fontSize: 18,
    fontWeight: 700,
    color: GREEN,
  },
  profileBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
    background: GREEN_LIGHT,
    border: `1px solid ${GREEN}33`,
    padding: '16px 18px',
    marginBottom: 20,
  },
  profileImg: {
    width: 88,
    height: 88,
    objectFit: 'cover' as const,
    border: `2px solid ${GREEN}44`,
    flexShrink: 0,
    borderRadius: 0,
    display: 'block',
  },
  profileImgPlaceholder: {
    width: 88,
    height: 88,
    flexShrink: 0,
    background: '#fff',
    border: `1.5px dashed #d1e8da`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: 11,
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 2,
  },
  profileCode: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  profileChips: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap' as const,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: GREEN_DARK,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 7,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    background: `${GREEN}33`,
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    marginBottom: 24,
  },
  infoCard: {
    border: `1.5px solid #d1e8da`,
    borderRadius: 0,
    padding: '14px 16px',
  },
  infoCardTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: GREEN_DARK,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    paddingBottom: 8,
    borderBottom: `1px solid ${GREEN}22`,
    marginBottom: 12,
  },
  fieldGrid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px 20px',
  },
  fieldGrid1: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px 20px',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1a1a2e',
  },
  fieldValueMono: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1a1a2e',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  fieldValueMuted: {
    fontSize: 13,
    fontWeight: 400,
    color: '#6b7280',
    fontStyle: 'italic' as const,
  },
  docsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 24,
  },
  docCard: {
    border: `1.5px solid #d1e8da`,
    borderRadius: 0,
    overflow: 'hidden',
  },
  docCardLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: GREEN_DARK,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    padding: '8px 12px',
    background: GREEN_LIGHT,
    borderBottom: `1px solid ${GREEN}22`,
  },
  docImgPlaceholder: {
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: 12,
    background: '#f9fafb',
    borderTop: `1px dashed #d1e8da`,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTop: '1px solid #e8edf2',
  },
  footerNote: {
    fontSize: 11.5,
    color: '#9ca3af',
    fontStyle: 'italic' as const,
  },
  closeBtn: {
    padding: '9px 22px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 13.5,
  },
};

function formatDate(value: string | Date | null | undefined): string {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy}, ${hh}:${min}`;
}

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value?: string | number | null;
  mono?: boolean;
}) {
  const isEmpty = value === null || value === undefined || value === '' || value === '-';
  return (
    <div style={styles.fieldRow}>
      <span style={styles.fieldLabel}>{label}</span>
      <span
        style={isEmpty ? styles.fieldValueMuted : mono ? styles.fieldValueMono : styles.fieldValue}
      >
        {isEmpty ? '—' : value}
      </span>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={styles.infoCard}>
      <div style={styles.infoCardTitle}>{title}</div>
      {children}
    </div>
  );
}

function StaffCreationQuickView({ open, selectedStaff, handleClose }: StaffCreationQuickViewProps) {
  if (!selectedStaff) return null;

  const staff = selectedStaff;
  const documents = [
    { label: 'Profile Image', value: staff.upload_profile_image ? 'Uploaded' : null },
    { label: 'Aadhar Card', value: staff.upload_aadhar_card ? 'Uploaded' : null },
    { label: 'PAN Card', value: staff.upload_pan_card ? 'Uploaded' : null },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: GREEN,
          color: '#fff',
          fontWeight: 700,
          position: 'relative',
          py: 1.5,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <VisibilityIcon sx={{ color: '#fff' }} fontSize="small" />
          </div>
          Staff Details
        </div>

        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 15,
            top: 15,
            color: '#fff',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#fff',
              transform: 'scale(1.1)',
            },
          }}
        >
          <CancelIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <div style={styles.viewDoc}>
          <div style={styles.docHeader}>
            <div>
              <div style={styles.docTitle}>Staff Profile</div>
              <div style={styles.docSubtitle}>{staff.designation_name || 'Staff'} Profile</div>
            </div>
            <div style={styles.certBadge}>
              <div style={styles.certLabel}>Employee Code</div>
              <div style={styles.certId}>{staff.employee_code || '—'}</div>
            </div>
          </div>

          <div style={styles.profileBanner}>
            <div style={styles.profileImgPlaceholder}>No Image</div>
            <div style={styles.profileInfo}>
              <div style={styles.profileName}>{staff.employee_name || '—'}</div>
              <div style={styles.profileCode}>ID: {staff.employee_id || '—'}</div>
              <div style={styles.profileChips}>
                <Chip
                  label={staff.department_name || 'No department'}
                  size="small"
                  sx={{
                    background: GREEN,
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: '3px',
                    fontSize: 11,
                  }}
                />
                <Chip
                  label={staff.designation_name || 'No designation'}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: GREEN,
                    color: GREEN_DARK,
                    fontWeight: 600,
                    borderRadius: '3px',
                    fontSize: 11,
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.sectionTitle}>
            <span>Personal Information</span>
            <div style={styles.sectionLine} />
          </div>

          <div style={styles.twoCol}>
            <InfoCard title="Contact Details">
              <div style={styles.fieldGrid2}>
                <Field label="Email" value={staff.email} mono />
                <Field label="Mobile" value={staff.mobile_number} mono />
                <Field label="Blood Group" value={staff.bloodgroup} />
                <Field label="Date of Birth" value={formatDate(staff.dateofbirth)} />
              </div>
            </InfoCard>

            <InfoCard title="Employment Details">
              <div style={styles.fieldGrid2}>
                <Field label="Employee Code" value={staff.employee_code} mono />
                <Field label="Department" value={staff.department_name} />
                <Field label="Designation" value={staff.designation_name} />
                <Field label="Joining Date" value={formatDate(staff.dateofjoining)} />
              </div>
              <div style={{ marginTop: 10 }}>
                <Field label="Leaving Date" value={formatDate(staff.dateofleaving)} />
              </div>
            </InfoCard>
          </div>

          <div style={styles.sectionTitle}>
            <span>Qualification</span>
            <div style={styles.sectionLine} />
          </div>

          <div style={styles.twoCol}>
            <InfoCard title="Education">
              <div style={styles.fieldGrid2}>
                <Field
                  label="Qualification"
                  value={staff.qualification_name || staff.qualification_id}
                />
                <Field label="University / Board" value={staff.university} />
                <Field label="Year of Passing" value={staff.year_of_passing} />
                <Field label="Percentage" value={staff.percentage} />
              </div>
            </InfoCard>

            <InfoCard title="Bank Details">
              <div style={styles.fieldGrid2}>
                <Field label="Bank Name" value={staff.employee_bank_name} />
                <Field label="Branch Name" value={staff.bank_branch_name} />
                <Field label="Account Number" value={staff.account_number} mono />
                <Field label="IFSC Code" value={staff.ifsc_code} mono />
              </div>
            </InfoCard>
          </div>

          <div style={styles.sectionTitle}>
            <span>Documents</span>
            <div style={styles.sectionLine} />
          </div>

          <div style={styles.docsGrid}>
            {documents.map((doc, index) => (
              <div key={index} style={styles.docCard}>
                <div style={styles.docCardLabel}>{doc.label}</div>
                <div style={styles.docImgPlaceholder}>{doc.value ? 'Uploaded' : 'Not uploaded'}</div>
              </div>
            ))}
          </div>

          <div style={styles.footer}>
            <span style={styles.footerNote}>Staff detail preview</span>
            <button style={styles.closeBtn} onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(StaffCreationQuickView);
