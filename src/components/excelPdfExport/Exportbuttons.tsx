import { Button, CardContent, Stack } from '@mui/material';

interface ExportButtonsProps {
    onExportExcel: () => void;
    onExportPdf: () => void;
}

export default function ExportButtons({ onExportExcel, onExportPdf }: ExportButtonsProps) {
    return (
        <CardContent sx={{ padding: '.5rem 0', paddingBottom: '0 !important' }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ padding: '0' }}
                alignItems={{ xs: 'stretch', sm: 'flex-end' }}
                flexWrap="wrap"
            >
                <Button
                    variant="contained"
                    onClick={onExportExcel}
                    sx={{
                        bgcolor: '#4f46e5',
                        '&:hover': { bgcolor: '#166e42' },
                    }}
                >
                    Export Excel
                </Button>

                <Button
                    variant="outlined"
                    onClick={onExportPdf}
                    sx={{
                        borderColor: '#4f46e5',
                        color: '#4f46e5',
                        '&:hover': {
                            borderColor: '#166e42',
                            color: '#166e42',
                            bgcolor: 'transparent',
                        },
                    }}
                >
                    Export PDF
                </Button>
            </Stack>
        </CardContent>
    );
}