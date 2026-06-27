import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import TableChartIcon from '@mui/icons-material/TableChart';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

interface IDownloadOptionsModalProps {
    open: boolean;
    onClose: () => void;
    handleDownloadPDF: () => Promise<void> | void;
    handleDownloadExcel: () => Promise<void> | void;
    handlePrint: () => Promise<void> | void;
}

type ProcessingKey = 'pdf' | 'excel' | 'print' | null;

export function DownloadOptionsModal({
    open,
    onClose,
    handleDownloadPDF,
    handleDownloadExcel,
    handlePrint,
}: IDownloadOptionsModalProps) {
    const [processing, setProcessing] = useState<ProcessingKey>(null);

    const run = async (key: ProcessingKey, fn: () => Promise<void> | void) => {
        setProcessing(key);
        try {
            await fn();
        } finally {
            setProcessing(null);
        }
    };

    const options: {
        key: ProcessingKey;
        label: string;
        description: string;
        icon: React.ReactNode;
        color: string;
        bg: string;
        border: string;
        fn: () => Promise<void> | void;
    }[] = [
            {
                key: 'pdf',
                label: 'Download as PDF',
                description: 'Export billing records to PDF format',
                icon: <PictureAsPdfIcon sx={{ fontSize: 28 }} />,
                color: '#d32f2f',
                bg: '#fff5f5',
                border: '#ffcdd2',
                fn: handleDownloadPDF,
            },
            {
                key: 'excel',
                label: 'Download as Excel',
                description: 'Export billing records to Excel spreadsheet',
                icon: <TableChartIcon sx={{ fontSize: 28 }} />,
                color: '#2e7d32',
                bg: '#f1f8f1',
                border: '#c8e6c9',
                fn: handleDownloadExcel,
            },
            {
                key: 'print',
                label: 'Print',
                description: 'Send billing records to printer',
                icon: <PrintIcon sx={{ fontSize: 28 }} />,
                color: '#1565c0',
                bg: '#f0f4ff',
                border: '#bbdefb',
                fn: handlePrint,
            },
        ];

    return (
        <Dialog
            open={open}
            onClose={processing ? undefined : onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '6px',
                    overflow: 'hidden',
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    background: 'linear-gradient(90deg, #4f46e5 0%, #4f46e5 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    px: 2.5,
                }}
            >
                <Typography fontWeight={700} fontSize="1rem">
                    Download Options
                </Typography>
                <IconButton
                    size="small"
                    onClick={onClose}
                    disabled={!!processing}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#fff',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            color: '#fff',
                            transform: 'scale(1.1)',
                        },
                    }}        >
                    <IconX size={18} />
                </IconButton>
            </DialogTitle>

            <Divider />

            {/* Options */}
            <DialogContent sx={{ py: 2.5, px: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {options.map((opt) => {
                    const isLoading = processing === opt.key;
                    const isDisabled = !!processing;

                    return (
                        <Button
                            key={opt.key}
                            variant="outlined"
                            disabled={isDisabled}
                            onClick={() => run(opt.key, opt.fn)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: 2,
                                px: 2,
                                py: 1.5,
                                borderRadius: '10px',
                                border: `1.5px solid ${opt.border}`,
                                background: opt.bg,
                                color: opt.color,
                                textTransform: 'none',
                                transition: 'all 0.2s ease',
                                '&:hover:not(:disabled)': {
                                    background: opt.bg,
                                    borderColor: opt.color,
                                    boxShadow: `0 2px 8px ${opt.color}33`,
                                    transform: 'translateY(-1px)',
                                },
                                '&:disabled': {
                                    opacity: 0.55,
                                    cursor: 'not-allowed',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 44,
                                    height: 44,
                                    borderRadius: '8px',
                                    background: `${opt.color}18`,
                                    color: opt.color,
                                    flexShrink: 0,
                                }}
                            >
                                {isLoading ? <CircularProgress size={22} sx={{ color: opt.color }} /> : opt.icon}
                            </Box>

                            <Box textAlign="left">
                                <Typography fontWeight={600} fontSize="0.9rem" color={opt.color}>
                                    {opt.label}
                                </Typography>
                                <Typography fontSize="0.75rem" color="text.secondary" mt={0.2}>
                                    {opt.description}
                                </Typography>
                            </Box>
                        </Button>
                    );
                })}
            </DialogContent>
        </Dialog>
    );
}
